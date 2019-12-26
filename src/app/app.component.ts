import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EngineerAi';
  rows = [];
  result:any;
  single_row:any;
  constructor(){}
  //Initializing and refreshing the data for every 10 seconds periodically.
  ngOnInit() {
    this.getData();
    setInterval(()=>this.getData(),10000);
  }
  getData(){
    this.fetch((data) => {
      this.rows = data['hits'];
      console.log(this.rows);
    });
  }
  onActivate(event){
    if(event.type=='click'){
      this.single_row=JSON.stringify(event.row);
    }
  }
  //Fetching the data from the API
  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `https://hn.algolia.com/api/v1/search_by_date?tags=story`);
    req.onload = () => {
      const data = JSON.parse(req.response);
      cb(data);
    };
    req.send();
  }
}