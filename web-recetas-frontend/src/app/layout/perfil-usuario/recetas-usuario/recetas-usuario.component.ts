import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Receta } from '../../../core/entities/receta';
import { UserService } from '../../../core/services/user/user.service';
import { Router } from '@angular/router';
import { RecetasService } from '../../../core/services/recetas/recetas.service';
import { PagedResponse } from '../../../core/entities/pagedResponse';

@Component({
  selector: 'app-recetas-usuario',
  templateUrl: './recetas-usuario.component.html',
  styleUrls: ['./recetas-usuario.component.scss']
})
export class RecetasUsuarioComponent implements OnInit {

  @Input() username:string;
  recetas:Receta[];

  pageSize:number=10;
  pageNo:number=1;
  totalItems:number=1;

  constructor(private recetaService:RecetasService, private router:Router) { }

  ngOnInit(): void {
    this.loadList(this.pageNo);
    
  }

  ngOnChanges(): void{
    this.loadList(this.pageNo);
  }

  loadList(page:number){
    this.pageNo=page;
    this.recetaService.getRecetasByUser(this.username, this.pageNo).subscribe((response:PagedResponse)=>{
      this.recetas=response.recetas;
      this.totalItems=response.totalElements;
    })
  }

  moveTo(id:number){
    event.preventDefault();
    this.router.navigate(['receta', id]);
  }
}
