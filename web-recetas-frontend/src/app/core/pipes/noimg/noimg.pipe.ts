import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimg'
})
export class NoimgPipe implements PipeTransform {

  transform(value: string): string{
    let texto=value.replace(/<img\/?[^>]+(>|$)/g, "")
    return texto;
  }

}
