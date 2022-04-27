import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from '../../core/entities/user';
import { AuthService } from '../../core/services/auth/auth.service';
import { PagedResponse } from '../../core/entities/pagedResponse';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {

  username:string;
  user:User;
  sameUser:boolean=false;
  isFollowed:boolean=false;
  buttonText:String="Seguir";
  noFollowers:number=0;

  constructor(private router:Router, private activatedRoute:ActivatedRoute, private userService:UserService, private auth:AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      this.username=params['username'];
      this.userService.getByUsername(this.username).subscribe((user)=>{
        this.user=user;
        
        this.getNoFollowers();

        if (user.username===this.auth.userValue.username) this.sameUser=true;


        this.userService.checkFollow(this.username).subscribe((response)=>{
          //No se puede hacer un isfollowed=response, ya que los observables no pueden devolver booleanos aparentemente (if(response) si funciona), pero y lo que molaria.
          if (response) this.isFollowed=true;
          else this.isFollowed=false;
        })
      });
    })
  }

  getNoFollowers(){
    this.userService.getNoFollowers(this.username).subscribe((response:PagedResponse)=>{
      this.noFollowers=response.totalElements;
    })
  }

  Follow(){
    this.userService.followUser(this.username).subscribe(()=>{
      this.getNoFollowers();
      this.isFollowed=true;
    });
  }

  Unfollow(){
    this.userService.unfollowUser(this.username).subscribe(()=>{
      this.getNoFollowers();
      this.isFollowed=false;
    });
  }
}
