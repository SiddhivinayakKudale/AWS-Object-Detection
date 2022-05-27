import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { tags } from './tags';

@Component({
  selector: 'app-updatedeletetags-byurl',
  templateUrl: './updatedeletetags-byurl.component.html',
  styleUrls: ['./updatedeletetags-byurl.component.css']
})
export class UpdatedeletetagsByurlComponent implements OnInit {
  //tags:any;
  tagss = new tags()
  constructor(private http: HttpClient) 
  {
      
  }
  
  ngOnInit(): void {
  }
  
  onClickSubmit(data:any) {
    //result:any;
    this.tagss.url = data.url
    this.tagss.type = data.type
    //this.tagss.tags = data.tag
    //this.tagss.tags = ['sagar','sid']

    
    var splittags = data.tag.split(",")
    for(var num=0;num<splittags.length;num++){
      this.tagss.tags.push(splittags[num])
    }
    
    //alert("Entered tags is : " + data.url + data.type + data.tag);
    alert("tags are"+ this.tagss)
    console.log(this.tagss)
    const headers = { 'content-type': 'application/json'}  
    
    const body=JSON.stringify(this.tagss);
    console.log(body)
    const updatetag$ = this.http.post("https://i25utoeijd.execute-api.us-east-1.amazonaws.com/dev/modify",body,{'headers':headers});

    updatetag$.subscribe(res => {
                 alert(res)       
           });
           
 }

}
