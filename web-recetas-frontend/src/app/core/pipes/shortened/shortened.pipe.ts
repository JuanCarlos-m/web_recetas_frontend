import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortened'
})
export class ShortenedPipe implements PipeTransform {

  transform(value: string, arg:number): string{
    let texto=value.slice(0,arg);
    if (texto.length!==value.length)texto=texto+"...";
    return texto;

  }

}
