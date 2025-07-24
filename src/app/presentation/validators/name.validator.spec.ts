import { FormControl } from '@angular/forms';
import { nameValidator } from './name.validator';

describe('nameValidator', () => {
  it('should return null when the name is valid', () => {
    const control = new FormControl('John Doe');
    expect(nameValidator(control)).toBeNull();
  });

  it('should return null when the name contains Spanish characters', () => {
    const control = new FormControl('Sofía Núñez');
    expect(nameValidator(control)).toBeNull();
  });

  it('should return an error object when the name contains numbers', () => {
    const control = new FormControl('Jane123');
    expect(nameValidator(control)).toEqual({ invalidName: 'El nombre no debe contener números ni símbolos.' });
  });

  it('should return an error object when the name contains symbols', () => {
    const control = new FormControl('Peter@');
    expect(nameValidator(control)).toEqual({ invalidName: 'El nombre no debe contener números ni símbolos.' });
  });

  it('should return null for an empty string', () => {
    const control = new FormControl('');
    expect(nameValidator(control)).toBeNull();
  });

  it('should return null for a name with only spaces', () => {
    const control = new FormControl('   ');
    expect(nameValidator(control)).toBeNull();
  });

  it('should return null for a null value', () => {
    const control = new FormControl(null);
    expect(nameValidator(control)).toBeNull();
  });

  it('should return null for an undefined value', () => {
    const control = new FormControl(undefined);
    expect(nameValidator(control)).toBeNull();
  });
});
