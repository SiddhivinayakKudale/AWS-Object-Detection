import json
import boto3
import requests


def lambda_handler(event, context):
    s3 = boto3.client('s3')
    tag = json.loads(event['body'])
    client = boto3.client('dynamodb')
    dynamodb = dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('image_tags')
    response = table.scan()
    data = response['Items']
    dict1 = dict()
    for test1 in data:
        dict1.update({test1["url"]: test1["tags"]})
    lst = []
    for key, value in dict1.items():
        if set(tag['tags']) == value:
            lst.append(key)
    signed_url_list = []
    for i in lst:
        element = i.split("/")
        image = element[-1]
        url = s3.generate_presigned_url(ClientMethod='get_object', Params={'Bucket': 'direct-upload-sid', 'Key': image}, ExpiresIn=600)
        signed_url_list.append(url)

    return {
        'statusCode': 200,
        'body': json.dumps(signed_url_list),
        'headers': {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Methods": "OPTIONS,POST,PUT,DELETE",
            # "Access-Control-Allow-Credentials" : true,
            "Access-Control-Allow-Origin": "*",
            "X-Requested-With": "*"
        }
    }
