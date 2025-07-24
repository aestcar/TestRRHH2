import {
  Directive,
  HostListener,
  effect,
  input,
  output,
  signal,
  type InputSignal,
  type OutputEmitterRef,
  type WritableSignal
} from '@angular/core';
import { Subject } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appLimitClicks]',
  standalone: true
})
export class LimitClicksDirective {
  readonly maxClicks: InputSignal<number> = input.required<number>({ alias: 'appLimitClicks' });
  readonly disabledState: OutputEmitterRef<boolean> = output<boolean>();

  readonly #clicks: WritableSignal<number> = signal(0);
  readonly #clickSubject: Subject<void> = new Subject<void>();

  readonly #debouncedClick = toSignal(this.#clickSubject.pipe(debounceTime(60000)), { initialValue: null });

  constructor() {
    effect(() => {
      const trigger = this.#debouncedClick();
      if (trigger !== null) {
        this.#clicks.set(0);
        this.disabledState.emit(false);
      }
    });
  }

  @HostListener('click')
  onClick(): void {
    this.#clicks.update((c: number): number => c + 1);
    this.#clickSubject.next();

    if (this.#clicks() >= this.maxClicks()) {
      this.disabledState.emit(true);
    }
  }
}
