import {AbstractControl} from '@angular/forms';
import { PhoneNumberUtil } from 'google-libphonenumber';



export function phoneValidator(control: AbstractControl) {

  const phoneUtil = PhoneNumberUtil.getInstance();
  if (control.value != "") {

    try {
      if (phoneUtil.isValidNumber(phoneUtil.parse(control.value, 'US'))) {

      } else {
        return {invalidphone: true};
      }
    } catch (error) {
      return {invalidphone: true};
    }


  }

  return null;
}
