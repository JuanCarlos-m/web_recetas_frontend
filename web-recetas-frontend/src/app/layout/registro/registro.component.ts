import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/entities/user';
import { AuthService } from '../../core/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { SharedService } from '../../core/services/shared/shared.service';
import { UserService } from '../../core/services/user/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  registroForm: FormGroup;
  error:Boolean=false;

  constructor(private formBuilder:FormBuilder,private userService:UserService, private authService: AuthService, private router:Router, private ss:SharedService) { }

  ngOnInit(): void {
    if(localStorage.getItem('currentUser')!==null) this.router.navigate(['/home']);
    else{
      this.registroForm=this.formBuilder.group({
        username:['', Validators.required],
        password:['', Validators.required],
        name:['', Validators.required],
        lastname:['', Validators.required],
        fechanac:['']
      });
    }
  }

  onSubmit(){
    if (this.registroForm.invalid){
      return;
    }else{
      let newuser:User={
        username:this.registroForm.value.username,
        password:this.registroForm.value.password,
        name:this.registroForm.value.name,
        lastname:this.registroForm.value.lastname,
        fecha_nac:this.registroForm.value.fechanac
      };
      
      this.userService.registerUser(newuser).subscribe(response => {
        this.authService.login(newuser.username, newuser.password).subscribe(response => {
          this.ss.setloged();
          this.router.navigate(['/home']);
        });
      }, error => {
        this.error=true;
      });
    } 
  }
}
