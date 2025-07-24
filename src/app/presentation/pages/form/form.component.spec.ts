import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark nombreEvaluador as invalid if it contains numbers', () => {
    const control = component.form.controls['nombreEvaluador'];
    control.setValue('Juan123');
    expect(control.invalid).toBeTrue();
    expect(control.errors).toEqual({ invalidName: 'El nombre no debe contener números ni símbolos.' });
  });

  it('should mark email as invalid if format is wrong', () => {
    const control = component.form.controls['email'];
    control.setValue('not-an-email');
    expect(control.invalid).toBeTrue();
    expect(control.errors).toEqual({ email: true });
  });

  it('should mark nombreEvaluador as invalid if empty', () => {
    const control = component.form.controls['nombreEvaluador'];
    control.setValue('');
    control.markAsTouched();
    expect(control.invalid).toBeTrue();
    expect(control.errors).toEqual({ required: true });
  });

  it('should mark email as invalid if empty', () => {
    const control = component.form.controls['email'];
    control.setValue('');
    control.markAsTouched();
    expect(control.invalid).toBeTrue();
    expect(control.errors).toEqual({ required: true });
  });

  it('should mark email as invalid if format is wrong', () => {
    const control = component.form.controls['email'];
    control.setValue('not-an-email');
    control.markAsTouched();
    expect(control.invalid).toBeTrue();
    expect(control.errors).toEqual({ email: true });
  });

  it('should mark puntuacion as invalid if empty', () => {
    const control = component.form.controls['puntuacion'];
    control.setValue('');
    control.markAsTouched();
    expect(control.invalid).toBeTrue();
    expect(control.errors).toEqual({ required: true });
  });

  it('should mark puntuacion as invalid if less than 1', () => {
    const control = component.form.controls['puntuacion'];
    control.setValue(0);
    control.markAsTouched();
    expect(control.invalid).toBeTrue();
    expect(control.errors).toEqual({ min: { min: 1, actual: 0 } });
  });

  it('should mark puntuacion as invalid if greater than 5', () => {
    const control = component.form.controls['puntuacion'];
    control.setValue(6);
    control.markAsTouched();
    expect(control.invalid).toBeTrue();
    expect(control.errors).toEqual({ max: { max: 5, actual: 6 } });
  });

  it('should mark comentario as required if puntuacion is 2 or less', () => {
    const puntuacionControl = component.form.controls['puntuacion'];
    const comentarioControl = component.form.controls['comentario'];
    puntuacionControl.setValue(2);
    comentarioControl.setValue('');
    comentarioControl.markAsTouched();
    fixture.detectChanges();
    expect(comentarioControl.invalid).toBeTrue();
    expect(comentarioControl.errors).toEqual({ required: true });
  });

  it('should not require comentario if puntuacion is 3 or more', () => {
    const puntuacionControl = component.form.controls['puntuacion'];
    const comentarioControl = component.form.controls['comentario'];
    puntuacionControl.setValue(3);
    comentarioControl.setValue('');
    comentarioControl.markAsTouched();
    fixture.detectChanges();
    expect(comentarioControl.valid).toBeTrue();
    expect(comentarioControl.errors).toBeNull();
  });

  it('should mark nombreEvaluador as invalid if it contains numbers or symbols', () => {
    const control = component.form.controls['nombreEvaluador'];
    control.setValue('Juan123!');
    control.markAsTouched();
    expect(control.invalid).toBeTrue();
    expect(control.errors).toEqual({ invalidName: 'El nombre no debe contener números ni símbolos.' });
  });

  it('should mark form as invalid if nombreEvaluador is missing', () => {
    component.form.setValue({
      nombreEvaluador: '',
      email: 'test@email.com',
      areaEvaluada: 'Comunicación',
      puntuacion: 3,
      comentario: 'Comentario'
    });
    expect(component.form.invalid).toBeTrue();
    expect(component.form.controls['nombreEvaluador'].errors).toEqual({ required: true });
  });

  it('should mark form as invalid if email is missing', () => {
    component.form.setValue({
      nombreEvaluador: 'Juan Pérez',
      email: '',
      areaEvaluada: 'Comunicación',
      puntuacion: 3,
      comentario: 'Comentario'
    });
    expect(component.form.invalid).toBeTrue();
    expect(component.form.controls['email'].errors).toEqual({ required: true });
  });

  it('should mark form as invalid if puntuacion is missing', () => {
    component.form.setValue({
      nombreEvaluador: 'Juan Pérez',
      email: 'test@email.com',
      areaEvaluada: 'Comunicación',
      puntuacion: '',
      comentario: 'Comentario'
    });
    expect(component.form.invalid).toBeTrue();
    expect(component.form.controls['puntuacion'].errors).toEqual({ required: true });
  });

  it('should mark form as invalid if comentario is missing and puntuacion is 2 or less', () => {
    component.form.setValue({
      nombreEvaluador: 'Juan Pérez',
      email: 'test@email.com',
      areaEvaluada: 'Comunicación',
      puntuacion: 2,
      comentario: ''
    });
    component.form.controls['comentario'].markAsTouched();
    component.form.updateValueAndValidity();
    expect(component.form.invalid).toBeTrue();
    expect(component.form.controls['comentario'].errors).toEqual({ required: true });
  });

  it('should not require comentario if puntuacion is 3 or more', () => {
    const puntuacionControl = component.form.controls['puntuacion'];
    const comentarioControl = component.form.controls['comentario'];
    puntuacionControl.setValue(3);
    comentarioControl.setValue('');
    comentarioControl.markAsTouched();
    fixture.detectChanges();
    expect(comentarioControl.valid).toBeTrue();
    expect(comentarioControl.errors).toBeNull();
  });

  it('should mark nombreEvaluador as invalid if it contains numbers or symbols', () => {
    const control = component.form.controls['nombreEvaluador'];
    control.setValue('Juan123!');
    control.markAsTouched();
    expect(control.invalid).toBeTrue();
    expect(control.errors).toEqual({ invalidName: 'El nombre no debe contener números ni símbolos.' });
  });

  it('should mark form as invalid if any required field is missing', () => {
    component.form.setValue({
      nombreEvaluador: '',
      email: '',
      areaEvaluada: '',
      puntuacion: '',
      comentario: ''
    });
    expect(component.form.invalid).toBeTrue();
  });

  it('should emit form data on valid submit', () => {
    spyOn(console, 'log');
    component.form.setValue({
      nombreEvaluador: 'Juan Pérez',
      email: 'juan@email.com',
      areaEvaluada: 'Comunicación',
      puntuacion: 5,
      comentario: 'Muy bien'
    });
    component.onSubmit();
    expect(console.log).toHaveBeenCalledWith('Form Data:', component.form.value);
  });

  it('should not emit form data on invalid submit', () => {
    spyOn(console, 'log');
    component.form.controls['nombreEvaluador'].setValue('');
    component.onSubmit();
    expect(console.log).not.toHaveBeenCalled();
  });
});
