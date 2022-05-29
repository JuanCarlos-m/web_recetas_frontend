import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: string): string {
    let date=new Date(value);
    let actualDate=new Date();
    
    let age=actualDate.getFullYear()-date.getFullYear();

    if(date.getMonth()<actualDate.getMonth()){
      return (age-1).toString();
    }else if(date.getMonth()===actualDate.getMonth() && date.getDate()< actualDate.getDate()){
      return (age-1).toString();
    }else{
      return age.toString();
    }
  }

}
