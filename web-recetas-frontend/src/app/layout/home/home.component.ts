import { Component, OnInit } from '@angular/core';
import { RecetasService } from '../../core/services/recetas/recetas.service';
import { Receta } from '../../core/entities/receta';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    
  }
  
}
