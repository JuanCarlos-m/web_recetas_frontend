import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: string): string {
    let date:Date=new Date(value);
    
    let month:string;

    switch (date.getMonth()) {
      case 0:
        month="Enero";
        break;
      case 1:
        month="Febrero";
        break;
      case 2:
        month="Marzo";
        break;
      case 3:
        month="Abril";
        break;
      case 4:
        month="Mayo";
        break;
      case 5:
        month="Junio";
        break;
      case 6:
        month="Julio";
        break;
      case 7:
        month="Agosto";
        break;
      case 8:
        month="Septiembre";
        break;
      case 9:
        month="Octubre";
        break;
      case 10:
        month="Novienbre";
        break;
      case 11:
        month="Diciembre";
        break;
      default:
        //No deberia salir pero por si acaso aparece el mes de Smarzo es que algo ha ido mal
        month="Smarzo";
    }
    return date.getDate()+" de "+month+" de "+date.getFullYear();
  }

}
