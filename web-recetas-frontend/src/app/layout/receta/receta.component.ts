import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Receta } from 'src/app/core/entities/receta';
import { RecetasService } from '../../core/services/recetas/recetas.service';
import { Comentario } from '../../core/entities/comentario';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.scss']
})
export class RecetaComponent implements OnInit {

  id:number;
  receta:Receta;
  userIsAuthor:Boolean=false;
  

  constructor(private activatedRoute:ActivatedRoute, private recetaService:RecetasService, private router:Router, private auth:AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id=params['id'];
      this.recetaService.getRecetaById(this.id).subscribe((receta) => {
        this.receta=receta;
        if (receta.user.username===this.auth.userValue.username){
          this.userIsAuthor=true;
        }
      });
    })
  }

  goEdit(){
    this.router.navigate(["receta",this.id,"edit"]);
  }

  Borrar(){
    if(confirm("¿Estas seguro de querer borrar esta receta?")) {
      this.recetaService.borrarReceta(this.id);
      //this.router.navigate(['/home']);
    }
  }
}
