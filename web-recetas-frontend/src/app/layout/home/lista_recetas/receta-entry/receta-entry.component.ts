import { Component, OnInit, Input } from '@angular/core';
import { Receta } from 'src/app/core/entities/receta';
import { Router } from '@angular/router';
import { ValoracionService } from 'src/app/core/services/valoracion/valoracion.service';
import { TotalValoracion } from 'src/app/core/entities/valoracion';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FileService } from '../../../../core/services/file/file.service';

@Component({
  selector: 'app-receta-entry',
  templateUrl: './receta-entry.component.html',
  styleUrls: ['./receta-entry.component.scss']
})
export class RecetaEntryComponent implements OnInit {

  @Input() receta:Receta;

  likes:number;
  faicon=faHeart  
  img:any;

  constructor(private router:Router, private fileService:FileService ,private valoracionService:ValoracionService) { }

  ngOnInit(): void {
    let reader=new FileReader();
    reader.addEventListener("load", () => {
      this.img=reader.result;
    }, false);
    this.valoracionService.getValoraciones(this.receta.id).subscribe((output:TotalValoracion)=>{
      this.likes=output.valoraciones;
    })
    this.fileService.getimage(this.receta.img, this.receta.id).subscribe({next:(img:any)=>{
      let blob=new Blob( [img], {type: 'image/jpeg'} );
      reader.readAsDataURL(blob);
    }, error:()=>{
      this.img=undefined;
    }});
  }

  goDetail(id:number){
    event.preventDefault();
    this.router.navigate(['receta', id]);
  }

  seeUser(username:string){
    event.preventDefault();
    this.router.navigate(["/user/"+username]);
  }
}
