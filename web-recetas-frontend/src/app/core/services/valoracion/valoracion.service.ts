import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Valoracion } from '../../entities/valoracion';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValoracionService {

  constructor(private http:HttpClient, private auth:AuthService) { }

  getValoraciones(id:number){
    const url=environment.api_url+"valoracion/"+id;

    return this.http.get(url);
  }

  getValoracionFromUser(idReceta:number){
    const url=environment.api_url+"valoracion/"+idReceta+"/"+this.auth.userValue.username;

    return this.http.get(url);
  }

  addValoracion(valoracion:Valoracion){
    const url=environment.api_url+"valoracion";

    return this.http.post(url,valoracion, {headers:this.auth.HeaderToken});
  }

  changeValoracion(valoracion:Valoracion){
    const url=environment.api_url+"valoracion";

    return this.http.put(url,valoracion, {headers:this.auth.HeaderToken});
  }

  removeValoracion(id:number){
    const url=environment.api_url+"valoracion/"+id;

    return this.http.delete(url,{headers:this.auth.HeaderToken});
  }
}
