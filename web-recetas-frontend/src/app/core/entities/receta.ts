import { User } from "./user";
import { Comentario } from './comentario';

export interface Receta{

    id?:number;
    createdAt?:string;
    titulo?:string;
    contenido?:string;
    img?:string;
    categoria?:Categoria;
    user?:User;
    comentarios?:Comentario[];
}

export enum Categoria{
    entrantes,
    carnes,
    sopas,
    pescado,
    verduras,
    postres,
    bebidas
}