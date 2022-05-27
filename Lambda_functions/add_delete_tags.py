import json
import boto3

client = boto3.client('dynamodb')
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('image_tags')

def lambda_handler(event, context):
    tags = json.loads(event["body"])
    data = client.get_item(
    TableName='image_tags',
    Key = {
        'url': {
          'S': tags["url"]
        }
    }
    )
    
    test0 = data['Item']['tags']['SS']
    test = set()
    if (tags['type'] == '1'):
        for elem in tags['tags']:
            test.add(elem)
        for ele1 in test0:
            test.add(ele1)
        table.update_item(
        Key={
            'url': tags['url']
            
        },
        UpdateExpression='SET tags = :val1',
        ExpressionAttributeValues={
            ':val1': test
        }
        )
        
        output = "Tag/s are added!!!!!. " + "Updated tags are: " + str(test)
        
    elif (tags['type'] == '0'):
        test1 = set()
        check = tags['tags']
        for i in check:
            if i in test0:
                test0.remove(i)
        for j in test0:
            test1.add(j)
        table.update_item(
        Key={
            'url': tags['url']
            
        },
        UpdateExpression='SET tags = :val1',
        ExpressionAttributeValues={
            ':val1': test1
        }
        )
        
        output = "Tag/s are deleted!!!!!. " + "Updated tags are: " + str(test1)
   
    return {
        'statusCode': 200,
        'body': json.dumps(output)
    }