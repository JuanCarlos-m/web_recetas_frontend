import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Comentario } from '../../entities/comentario';
import { UserService } from '../user/user.service';
import { User } from '../../entities/user';
import { environment } from 'src/environments/environment';
import { RecetasService } from '../recetas/recetas.service';
import { Receta } from '../../entities/receta';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(private readonly http:HttpClient, private readonly authservice:AuthService, private readonly recetaService:RecetasService, private readonly userservice:UserService) { }

  getComentarios(receta:number, pageNo:number){
    const url=environment.api_url+"recetas/"+receta+"/comentarios"

    let params:HttpParams=new HttpParams().set('no', pageNo);

    return this.http.get(url, {params});
  }

  nuevoComentario(comentario:Comentario, receta:number){
    this.userservice.getByUsername(this.authservice.userValue.username).subscribe((user:User) => {
      comentario.autor=user;
      this.recetaService.getRecetaById(receta).subscribe((receta:Receta)=>{
        comentario.receta=receta;
        const url=environment.api_url+"comentario";
        this.http.post(url, comentario, {headers: this.authservice.HeaderToken}).subscribe(()=>{window.location.reload()});
      })
      
    })
  }
  
  deleteComentario(id:number){
    const url=environment.api_url+"comentario/"+id;
    this.http.delete(url,{headers:this.authservice.HeaderToken}).subscribe();
    window.location.reload();
  }
}
