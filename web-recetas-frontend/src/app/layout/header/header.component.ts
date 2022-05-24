import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { SharedService } from '../../core/services/shared/shared.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecetasService } from '../../core/services/recetas/recetas.service';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoged:boolean;
  subscription:Subscription;
  searchForm:FormGroup;

  faicon=faMagnifyingGlass;

  constructor(private router:Router, private recetaService:RecetasService, private authservice:AuthService, private ss:SharedService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.subscription=this.ss.getEmittedValue().subscribe((item:boolean)=>this.isLoged=item);
    if(localStorage.getItem("currentUser")!==null) this.isLoged=true;
    else this.isLoged=false;

    this.searchForm=this.formBuilder.group({"search":["", Validators.required]});
  }


  goUser(){
    event.preventDefault();
    if(this.isLoged){
      this.router.navigate(["/user/"+this.authservice.userValue.username]);
    }
    else this.login();

  }

  goHome(){
    event.preventDefault();
    this.router.navigate(["/home"]);
  }

  newRecipe(){
    event.preventDefault();
    if(this.isLoged)this.router.navigate(['/new_recipe']);
    else this.login();
  }

  login(){
    event.preventDefault();
    this.router.navigate(['/login']);
  }

  logout(){
    event.preventDefault();
    this.authservice.logout();
    this.isLoged=false;
    this.router.navigate(['/login']);
  }

  Search(){
    if(this.searchForm.valid) this.router.navigate(['/search', this.searchForm.value.search]);
    
    else return;
  }
}
