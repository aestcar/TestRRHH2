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

  it('should require comentario if puntuacion is 2 or less', () => {
    const puntuacionControl = component.form.controls['puntuacion'];
    const comentarioControl = component.form.controls['comentario'];
    puntuacionControl.setValue(2);
    comentarioControl.setValue('');
    comentarioControl.markAsTouched();
    fixture.detectChanges();
    expect(comentarioControl.invalid).toBeTrue();
  });

  it('should not require comentario if puntuacion is 3 or more', () => {
    const puntuacionControl = component.form.controls['puntuacion'];
    const comentarioControl = component.form.controls['comentario'];
    puntuacionControl.setValue(3);
    comentarioControl.setValue('');
    comentarioControl.markAsTouched();
    fixture.detectChanges();
    expect(comentarioControl.valid).toBeTrue();
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
});
