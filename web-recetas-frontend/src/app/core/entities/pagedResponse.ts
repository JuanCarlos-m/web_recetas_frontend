import { User } from './user';
import { Receta } from './receta';
import { Comentario } from './comentario';
export interface PagedResponse{
    
    usuarios?:User[];
    recetas?:Receta[];
    comentarios?:Comentario[]
    
    totalElements?:number;
    size?:number;
    number?:number;
}