import { Component, OnInit, ViewChild } from '@angular/core';
// import { NgxStarsComponent } from 'ngx-stars';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {
  heartIcons = {
    empty: '../../../assets/start-empty.svg',
    half: '../../../assets/star-half.svg',
    full: '../../../assets/star-full.svg',
  }
  ratingDisplay: number=0;
  // @ViewChild(NgxStarsComponent) starsComponent: NgxStarsComponent;
  // constructor() { 
  // this.starsComponent=new NgxStarsComponent();

  // }

  ngOnInit(): void {
    // this.starsComponent.setRating(0);
  }
  onRatingSet(rating:any): void {
    this.ratingDisplay = rating;
  }
  

}
