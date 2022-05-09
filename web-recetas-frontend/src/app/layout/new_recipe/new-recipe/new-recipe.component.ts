import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Categoria, Receta } from '../../../core/entities/receta';
import { RecetasService } from '../../../core/services/recetas/recetas.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss']
})
export class NewRecipeComponent implements OnInit {

  recetaForm:FormGroup;
  listaCat:(string | Categoria)[];
  image:File;

  constructor(private formBuilder:FormBuilder, private router:Router, private recetaSerivce:RecetasService) { }

  ngOnInit(): void {
    this.recetaForm=this.formBuilder.group({
      titulo:['', Validators.required],
      contenido:[''],
      categoria:[''],
      img:[null]
    })
    this.listaCat=Object.values(Categoria);
    this.listaCat.splice(this.listaCat.length/2);
  }

  onSubmit(){
    if(this.recetaForm.invalid){
      return;
    }else{
      let receta:Receta={
        titulo: this.recetaForm.value.titulo,
        contenido: this.recetaForm.value.contenido,
        categoria: this.recetaForm.value.categoria,
        img: this.image.name
      }
      this.recetaSerivce.addReceta(receta,this.image);
    }
  }

  upload(event:Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.image=file;
    /*this.recetaForm.patchValue({
      img:file
    });
    this.recetaForm.get('img').updateValueAndValidity();*/
  }
}
