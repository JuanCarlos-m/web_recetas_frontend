import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetasService } from 'src/app/core/services/recetas/recetas.service';
import { Receta, Categoria } from '../../../core/entities/receta';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-receta',
  templateUrl: './editar-receta.component.html',
  styleUrls: ['./editar-receta.component.scss']
})
export class EditarRecetaComponent implements OnInit {

  receta:Receta;
  recetaForm:FormGroup;
  listaCat:(string|Categoria)[];

  constructor(private activatedRoute:ActivatedRoute, private recetaService:RecetasService, private router:Router,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      let id=params['id'];
      this.recetaService.getRecetaById(id).subscribe((receta)=>{
        this.receta=receta;
        this.recetaForm=this.formBuilder.group({
          titulo:[receta.titulo, Validators.required],
          contenido:[receta.contenido],
          categoria:[receta.categoria]
        });
      });
    });
    this.listaCat=Object.values(Categoria);
    this.listaCat.splice(this.listaCat.length/2);
  }

  onSubmit(){
    if(this.recetaForm.invalid){
      return;
    }else{
      let updReceta:Receta=this.receta;
      updReceta.titulo=this.recetaForm.value.titulo;
      updReceta.contenido=this.recetaForm.value.contenido;
      updReceta.categoria=this.recetaForm.value.categoria;
      this.recetaService.editReceta(updReceta);
    }
  }

}
