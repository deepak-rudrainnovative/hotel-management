import { animate, state, style, transition, trigger } from '@angular/animations';
import {Component, ElementRef,OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { GeocodeService } from 'src/app/_services/geocode.service';
import { UserService } from 'src/app/_services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  animations: [
    trigger('balloonEffect', [
      state('initial', style({
        transform: 'scale(1)'
      })),
      state('final', style({
        transform: 'scale(1.5)'
      })),
      transition('final=>initial', animate('1000ms')),
      transition('initial=>final', animate('1500ms'))
    ]),
  ],
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  imgUrl:string=environment.imgUrl;
  user:any;
  editForm:FormGroup;
  message:string='';
  lat = 51.678418;
  lng = 7.809007;
  address = 'London';
  location: any;
  loading: boolean=false;
  currentState = 'initial';

  changeState() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }

  imgChangeEvt: any = '';
  cropImgPreview: any = '';
  onFileChange(event: any): void {
      this.imgChangeEvt = event;
  }
  cropImg(e: ImageCroppedEvent) {
      this.cropImgPreview = e.base64;
  }
  imgLoad(image: LoadedImage) {

  }
  initCropper() {
      // init cropper
  }
  
  imgFailed() {
      // error msg
  }

  @ViewChild('editSubmit') editSubmit:any;
  constructor(public userService : UserService,private el:ElementRef,private geocodeService:GeocodeService,private loadingBar: LoadingBarService) { 
    this.editForm=new FormGroup({
      _id:new FormControl('',[Validators.required]),
      name:new FormControl('',[Validators.required,Validators.minLength(3)]),
      email:new FormControl('',[Validators.required,Validators.pattern(/\S+@\S+\.\S+/)]),
      address:new FormControl('',[Validators.required]),
    })
  }

  ngOnInit(): void {
    this.userService.user.subscribe(resp=>{
      this.user=resp;
    })
    let address:any=localStorage.getItem('address')
    this.geocodeService.getLatLong(address).subscribe((resp:any)=>{
      this.lat=resp.data[0]?.latitude;
      this.lng=resp.data[0]?.longitude;
    })
  }




  get formControl(){
    return this.editForm.controls;
  }

  editFormSet(user:any){
    this.message='';
    const {_id,name,email,address}=user;
    this.editForm.setValue({_id,name,email,address})
  }

  handleEdit(){
    
    if(this.editForm.valid){
      this.loadingBar.start();
      this.userService.editUser(this.editForm.value).subscribe((resp:any)=>{
        console.log(resp)
        localStorage.setItem('address',resp?.address)
        this.userService.user.next(resp.body);
        this.message='Updated'
        this.loadingBar.complete();
        // this.editSubmit.nativeElement.innerHTML='Updated';
        // this.editSubmit.nativeElement.className='btn btn-success';
        // // editSubmit.style.cursor='not-allowed';
        // this.editSubmit.nativeElement.setAttribute('disabled',true)
        
      })
    }else{
    for (const key of Object.keys(this.editForm.controls)) {
      if (this.editForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
         invalidControl.focus();
        break;
     }
     }
    }
  }
  dataURLtoFile(dataurl:string, filename:string) {
    var arr:any = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }

//Usage example:


  changeProfile(){
    var file = this.dataURLtoFile(this.cropImgPreview, 'avatar.png');

    let formData=new FormData()
    formData.append('profile',file);
    if(file){
      this.userService.uploadProfile(formData).subscribe(resp=>{
        this.userService.user.next(resp.body);
        this.cropImgPreview="";
        this.imgChangeEvt=""
      });
    }
  }
}
