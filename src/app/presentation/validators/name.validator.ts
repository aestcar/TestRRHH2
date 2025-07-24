import { AbstractControl, ValidationErrors } from '@angular/forms';

export function nameValidator(control: AbstractControl): ValidationErrors | null {
  const regex: RegExp = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;
  const value = control.value;
  const isValid = regex.test(value);
  return isValid ? null : { invalidName: 'El nombre no debe contener números ni símbolos.' };
}
