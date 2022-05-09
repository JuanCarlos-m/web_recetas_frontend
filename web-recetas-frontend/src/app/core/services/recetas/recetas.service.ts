import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Receta } from '../../entities/receta';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../../entities/user';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { PagedResponse } from '../../entities/pagedResponse';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {

  constructor(private readonly http:HttpClient, private readonly authservice:AuthService, private router:Router) { }

  public recetaList:Receta[]=[];
  //public receta:Receta;
  
  returnAllRecetas(pageNo:number): Observable<PagedResponse>{
    const url=environment.api_url+"recetas";

    let params:HttpParams=new HttpParams().set('no', pageNo);

    return this.http.get<PagedResponse>(url,{params});
  }
  
  getRecetasByUser(username:string, pageNo:number):Observable<PagedResponse>{
    const url=environment.api_url+"recetas/user/"+username;

    let params:HttpParams=new HttpParams().set('no', pageNo);

    return this.http.get<PagedResponse>(url, {params});
  }

  getTimeline(pageNo:number):Observable<PagedResponse>{
    const url=environment.api_url+"recetas/user/"+this.authservice.userValue.username+"/timeline";

    let params:HttpParams=new HttpParams().set('no', pageNo);

    return this.http.get<PagedResponse>(url,{params})
  }

  getRecetaById(id:number):Observable<Receta>{
    const url=environment.api_url+"recetas/"+id;

    return this.http.get<Receta>(url);
  }

  searchReceta(busqueda:string, pageNo:number=1){
    const url=environment.api_url+"recetas/";

    let params:HttpParams=new HttpParams().set('search', busqueda);
    params=params.set('no', pageNo);

    return this.http.get<PagedResponse>(url,{params});
  }

  searchByCategoria(busqueda:string, pageNo:number=1){
    const url=environment.api_url+"recetas/categoria/"+busqueda;

    let params:HttpParams=new HttpParams().set('no', pageNo);

    return this.http.get<PagedResponse>(url,{params});
  }
  

  addReceta(receta:Receta, img?:File){
    const url=environment.api_url+"users/"+this.authservice.userValue.username;

    this.http.get<User>(url).subscribe((user:User)=>{
      receta.user=user;
      const url2=environment.api_url+"recetas";
      
      this.http.post(url2,receta, {headers: this.authservice.HeaderToken}).subscribe((receta:Receta) =>{
        const url3=environment.api_url+"upload";
        
        let formdata:FormData=new FormData();
        formdata.append("file", img);

        let params:HttpParams=new HttpParams()
        params=params.set('id',receta.id);
        params=params.set('entity', 'Receta');

        this.http.post(url3,formdata, {params ,headers:this.authservice.HeaderToken}).subscribe(()=>{
          this.router.navigate(['receta', receta.id]);
        });
      })
    })
  }

  editReceta(receta:Receta){
    const url=environment.api_url+"recetas";

    this.http.put(url,receta,{headers: this.authservice.HeaderToken}).subscribe((receta:Receta) =>{
      this.router.navigate(['receta', receta.id]);
    })
  }

  borrarReceta(id:number){
    const url=environment.api_url+"recetas/"+id;

    this.http.delete(url, {headers: this.authservice.HeaderToken}).subscribe();
  }
}
