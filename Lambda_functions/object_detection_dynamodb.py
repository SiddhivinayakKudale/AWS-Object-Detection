import json
import boto3
import os
import sys
import uuid
import cv2
import numpy as np
import time
from urllib.parse import unquote_plus

s3 = boto3.client('s3')
dynamodb = boto3.client('dynamodb')
TABLE_NAME = 'image_tags'

confthres = 0.3
nmsthres = 0.1


def load_model(configpath, weightspath):
    print("[INFO] loading YOLO from disk...")
    net = cv2.dnn.readNetFromDarknet(configpath, weightspath)
    return net


def do_prediction(image, net, LABELS):
    (H, W) = image.shape[:2]
    ln = net.getLayerNames()
    ln = [ln[i - 1] for i in net.getUnconnectedOutLayers()]
    print(ln)
    blob = cv2.dnn.blobFromImage(image, 1 / 255.0, (416, 416),
                                 swapRB=True, crop=False)
    net.setInput(blob)
    start = time.time()
    layerOutputs = net.forward(ln)
    end = time.time()
    print("[INFO] YOLO took {:.6f} seconds".format(end - start))
    boxes = []
    confidences = []
    classIDs = []
    for output in layerOutputs:
        for detection in output:
            scores = detection[5:]
            classID = np.argmax(scores)
            confidence = scores[classID]
            if confidence > confthres:
                box = detection[0:4] * np.array([W, H, W, H])
                (centerX, centerY, width, height) = box.astype("int")
                x = int(centerX - (width / 2))
                y = int(centerY - (height / 2))
                boxes.append([x, y, int(width), int(height)])
                confidences.append(float(confidence))
                classIDs.append(classID)
        idxs = cv2.dnn.NMSBoxes(boxes, confidences, confthres,
                                nmsthres)
        detected_objects = []
        if len(idxs) > 0:
            for i in idxs.flatten():
                if (str(LABELS[classIDs[i]]) not in detected_objects) and (confidences[i] > 0.5):
                    detected_objects.append(str(LABELS[classIDs[i]]))
    return detected_objects


def decodebstring(bstring):
    return bstring.decode('ascii')


def detect_objects(image_bytes):
    # load the neural net. Should be local to this method as its multi-threaded endpoint
    nparr = np.fromstring(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    nets = load_model(CFG, Weights)
    res = do_prediction(img, nets, Lables)
    return res


YOLO_BUCKET = 'yolo-bucket-aws'
labelskey = "coco.names"
Lables = s3.get_object(Bucket=YOLO_BUCKET, Key=labelskey)['Body'].read().split(b'\n')
Lables = list(map(decodebstring, Lables))
cfgkey = "yolov3-tiny.cfg"
CFG = "/tmp/yolov3-tiny.cfg"
s3.download_file(YOLO_BUCKET, cfgkey, CFG)
wkey = "yolov3-tiny.weights"
Weights = "/tmp/yolov3-tiny.weights"
s3.download_file(YOLO_BUCKET, wkey, Weights)


def lambda_handler(event, context):
    for record in event['Records']:
        bucket = record['s3']['bucket']['name']
        key = record['s3']['object']['key']
        resp = s3.get_object(Bucket=bucket, Key=key)
        image_bytes = resp['Body'].read()
        objects = detect_objects(image_bytes)
        # Create new entry in table
        datadict = {}
        url = "https://" + bucket + ".s3.amazonaws.com/" + key
        datadict['tags'] = {'SS': objects}
        datadict['url'] = {'S': str(url)}
        response = dynamodb.put_item(TableName=TABLE_NAME, Item=datadict)
    return {
        'statusCode': 200,
        'body': 'success',
        'objects': objects
    }