import { User } from './user';
import { Receta } from './receta';
export interface Comentario{
    
    id?:number;
    titulo?:string;
    texto?:string;
    autor?:User;
    createdAt?:Date;
    receta?:Receta;
}