import json
import boto3

def lambda_handler(event, context):
    tag1 = event['queryStringParameters']['tag']
    tag2 = event['queryStringParameters']['tag2']
    client = boto3.client('dynamodb')
    dynamodb = dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('image_tags')
    response = table.scan()
    data = response['Items']
    dict1 = dict()
    for test1 in data:
      dict1.update({test1["url"]:test1["tags"]})
    lst = []
    for key,value in dict1.items():
      if tag1 in value and (len(tag2) == 0 or tag2 in value):
        lst.append(key)
  
    return {
        'statusCode': 200,
        'body': json.dumps(lst),
        'headers': {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Methods" : "OPTIONS,POST,PUT,DELETE",
            #"Access-Control-Allow-Credentials" : true,
            "Access-Control-Allow-Origin" : "*",
            "X-Requested-With" : "*"
        }  
    }