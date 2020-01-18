import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as firebase from 'firebase/app';



export function unregisteredEmailValidator(type: string): ValidatorFn {

  const registeredEmails = [] as string[];
  firebase.firestore().collection(type).get().then( array => {
    array.docs.map( item => {
      const itemEmail = item.data().email.toLowerCase();
      if ( registeredEmails.includes(itemEmail) ) {
      } else {
        registeredEmails.push(itemEmail);
      }
    });
  });

  return (control: AbstractControl): {[key: string]: any} | null => {

    const tempValue = control.value.toLowerCase();

    if ( registeredEmails.includes(tempValue) ) {
      return null;
    } else {
      return {unRegisteredEmail: {value: control.value}};
    }

  };

}
