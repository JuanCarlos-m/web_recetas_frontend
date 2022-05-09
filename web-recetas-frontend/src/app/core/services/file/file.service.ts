import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Receta } from '../../entities/receta';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private readonly http:HttpClient, private readonly authservice:AuthService) { }

  getimage(name:string, idReceta:number):any{
    
    const imgName="Receta_"+idReceta+"_"+name;

    const url=environment.api_url+"download/"+imgName;

    return this.http.get(url, {responseType:'blob'});
  }
}
