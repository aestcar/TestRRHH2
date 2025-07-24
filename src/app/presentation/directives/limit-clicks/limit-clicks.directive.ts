import {
  Directive,
  Input,
  HostListener,
  ElementRef,
  Renderer2,
  OnDestroy,
  inject,
  WritableSignal,
  signal,
  effect,
  InputSignal,
  input
} from '@angular/core';
import { Subject } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appLimitClicks]',
  standalone: true
})
export class LimitClicksDirective {
  readonly maxClicks: InputSignal<number> = input.required();

  readonly #el: ElementRef = inject(ElementRef);
  readonly #renderer: Renderer2 = inject(Renderer2);
  readonly #clicks: WritableSignal<number> = signal(0);
  readonly #clickSubject = new Subject<void>();

  readonly #debouncedClick = toSignal(this.#clickSubject.pipe(debounceTime(60000)), { initialValue: null });

  #tooltip: HTMLElement | null = null;

  constructor() {
    effect(() => {
      const trigger = this.#debouncedClick();
      if (trigger !== null) {
        this.#clicks.set(0);
        this.#enableElement();
        this.#hideTooltip();
      }
    });
  }

  @HostListener('click')
  onClick() {
    this.#clicks.update((c) => c + 1);
    this.#clickSubject.next();

    if (this.#clicks() >= this.maxClicks()) {
      this.#disableElement();
      this.#showTooltip('Se ha alcanzado el límite de clics');
    }
  }

  #disableElement() {
    this.#renderer.setProperty(this.#el.nativeElement, 'disabled', true);
    this.#renderer.setStyle(this.#el.nativeElement, 'background-color', 'grey');
    this.#renderer.setStyle(this.#el.nativeElement, 'cursor', 'not-allowed');
  }

  #enableElement() {
    this.#renderer.setProperty(this.#el.nativeElement, 'disabled', false);
    this.#renderer.setStyle(this.#el.nativeElement, 'background-color', '');
    this.#renderer.setStyle(this.#el.nativeElement, 'cursor', 'pointer');
  }

  #showTooltip(message: string) {
    if (!this.#tooltip) {
      this.#tooltip = this.#renderer.createElement('span');
      const text = this.#renderer.createText(message);
      this.#renderer.appendChild(this.#tooltip, text);
      this.#renderer.appendChild(this.#el.nativeElement.parentNode, this.#tooltip);
      this.#renderer.setStyle(this.#tooltip, 'position', 'absolute');
      this.#renderer.setStyle(this.#tooltip, 'background-color', 'black');
      this.#renderer.setStyle(this.#tooltip, 'color', 'white');
      this.#renderer.setStyle(this.#tooltip, 'padding', '5px');
      this.#renderer.setStyle(this.#tooltip, 'border-radius', '3px');
      this.#renderer.setStyle(this.#tooltip, 'z-index', '1000');
    }
  }

  #hideTooltip() {
    if (this.#tooltip) {
      this.#renderer.removeChild(this.#el.nativeElement.parentNode, this.#tooltip);
      this.#tooltip = null;
    }
  }
}
