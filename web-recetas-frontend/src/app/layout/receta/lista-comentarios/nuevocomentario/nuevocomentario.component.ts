import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Receta } from '../../../../core/entities/receta';
import { Comentario } from '../../../../core/entities/comentario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComentarioService } from '../../../../core/services/comentario/comentario.service';

@Component({
  selector: 'app-nuevocomentario',
  templateUrl: './nuevocomentario.component.html',
  styleUrls: ['./nuevocomentario.component.scss']
})
export class NuevocomentarioComponent implements OnInit {

  @Input() receta:number;

  comentario:Comentario;
  comentarioform:FormGroup;

  constructor(private formBuilder:FormBuilder, private comentarioService:ComentarioService) { }

  ngOnInit(): void {
    this.comentarioform=this.formBuilder.group({
      texto:['', Validators.required]
    });
  }

  onSubmit(){
    if(!this.comentarioform.invalid){
      let comentario:Comentario={
        texto:this.comentarioform.value.texto,
      }
      this.comentarioService.nuevoComentario(comentario, this.receta);
    }else return;
  }
}
