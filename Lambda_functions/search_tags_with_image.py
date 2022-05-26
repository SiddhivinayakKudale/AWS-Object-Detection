import json
import boto3
import os 
import sys
import uuid
import cv2
import numpy as np
import time
import base64
from urllib.parse import unquote_plus

s3_client = boto3.client('s3')
confthres = 0.3
nmsthres = 0.1

def load_model(configpath, weightspath):
    print("[INFO] loading YOLO from disk...")
    net = cv2.dnn.readNetFromDarknet(configpath, weightspath)
    return net
    
def do_prediction(image, net, LABELS):
   #  print("image",image)
    (H, W) = image.shape[:2]
    ln = net.getLayerNames()
    ln = [ln[i - 1] for i in net.getUnconnectedOutLayers()]
   #  print(ln)
    blob = cv2.dnn.blobFromImage(image, 1 / 255.0, (416, 416),
                                 swapRB=True, crop=False)
    net.setInput(blob)
    start = time.time()
    layerOutputs = net.forward(ln)

    print(layerOutputs)
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
                if (str(LABELS[classIDs[i]]) not in detected_objects) and (confidences[i] >
                                                                   0.5):
                    detected_objects.append(str(LABELS[classIDs[i]]))
    return detected_objects
    
def decodebstring(bstring):
    return bstring.decode('ascii')

YOLO_BUCKET = 'yolo-bucket-aws'
labelskey = "coco.names"
Lables = s3_client.get_object(Bucket=YOLO_BUCKET, Key=labelskey)[
    'Body'].read().split(b'\n')
Lables = list(map(decodebstring, Lables))
cfgkey = "yolov3-tiny.cfg"
CFG = "/tmp/yolov3-tiny.cfg"
s3_client.download_file(YOLO_BUCKET, cfgkey, CFG)
wkey = "yolov3-tiny.weights"
Weights = "/tmp/yolov3-tiny.weights"
s3_client.download_file(YOLO_BUCKET, wkey, Weights)

def lambda_handler(event, context):
   tags = json.loads(event["body"].encode('utf-8'))
   data = tags['contents']
   image_bytes = base64.b64decode(data)
   objects = detect_objects(image_bytes)
   final = search_url(objects)
   return {
        'statusCode': 200,
        'body': json.dumps(final)
    }

def detect_objects(image_bytes):
    # load the neural net. Should be local to this method as its multi-threaded endpoint
    np_array = np.asarray(bytearray(image_bytes), np.uint8)
    img = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
    nets = load_model(CFG, Weights)
    res = do_prediction(img, nets, Lables)
    return res

def search_url(tag_list):
   client = boto3.client('dynamodb')
   dynamodb = dynamodb = boto3.resource('dynamodb')
   table = dynamodb.Table('image_tags')
   response = table.scan()
   data = response['Items']
   print("data us",data)
   dict1 = dict()
   for test1 in data:
      dict1.update({test1["url"]:test1["tags"]})
   print("dictionary",dict1)
   lst = []
   for key,value in dict1.items():
      if set(tag_list) == value:
        lst.append(key)
   return lst