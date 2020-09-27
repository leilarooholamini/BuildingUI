import { Pipe, PipeTransform } from "@angular/core";

import * as jalaliMoment from "jalali-moment";

@Pipe({
  name: "momentJalaali"
})
export class MomentJalaaliPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    jalaliMoment.locale("fa", { useGregorianParser: true });
    let MomentDate = jalaliMoment(value, 'YYYY/MM/DD');
    return MomentDate.locale('fa').format('YYYY/MM/DD');
   // return jalaliMoment(value).format(args);
  }
}