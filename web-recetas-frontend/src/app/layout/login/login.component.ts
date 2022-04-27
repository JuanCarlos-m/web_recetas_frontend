import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/entities/user';
import { AuthService } from '../../core/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { SharedService } from '../../core/services/shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginerror:Boolean=false;

  constructor(private formBuilder:FormBuilder, private authService: AuthService, private router:Router, private ss:SharedService) { }

  ngOnInit(): void {
    if(localStorage.getItem('currentUser')!==null) this.router.navigate(['/home']);
    else{
      this.loginForm=this.formBuilder.group({
        username:['', Validators.required],
        password:['', Validators.required]
      });
    }
  }

  onSubmit(){
    if (this.loginForm.invalid){
      return;
    }else{
      this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe((response) => {
        this.ss.setloged();
        this.router.navigate(['/home']);
      },
      (error)=>{
        this.loginerror=true;
      } );
    } 
  }

  goRegister(){
    event.preventDefault();
    this.router.navigate(['/signin'])
  }
}
