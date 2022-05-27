import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-image',
  templateUrl: './delete-image.component.html',
  styleUrls: ['./delete-image.component.css']
})
export class DeleteImageComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  
  onClickSubmit(data:any) {
    alert("Entered URL is : " + data.urlid);
    let params = new HttpParams();
    params = params.append('url',data.urlid);
    const deletetag$ = this.http.delete("https://s3z0vxy2y2.execute-api.us-east-1.amazonaws.com/1",{params: params});
    console.log(deletetag$)
    deletetag$.subscribe(res => {
     alert(res);
    });
 }

}
