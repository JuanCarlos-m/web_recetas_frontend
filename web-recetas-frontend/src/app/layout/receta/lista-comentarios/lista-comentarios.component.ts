import { Component, OnInit, Input } from '@angular/core';
import { Receta } from 'src/app/core/entities/receta';
import { Comentario } from '../../../core/entities/comentario';
import { ComentarioService } from '../../../core/services/comentario/comentario.service';
import { PagedResponse } from '../../../core/entities/pagedResponse';

@Component({
  selector: 'app-lista-comentarios',
  templateUrl: './lista-comentarios.component.html',
  styleUrls: ['./lista-comentarios.component.scss']
})
export class ListaComentariosComponent implements OnInit {

  @Input() receta:number;
  listacomentarios:Comentario[];

  pageSize:number=10;
  pageNo:number=1;
  totalItems:number=1;

  constructor(private comentarioService:ComentarioService) { }

  ngOnInit(): void {
   this.loadList()
  }

  loadList(event?:number){
    if (event!=undefined)this.pageNo=event;
    
    this.comentarioService.getComentarios(this.receta, this.pageNo).subscribe((salida:PagedResponse)=>{
      this.listacomentarios=salida.comentarios;
      this.totalItems=salida.totalElements;
    });
  }

}
