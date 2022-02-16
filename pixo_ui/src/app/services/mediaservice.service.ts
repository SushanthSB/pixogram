import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import {environment} from '../../environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaserviceService {

  constructor(private http: HttpClient) { }

  
  private apiUrl = environment.apiUrl+'/api/media/';



  
  // upload(file: File): Observable<any> {
 
  //   const req = new HttpRequest('POST', `${this.apiUrl}uploadFile`,{'mediafile':file}, {
  //     reportProgress: true,
  //     responseType: 'json'
  //   });

  //   return this.http.request(req);
  // }
  getAllFilesByUsername(username){
    const formData = new FormData();
    formData.append('username',username)
      return this.http.post<any>(this.apiUrl+'findallfilesbyusername',formData)
  }
  getAllFiles(){
      return this.http.get<any>(this.apiUrl+'findallfiles')
  }
  getAllUsers(){
    // const formData = new FormData();
    // formData.append('username',username)
      return this.http.get<any>(this.apiUrl+'allpixogramusers')
  }
  getAllUsersProfilePictures(){
   
      return this.http.get<any>(this.apiUrl+'findallprofilepictures')
  }
  public data
  getData(){
     return this.data
  }
  setData(data){
   this.data=data
  }
}
