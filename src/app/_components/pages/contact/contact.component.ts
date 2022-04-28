import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { UserService } from 'src/app/_services/user.service';
import { AngularEditorConfig, UploadResponse } from '@kolkov/angular-editor';
import { HttpEvent } from '@angular/common/http';
import { ContactService } from 'src/app/_services/contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit,OnDestroy {
  contactForm:FormGroup;
  userSubscription:Subscription=new Subscription;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '140px',
    maxHeight: '',
    placeholder: 'Enter text here...',
    translate: 'no',
    sanitize: false,
    toolbarPosition: 'top',
    defaultFontName: 'Arial',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    // upload:(file:any)=>{this.uploadFile(file)},
    uploadWithCredentials: false,
    toolbarHiddenButtons: [
      [],
      ['unlink',
      'insertImage',
      'insertVideo',]
    ]
  };
  constructor(private fb:FormBuilder,private er:ElementRef,private userService:UserService,private contactService:ContactService,private toastrService:ToastrService) { 
    this.contactForm=fb.group({
      user:fb.control('',[Validators.required]),
      title:fb.control('',[Validators.required]),
      description:fb.control('',[Validators.required])
    })
  }

  ngOnInit(): void {
     this.userSubscription=this.userService.user.subscribe(user=>{
       this.contactForm.patchValue({user:user._id});
     })

  }
  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }
  get formControl(){
    return this.contactForm.controls;
  }

  handleContact(){
    if(this.contactForm.valid){
      this.contactService.createContact(this.contactForm.value).subscribe(contact=>{
        this.contactForm.reset();
        this.toastrService.success("welcome","Contact has saved Successfully");
        console.log(contact)
      },error=>{
        this.toastrService.error("Contact Failed","Error");
      })
    }else{
      for (const key of Object.keys(this.contactForm.controls)) {
        if (this.contactForm.controls[key].invalid) {
          const invalidControl = this.er.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
       }
     }
    }
  }
  uploadFile(file:File):any{
    
  }

}
