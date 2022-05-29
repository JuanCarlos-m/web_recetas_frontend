import { Component, OnInit, Input } from '@angular/core';
import { ComentarioService } from 'src/app/core/services/comentario/comentario.service';
import { Comentario } from '../../../../core/entities/comentario';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.scss']
})
export class ComentarioComponent implements OnInit {

  @Input() comentario:Comentario;
  userIsAuthor:boolean=false;

  faicon=faTrashCan;

  constructor(private comentarioService:ComentarioService, private auth:AuthService) { }

  ngOnInit(): void {
    if(this.comentario.autor.username==this.auth.userValue.username){
      this.userIsAuthor=true;
    }else{
      this.userIsAuthor=false;
    }
  }

  borrarComentario(){
    this.comentarioService.deleteComentario(this.comentario.id);
  }

}
