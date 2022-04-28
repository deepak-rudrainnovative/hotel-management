import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from 'src/app/_services/hotel.service';

@Component({
  selector: 'app-hotel-settings',
  templateUrl: './hotel-settings.component.html',
  styleUrls: ['./hotel-settings.component.css']
})
export class HotelSettingsComponent implements OnInit {
  hotelId:string='';
  hotel:any;
  hotelSettingForm:FormGroup;
  isEmojiPickerVisible: boolean=false;
  socialMedia=[
    {name:'facebook',isSelected:false},
    {name:'instagram',isSelected:false},
    {name:'twitter',isSelected:false},
    {name:'linkedin',isSelected:false}
  ];
  constructor(private hotelService:HotelService,private route:ActivatedRoute) { 
    this.hotelSettingForm=new FormGroup({
      name:new FormControl('',[Validators.required,Validators.minLength(3)]),
      type:new FormControl('',[Validators.required]),
      address:new FormControl('',[Validators.required]),
      contact:new FormControl('',[Validators.required]),
      pincode:new FormControl('',[Validators.required,Validators.minLength(3)]),
      isOpen:new FormControl(true)
    });
  }

  ngOnInit(): void {
     this.hotelId=this.route.snapshot.paramMap.get('id')||'';
     this.hotelService.getHotelById(this.hotelId).subscribe(hotel=>{
        this.hotel=hotel.body;
        this.hotelSettingForm.patchValue(this.hotel);
     })
  }

  handleSelect(index:number,isSelected:boolean){
    this.socialMedia[index].isSelected=!isSelected;
  }

  get formControl(){
    return this.hotelSettingForm.controls;
  }
  public addEmoji(event:any) {
    let name=this.hotelSettingForm.value.name+event.emoji.native;
    this.hotelSettingForm.patchValue({name});
    this.isEmojiPickerVisible = false;
  }
}
