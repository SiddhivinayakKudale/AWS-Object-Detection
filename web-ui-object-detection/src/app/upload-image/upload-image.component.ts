import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent {

  fileName = '';

  constructor(private http: HttpClient) {}
  

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    console.log(file.name)
    if (file) {

      this.fileName = file.name; 

      const formData = new FormData();
      const data = { "name" : "Mike" };

      formData.append("thumbnail",  file);
      let map = new Map<string, string>();
      map.set("PO1", "closed"); 
      //formData.append(map)
      
      
      //let headers = new HttpHeaders();
      //headers = headers.set('Content-Type', 'application/json');
      var headers = new HttpHeaders();
      headers.append('Content-type','application/octet-stream');
      //headers.append('Access-Control-Allow-Origin' ,'*');
     //,{headers:headers}
      const upload$ = this.http.post("https://35muxyda49.execute-api.us-east-1.amazonaws.com/dev",formData,{headers:headers});

      upload$.subscribe();
  }
  }

}
