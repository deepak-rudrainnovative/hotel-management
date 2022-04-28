import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';

import { HotelService } from 'src/app/_services/hotel.service';
import { UserService } from 'src/app/_services/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-hotel',
  templateUrl: './create-hotel.component.html',
  styleUrls: ['./create-hotel.component.css']
})
export class CreateHotelComponent implements OnInit {
  hotelForm:FormGroup;
  files:Array<any>=[];
  selectedFiles:Array<any>=[];
  message:string="";
  user:any;
  isEmojiPickerVisible: boolean=false;
   

  constructor(private el:ElementRef,private hotelService:HotelService,private userService:UserService,private router:Router,private loadingBar: LoadingBarService,private toastr:ToastrService) { 
    this.hotelForm=new FormGroup({
      name:new FormControl('',[Validators.required,Validators.minLength(3)]),
      type:new FormControl('',[Validators.required]),
      address:new FormControl('',[Validators.required]),
      contact:new FormControl('',[Validators.required]),
      pincode:new FormControl('',[Validators.required,Validators.minLength(3)])
    })
  }

  ngOnInit(): void {
    this.userService.user.subscribe(resp=>{
      this.user=resp;
    })
  }

  get formControl(){
    return this.hotelForm.controls;
  }

  selectFiles(event:Event){
    let data:any=event.target
    let files=data.files
    for(let file of files){
      this.files.push(file);
      let reader=new FileReader();
      reader.onload=(e)=>{
        this.selectedFiles.push(e.target?.result)
      }
      reader.readAsDataURL(file)
    }
    
  }
  
  handleCreateHotel(){
    console.log(this.hotelForm.controls)
    if(this.hotelForm.valid){
      this.loadingBar.start()
      const {name,type,address,contact,pincode}=this.hotelForm.value;
      let formData=new FormData();
      formData.append('name',name);
      formData.append('type',type);
      formData.append('address',address);
      formData.append('contact',contact);
      formData.append('pincode',pincode);
      formData.append('owner',this.user._id);
      this.files.forEach(file=>{
        formData.append('images',file);
      })
      this.hotelService.registerHotel(formData).subscribe(resp=>{
        this.hotelForm.reset();
        this.loadingBar.complete();
        this.toastr.success('Hotel Created Successfully', 'Hotel Create');
        this.router.navigate(['/dashboard'])
      },(error:any)=>{
        this.message=error.error;
      })
    }else{
      for (const key of Object.keys(this.hotelForm.controls)) {
        if (this.hotelForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
       }
    }
   }
  }

  handleDeleteFile(index:number){
      this.files.splice(index,1);
      this.selectedFiles.splice(index,1);
  }
  public addEmoji(event:any) {
    let name=this.hotelForm.value.name+event.emoji.native;
    this.hotelForm.patchValue({name});
    this.isEmojiPickerVisible = false;
  }
}
