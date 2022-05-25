import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-by-tags',
  templateUrl: './search-by-tags.component.html',
  styleUrls: ['./search-by-tags.component.css']
})
export class SearchByTagsComponent implements OnInit {
  tags:any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  
  onClickSubmit(data:any) {
    alert("Entered tags is : " + data.tag1 + data.tag2);
    let params = new HttpParams();
    params = params.append('tag',data.tag1);
    params = params.append('tag2',data.tag2);
    const searchtag$ = this.http.get("https://s3z0vxy2y2.execute-api.us-east-1.amazonaws.com/1",{params: params});

    searchtag$.subscribe(res => {
                 this.tags = res;
                console.log(this.tags);
           });
 }

}
