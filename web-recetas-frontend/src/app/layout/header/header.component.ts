import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { SharedService } from '../../core/services/shared/shared.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecetasService } from '../../core/services/recetas/recetas.service';
import { faBars, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoged:boolean;
  subscription:Subscription;
  searchForm:FormGroup;

  iconSearch=faMagnifyingGlass;
  iconSearchTab=faMagnifyingGlass;
  iconMenu=faBars;

  hidden:boolean=true;
  searchHidden:boolean=true;

  constructor(private router:Router, private recetaService:RecetasService, private authservice:AuthService, private ss:SharedService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.subscription=this.ss.getEmittedValue().subscribe((item:boolean)=>this.isLoged=item);
    if(localStorage.getItem("currentUser")!==null) this.isLoged=true;
    else this.isLoged=false;

    this.searchForm=this.formBuilder.group({"search":["", Validators.required]});
  }

  openMenu(){
    event.preventDefault();
    if(this.hidden===true){
      this.hidden=false;
      this.iconMenu=faXmark;
      if (this.searchHidden===false) this.openSearchBar();
    }else{
      this.hidden=true;
      this.iconMenu=faBars;
    }
    
  }

  openSearchBar(){
    event.preventDefault();
    if(this.searchHidden===true){
      this.searchHidden=false;
      this.iconSearchTab=faXmark;
      if (this.hidden===false) this.openMenu();
    }else{
      this.searchHidden=true;
      this.iconSearchTab=faMagnifyingGlass;
    }    
  }

  goUser(){
    event.preventDefault();
    if (this.hidden===false) this.openMenu();
    if(this.isLoged){
      this.router.navigate(["/user/"+this.authservice.userValue.username]);
    }
    else this.login();

  }

  goHome(){
    event.preventDefault();
    if (this.hidden===false) this.openMenu();
    this.router.navigate(["/home"]);
  }

  newRecipe(){
    event.preventDefault();
    if (this.hidden===false) this.openMenu();
    if(this.isLoged)this.router.navigate(['/new_recipe']);
    else this.login();
  }

  login(){
    event.preventDefault();
    if (this.hidden===false) this.openMenu();
    this.router.navigate(['/login']);
  }

  logout(){
    event.preventDefault();
    this.authservice.logout();
    this.isLoged=false;
    if (this.hidden===false) this.openMenu();
    this.router.navigate(['/login']);
  }

  Search(){
    if(this.searchForm.valid) this.router.navigate(['/search', this.searchForm.value.search]);
    
    if(this.searchHidden===false) this.openSearchBar();

    else return;
  }
}
