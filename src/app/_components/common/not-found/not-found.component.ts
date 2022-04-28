import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  handleStar(event:any){
    var maxV = 5
    let valueHover = Math.ceil(this.calcSliderPos(event,maxV)*2)/2;
    this.upStars(valueHover);
  }
  calcSliderPos(e:any,maxV:any) {
    return (e.offsetX / e.target.clientWidth) *  parseInt(maxV,10);
  }
  upStars(val:any) {
	 console.log(val)
    
    }
}
