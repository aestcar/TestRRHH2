import {
  Directive,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  Renderer2,
  signal,
  type InputSignal,
  type OutputEmitterRef,
  type WritableSignal
} from '@angular/core';
import { Subject, timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Directive({
  selector: '[appLimitClicks]',
  standalone: true
})
export class LimitClicksDirective {
  readonly #el: ElementRef = inject(ElementRef);
  readonly #renderer: Renderer2 = inject(Renderer2);

  readonly maxClicks: InputSignal<number> = input.required<number>({ alias: 'appLimitClicks' });
  readonly disabledState: OutputEmitterRef<boolean> = output<boolean>();

  readonly #clicks: WritableSignal<number> = signal(0);
  readonly #resetSubject: Subject<void> = new Subject<void>();

  readonly _resetEffect = effect(
    () => {
      this.#resetSubject
        .pipe(
          switchMap(() => timer(1000)),
          tap(() => {
            this.#clicks.set(0);
            this.disabledState.emit(false);
            this.#renderer.removeClass(this.#el.nativeElement, 'limit-reached');
          })
        )
        .subscribe();
    },
    { allowSignalWrites: true }
  );

  @HostListener('click')
  onClick(): void {
    this.#clicks.update((count) => count + 1);
    this.#resetSubject.next();

    if (this.#clicks() >= this.maxClicks()) {
      this.disabledState.emit(true);
      this.#renderer.addClass(this.#el.nativeElement, 'limit-reached');
    }
  }
}
