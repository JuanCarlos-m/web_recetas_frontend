import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

  constructor(private readonly http:HttpClient, private readonly authservice:AuthService) { }

  getimage(name:string){
    const url=environment.api_url+"/download/"+name;

    return this.http.get(url);
  }
}
