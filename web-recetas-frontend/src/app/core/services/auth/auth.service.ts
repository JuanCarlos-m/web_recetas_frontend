import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Auth } from '../../entities/auth';
import { User } from '../../entities/user';
import { BehaviorSubject, map, Observable, of, Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { LoginComponent } from '../../../layout/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject:BehaviorSubject<User>;
  public user:Observable<User>

  constructor(private readonly http:HttpClient, private router: Router) { 
    this.userSubject=new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User{
    return this.userSubject.value;
  }

  public get HeaderToken():HttpHeaders{
    return new HttpHeaders({
      'Authorization':this.userSubject.value.token
    })
  }

  login(username:string, password:string){
    const url=environment.api_url+"login";
    let subscription:Observable<HttpResponse<User>>=this.http.post(url, {username, password},{observe: 'response'})
    
    subscription.subscribe(
      (response) => {
        let user:User={
          username:username,
          token:response.headers.get("Authorization")
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.generateUser()
        return user
      },(error)=>{}
    )
    return subscription;

  }

  generateUser(){
    this.userSubject=new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.user = this.userSubject.asObservable();
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.userSubject.next(null);
  }
}
