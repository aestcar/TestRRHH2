import { ChangeDetectionStrategy, Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { SoftSkillLevelPipe } from '../../pipes/soft-skill-level/soft-skill-level.pipe';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '@/components/navigation/navigation.component';
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
    puntuacion: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
    comentario: ['']
  });

  readonly #puntuacionSignal: WritableSignal<number> = signal<number>(0);

  constructor() {
    effect(() => {
      const puntuacion = this.#puntuacionSignal();

      const comentarioControl = this.form.controls.comentario;

      if (puntuacion <= 2) {
        comentarioControl.setValidators([Validators.required]);
      } else {
        comentarioControl.clearValidators();
      }

      comentarioControl.updateValueAndValidity({ emitEvent: false });
    });

    this.form.controls.puntuacion.valueChanges.subscribe((value) => {
      this.#puntuacionSignal.set(value ?? 0); // Espero que Angular cambie los formularios con signals pronto
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    console.log('Form Data:', this.form.value);
  }
}
