import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { tags } from './imagetags';

@Component({
  selector: 'app-search-by-tags-multiple',
  templateUrl: './search-by-tags-multiple.component.html',
  styleUrls: ['./search-by-tags-multiple.component.css']
})
export class SearchByTagsMultipleComponent implements OnInit {
  tagss = new tags()
  result: any
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  
  onClickSubmit(data:any) {
    alert("Entered tags is : " + data.tags);
    var splittags = data.tags.split(",")
    for(var num=0;num<splittags.length;num++){
      this.tagss.tags.push(splittags[num])
    }
    console.log("tags list",this.tagss)
    const headers = { 'content-type': 'application/json'}  
    
    const body=JSON.stringify(this.tagss);
    console.log(body)
    const searchtagmultiple$ = this.http.post("https://i25utoeijd.execute-api.us-east-1.amazonaws.com/dev/tags",body,{'headers':headers});

    searchtagmultiple$.subscribe(res => {
                 this.result = res;
                console.log(this.result);
           });


 }

}
