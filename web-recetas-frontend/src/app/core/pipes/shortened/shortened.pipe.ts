import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortened'
})
export class ShortenedPipe implements PipeTransform {

  transform(value: string): string{
    let texto=value.slice(0,200);
    if (texto.length!==value.length)texto=texto+"...";
    return texto;

  }

}
