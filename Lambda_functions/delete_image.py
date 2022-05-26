import json
import boto3
s3_client = boto3.client('s3')
OBJECT_BUCKET = 'direct-upload-sid'
client = boto3.client('dynamodb')
dynamodb = dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('image_tags')

def lambda_handler(event, context):
    url = event['queryStringParameters']['url']  # should be s3 url for e.g. https://direct-upload-sid.s3.amazonaws.com/000000561420.jpg
    print("url",url)
    image = url.split("/")
    image_url = image[-1]
    print(image,image_url)
    delete_obj(image_url)
    
     
    table.delete_item(Key={"url":url})
    return {
        'statusCode': 200,
        'body': json.dumps(url),
        'headers': {
            "Content-Type" : "image/jpeg",
            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Methods" : "OPTIONS,GET,POST,PUT,DELETE",
            #"Access-Control-Allow-Credentials" : true,
            "Access-Control-Allow-Origin" : "*",
            "X-Requested-With" : "*"
        }  
    }
   
def delete_obj(image_url):
    s3_client.delete_object(Bucket=OBJECT_BUCKET,Key=image_url)