import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noformat'
})
export class NoformatPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
