import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { HotelService } from 'src/app/_services/hotel.service';
import { UserService } from 'src/app/_services/user.service';
import { environment } from 'src/environments/environment';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { animate, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';

@Component({
  animations:[
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter',
          [style({ opacity: 0 }), stagger('200ms', animate('600ms ease-out', style({ opacity: 1 })))],
          { optional: true }
        ),
        query(':leave',
          animate('200ms', style({ opacity: 0 })),
          { optional: true}
        )
      ])
    ]),
    trigger("inOutAnimation", [
      state("in", style({ opacity: 1 })),
      transition(":enter", [
        animate(
          300,
          keyframes([
            style({ opacity: 0, offset: 0 }),
            style({ opacity: 0.25, offset: 0.25 }),
            style({ opacity: 0.5, offset: 0.5 }),
            style({ opacity: 0.75, offset: 0.75 }),
            style({ opacity: 1, offset: 1 }),
          ])
        )
      ]),
      transition(":leave", [
        animate(
          300,
          keyframes([
            style({ opacity: 1, offset: 0 }),
            style({ opacity: 0.75, offset: 0.25 }),
            style({ opacity: 0.5, offset: 0.5 }),
            style({ opacity: 0.25, offset: 0.75 }),
            style({ opacity: 0, offset: 1 }),
          ])
        )
      ])
    ])
  ],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
  hotels!:any; //we ! indicate that the variable can be : undefined
  //this is a shortcut to write : Observable<Photo[]> | undefined
  imgUrl:string=environment.imgUrl;
  searchText:string='';
  pageSize:number=6;
  totalPage:number=0;
  currentPage:number=1;
  pages:any=[]
  time:any;
  user:any;
  hotelSub!:Subscription;
  userSub!:Subscription;

  constructor(private authService:UserService,private hotelService:HotelService,private route:ActivatedRoute,private loadingBar: LoadingBarService) {
    
  }

  ngOnInit(): void {
    this.loadingBar.start();
    this.authService.getUser();
    this.hotelSub=this.hotelService.getAllHotels().subscribe(resp=>{
      this.hotels=resp.body;
      this.totalPage=Math.ceil(this.hotels.length/this.pageSize);
      for(let i=1;i<this.totalPage+1;i++){
           this.pages.push(i);
         }
      this.loadingBar.complete();
    })

    

    this.userSub=this.authService.user.subscribe(resp=>{
      this.user=resp;
    })

    this.time = new Observable<string>(observer => {
      setInterval(() => observer.next(new Date().toString()), 1000);
    });
    
  }
  ngOnDestroy(){
    this.hotelSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  searchHotel(event:Event){
    let search:any=event.target
    this.searchText=search.value
  }
  
  handlePage(page:number){
    this.currentPage=page
  }

  setPageSize(page:string){
    this.pages=[]
    this.pageSize=Number(page);
    this.totalPage=Math.ceil(this.hotels.length/this.pageSize);
    for(let i=1;i<this.totalPage+1;i++){
      this.pages.push(i)
    }
    this.currentPage=1;
  }
}
