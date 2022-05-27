import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { baseconvert } from './baseconvert';

@Component({
  selector: 'app-search-image-ob-tags',
  templateUrl: './search-image-ob-tags.component.html',
  styleUrls: ['./search-image-ob-tags.component.css']
})
export class SearchImageObTagsComponent{
  base64textString : any;
  fileName = '';
  content = new baseconvert()
  constructor(private http: HttpClient) {}
  base64Output : any;
  result : any
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload =this.handleFile.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleFile(event:any) {
    var binaryString = event.target.result;
    this.base64textString= btoa(binaryString);
    var res = btoa(binaryString)
    this.content.contents = res
    const body=JSON.stringify(this.content);
    const headers = { 'content-type': 'application/json'} 
    console.log(body)
    const updatecontent$ = this.http.post("https://i25utoeijd.execute-api.us-east-1.amazonaws.com/dev/search",body,{'headers':headers});

    updatecontent$.subscribe(res => {
      this.result = res;
     console.log(this.result);
});

   }


}
