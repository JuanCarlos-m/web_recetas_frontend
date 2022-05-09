import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Receta } from 'src/app/core/entities/receta';
import { RecetasService } from '../../core/services/recetas/recetas.service';
import { Comentario } from '../../core/entities/comentario';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FileService } from 'src/app/core/services/file/file.service';
import { ValoracionService } from '../../core/services/valoracion/valoracion.service';
import { TotalValoracion } from 'src/app/core/entities/valoracion';
import { Valoracion } from '../../core/entities/valoracion';
import { UserService } from '../../core/services/user/user.service';
import { User } from 'src/app/core/entities/user';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.scss']
})
export class RecetaComponent implements OnInit {

  id:number;
  receta:Receta;
  userIsAuthor:Boolean=false;
  likes:number=0;
  userVal:Valoracion;

  img:any;
  

  constructor(private activatedRoute:ActivatedRoute, private recetaService:RecetasService, private fileservice:FileService, private valoracionService:ValoracionService, private userService:UserService,private router:Router, private auth:AuthService) { }

  ngOnInit(): void {
    let reader=new FileReader();
    reader.addEventListener("load", () => {
      this.img=reader.result;
    }, false);
    this.activatedRoute.params.subscribe((params) => {
      this.id=params['id'];
      this.recetaService.getRecetaById(this.id).subscribe((receta) => {
        this.receta=receta;
        this.fileservice.getimage(this.receta.img, this.receta.id).subscribe((img:any)=>{
          let blob=new Blob( [img], {type: 'image/jpeg'} );
          reader.readAsDataURL(blob);
        });
        if (receta.user.username===this.auth.userValue.username){
          this.userIsAuthor=true;
        }
        this.updateLikes();
        this.valoracionService.getValoracionFromUser(this.receta.id).subscribe({next: (valoracion:Valoracion)=>{
          this.userVal=valoracion;
        }, error:()=>{
          this.userVal={valoracion:0};
        }})
      });
    })
  }

  searchCat(){
    event.preventDefault();
    this.router.navigate(["search/category/", this.receta.categoria])
  }

  goEdit(){
    this.router.navigate(["receta",this.id,"edit"]);
  }

  Borrar(){
    if(confirm("¿Estas seguro de querer borrar esta receta?")) {
      this.recetaService.borrarReceta(this.id);
      this.router.navigate(['/home']);
    }
  }

  updateLikes(){
    this.valoracionService.getValoraciones(this.receta.id).subscribe((output:TotalValoracion)=>{
      this.likes=output.valoraciones;
    })
  }

  addValoracion(val:number){
    switch (this.userVal.valoracion) {
      case val:
        this.valoracionService.removeValoracion(this.userVal.id).subscribe(()=>{
          this.userVal.valoracion=0;
          this.updateLikes();
        });
        break;
      case 0:
        this.userService.getByUsername(this.auth.userValue.username).subscribe((user:User)=>{
          this.valoracionService.addValoracion({
            user:user,
            receta:this.receta,
            valoracion:val
          }).subscribe((newVal:Valoracion)=>{
            this.userVal=newVal;
            this.updateLikes();
          })
        })
        break;
      default:
        this.userVal.valoracion=val;
        this.valoracionService.changeValoracion(this.userVal).subscribe(()=>{
          this.updateLikes();
        });
    }
  }
}
