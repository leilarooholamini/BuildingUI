// import { Pipe, PipeTransform, Injectable } from '@angular/core';
// @Pipe({
//     name: 'mnfilter'
// })
 
// export class  implements PipeTransform {
//     transform(items: any[], field : string, value : string): any[] {  
//       if (!items) return [];
//       if (!value || value.length == 0) return items;
//       return items.filter(it => 
//       it[field].toLowerCase().indexOf(value.toLowerCase()) !=-1);
//     }
// }
   

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mnfilter',
    pure: false
})
export class MnFilterPipe implements PipeTransform {
    transform(items: any[], filter: any): any {
        if (!items || !filter) {
            return items;
        }
      
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item.ControlTypeCode.indexOf(filter.ControlTypeCode) !== -1);
    }
}