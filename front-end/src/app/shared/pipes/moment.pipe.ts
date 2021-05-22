import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'moment',
  pure: false
})
export class MomentPipe implements PipeTransform {
  transform(timestamp: number, format: string = 'H:mm'): string {
    return moment.unix(timestamp).format(format);
  }
}
