import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[phonePattern]'
})
export class PhonePatternDirective {

  @HostListener('keyup', ['$event.target'])
  onRightClick(event) {
    let trimmed = event.value.replace(/[^0-9]/g, '');
    if (trimmed.length > 12) {
      trimmed = trimmed.substr(0, 12);
    }
    trimmed = trimmed.replace(/-/g,'');
    let numbers = []; 
    numbers.push(trimmed.substr(0,3));
    if(trimmed.substr(3,2)!=='') {
      numbers.push(trimmed.substr(3,3));
    }
    if(trimmed.substr(6,3)!='') {
      numbers.push(trimmed.substr(6,4));
    }
    event.value = numbers.join('-');
  }
}
