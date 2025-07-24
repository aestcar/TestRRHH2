import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule
} from '@angular/forms';
import { SoftSkillLevelPipe } from '../../pipes/soft-skill-level/soft-skill-level.pipe';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from "@/components/navigation/navigation.component";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SoftSkillLevelPipe, NavigationComponent],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent {
  //readonly #formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  form: FormGroup;
  areas = ['Comunicación', 'Liderazgo', 'Resolución'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombreEvaluador: ['', [Validators.required, this.nombreValidator]],
      email: ['', [Validators.required, Validators.email]],
      areaEvaluada: ['', Validators.required],
      puntuacion: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comentario: ['']
    });

    this.form.get('puntuacion')?.valueChanges.subscribe((value) => {
      const comentarioControl = this.form.get('comentario');
      if (value <= 2) {
        comentarioControl?.setValidators(Validators.required);
      } else {
        comentarioControl?.clearValidators();
      }
      comentarioControl?.updateValueAndValidity();
    });
  }

  nombreValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const isValid = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(value);
    return isValid ? null : { invalidName: 'El nombre no debe contener números ni símbolos.' };
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form Data:', this.form.value);
    }
  }
}
