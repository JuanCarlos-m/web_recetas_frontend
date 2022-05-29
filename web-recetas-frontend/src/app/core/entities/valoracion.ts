import { User } from './user';
import { Receta } from './receta';
export interface Valoracion{
    id?:number;
    user?:User;
    receta?:Receta;
    valoracion?:number;
}

export interface TotalValoracion{
    recetaid?:number;
    valoraciones?:number;
}