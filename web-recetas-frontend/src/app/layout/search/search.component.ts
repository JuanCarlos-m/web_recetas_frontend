import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagedResponse } from 'src/app/core/entities/pagedResponse';
import { Receta } from 'src/app/core/entities/receta';
import { RecetasService } from 'src/app/core/services/recetas/recetas.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  recetaList:Receta[]=[];

  pageSize:number=10;
  pageNo:number=1;
  totalItems:number=1;
  search:string;

  constructor(private activatedRoute:ActivatedRoute, private recetaService:RecetasService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) =>{
      this.search=params['search'];
      this.loadList(1);
    })
    this.loadList(this.pageNo);
  }

  loadList(event:number){
    this.pageNo=event;
    this.recetaService.searchReceta(this.search,this.pageNo).subscribe((salida:PagedResponse)=>{
      this.recetaList=salida.recetas;
      this.totalItems=salida.totalElements;
    });
  }
}
