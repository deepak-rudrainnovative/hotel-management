import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input('pageSize') pageSize:number=0;
  @Input('totalPage') totalPage:number=0;
  @Input('currentPage') currentPage:number=0;
  @Input('pages')  pages:any=[];
  @Output() handlePage=new EventEmitter<number>()
  constructor() { }

  ngOnInit(): void {
  }
  handleChange(page:number){
    this.handlePage.emit(page)
  }

}
