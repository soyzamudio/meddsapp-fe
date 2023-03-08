import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'age',
  standalone: true
})
export class AgePipe implements PipeTransform {
  transform(value: Date | undefined): string {
    if (!value) {
      return '';
    }

    let today = moment();
    let birthdate = moment(value);
    let years = today.diff(birthdate, 'years');
    let html: string = years + ' años ';

    return html;
  }
}
