import { AbstractControl } from '@angular/forms';

export function MustLecturer(control: AbstractControl): {[key: string]: any} {
  const enteredEmail = control.value.toLowerCase() as string;
  if ( enteredEmail.includes('cmb.ac.lk') && !enteredEmail.includes('stu') ) {
    return null;
  } else {
    return { invalidLecture: {value: control.value} };
  }
}
