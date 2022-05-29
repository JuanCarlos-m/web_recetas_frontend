import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noformat'
})
export class NoformatPipe implements PipeTransform {

  transform(value: string): string {
    let texto=value.replace(/<\/?[^>]+(>|$)/g, "")
    return texto;
  }

}
