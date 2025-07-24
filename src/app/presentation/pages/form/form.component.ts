import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormGroup, Validators, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { SoftSkillLevelPipe } from '../../pipes/soft-skill-level/soft-skill-level.pipe';
import { CommonModule } from '@angular/common';
import { MFormFieldModule } from '@mercadona/components/form-field';
import { MInputModule } from '@mercadona/components/input';
import { MSelectModule } from '@mercadona/components/select';
import { nameValidator } from '@/presentation/validators/name.validator';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SoftSkillLevelPipe, MFormFieldModule, MInputModule, MSelectModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent {
  readonly #formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  readonly areasOptions: string[] = ['Comunicación', 'Liderazgo', 'Resolución'];

  readonly form: FormGroup = this.#formBuilder.group({
    nombreEvaluador: ['', [Validators.required, nameValidator]],
    email: ['', [Validators.required, Validators.email]],
    areaEvaluada: [''],
    puntuacion: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
    comentario: ['']
  });

  readonly #puntuacion = toSignal(this.form.controls.puntuacion.valueChanges, { initialValue: 0 });

  readonly comentarioEffect = effect(() => {
    const puntuacion = this.#puntuacion();
    const comentarioControl = this.form.controls.comentario;

    if (puntuacion <= 2) {
      comentarioControl.setValidators([Validators.required]);
    } else {
      comentarioControl.clearValidators();
    }

    comentarioControl.updateValueAndValidity({ emitEvent: false });
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    console.log('Form Data:', this.form.value);
  }
}
