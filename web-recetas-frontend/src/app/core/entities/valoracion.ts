import { User } from './user';
import { Receta } from './receta';
export interface Valoracion{
    user?:User;
    receta?:Receta;
    valoracion?:number;
}