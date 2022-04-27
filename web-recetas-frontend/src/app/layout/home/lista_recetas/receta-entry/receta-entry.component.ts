import { Component, OnInit, Input } from '@angular/core';
import { Receta } from 'src/app/core/entities/receta';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receta-entry',
  templateUrl: './receta-entry.component.html',
  styleUrls: ['./receta-entry.component.scss']
})
export class RecetaEntryComponent implements OnInit {

  @Input() receta:Receta;

  constructor(private router:Router) { }

  ngOnInit(): void {
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
