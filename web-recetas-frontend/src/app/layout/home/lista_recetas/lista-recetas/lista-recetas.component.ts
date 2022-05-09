import { Component, OnInit, EventEmitter, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Receta } from 'src/app/core/entities/receta';

import { RecetasService } from 'src/app/core/services/recetas/recetas.service';
import { PagedResponse } from '../../../../core/entities/pagedResponse';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-lista-recetas',
  templateUrl: './lista-recetas.component.html',
  styleUrls: ['./lista-recetas.component.scss']
})
export class ListaRecetasComponent implements OnInit {

  recetaList:Receta[]=[];
  emptylist:boolean=false;

  selector:FormGroup;

  option:string="timeline";
  pageSize:number=10;
  pageNo:number=1;
  totalItems:number=1;

  constructor(private formBuilder:FormBuilder,private recetaService:RecetasService, private readonly router:Router) { }

  ngOnInit(): void {
    this.selector=this.formBuilder.group({
      "option":["timeline"]
    })
    this.selector.get("option").valueChanges.subscribe((newvalue) =>{
      this.option=newvalue;
      this.loadList(1);
    })
    this.loadList(this.pageNo);
  }

  loadList(event:number){
    this.pageNo=event;
    switch (this.option) {
      case "all":
        this.recetaService.returnAllRecetas(event).subscribe((salida:PagedResponse)=>{
          if (this.emptylist) this.emptylist=false;
          this.recetaList=salida.recetas;
          this.totalItems=salida.totalElements;
        })
        break;
        case "timeline":
        this.recetaService.getTimeline(event).subscribe((salida:PagedResponse)=>{
          if (salida.recetas.length===0) this.emptylist=true;
          this.recetaList=salida.recetas;
          this.totalItems=salida.totalElements;
        })
        break;
    }
  }

  ngOnChanges(){
    console.log(this.selector);
  }
}
