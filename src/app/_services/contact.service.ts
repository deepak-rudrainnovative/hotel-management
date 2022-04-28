import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  apiUrl:string=environment.apiUrl;
  constructor(private http:HttpClient) { }

  createContact(contact:any){
    return this.http.post(this.apiUrl+'/contact',contact,{observe:'response'}).pipe(
      catchError(error=>{
        return this.handleError(error);
      })
    );
  }


  handleError(error:HttpErrorResponse){
    return throwError(error);
  }
}
