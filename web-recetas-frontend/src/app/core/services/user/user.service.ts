import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../entities/user';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http:HttpClient, private readonly auth:AuthService) { }

  getByUsername(username:string):Observable<User>{
    const url=environment.api_url+"users/"+username;

    return this.http.get<User>(url);
  }

  registerUser(user:User){
    const url=environment.api_url+"signup";

    return this.http.post(url, user, {observe:'response'});
  }

  followUser(username:string){
    const url=environment.api_url+"users/"+this.auth.userValue.username+"/follow/";

    let params:HttpParams=new HttpParams().set('follow', username);

    return this.http.post(url,{},{params, headers: this.auth.HeaderToken});
  }

  unfollowUser(username:string){
    const url=environment.api_url+"users/"+this.auth.userValue.username+"/unfollow/";

    let params:HttpParams=new HttpParams().set('follow', username);

    return this.http.put(url,{},{params, headers: this.auth.HeaderToken});
  }

  checkFollow(username:string){
    const url=environment.api_url+"users/"+this.auth.userValue.username+"/follow/"+username;

    return this.http.get(url);
  }

  getNoFollowers(username:string){
    const url=environment.api_url+"users/"+username+"/followers";

    //Lo unico que nos interesa en esta peticion es el TotalElements, 
    //asi que podemos pedir una pagina pequeña para trabajar con un objeto pequeño
    //Por desgracia no se puede poner un valor 0 en size, y un valor 1 provoca un error extraño, asi que 2 es la mejor solucion ahora mismo.
    let params:HttpParams=new HttpParams().set('size',2);

    return this.http.get(url,{params});
  }
}
