import { Directive, Input, HostListener, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appLimitClicks]',
  standalone: true
})
export class LimitClicksDirective implements OnDestroy {
  @Input() maxClicks = 5;

  #clicks: number = 0;
  #clickSubject = new Subject<void>();
  #subscription: Subscription;
  #tooltip: HTMLElement | null = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.#subscription = this.#clickSubject.pipe(debounceTime(60000)).subscribe(() => {
      this.#clicks = 0;
      this.#enableElement();
      this.#hideTooltip();
    });
  }

  @HostListener('click')
  onClick() {
    this.#clicks++;
    this.#clickSubject.next();

    if (this.#clicks >= this.maxClicks) {
      this.#disableElement();
      this.#showTooltip('Se ha alcanzado el límite de clics');
    }
  }

  #disableElement() {
    this.renderer.setProperty(this.el.nativeElement, 'disabled', true);
    this.renderer.setStyle(this.el.nativeElement, 'background-color', 'grey');
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'not-allowed');
  }

  #enableElement() {
    this.renderer.setProperty(this.el.nativeElement, 'disabled', false);
    this.renderer.setStyle(this.el.nativeElement, 'background-color', '');
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
  }

  #showTooltip(message: string) {
    if (!this.#tooltip) {
      this.#tooltip = this.renderer.createElement('span');
      const text = this.renderer.createText(message);
      this.renderer.appendChild(this.#tooltip, text);
      this.renderer.appendChild(this.el.nativeElement.parentNode, this.#tooltip);
      this.renderer.setStyle(this.#tooltip, 'position', 'absolute');
      this.renderer.setStyle(this.#tooltip, 'background-color', 'black');
      this.renderer.setStyle(this.#tooltip, 'color', 'white');
      this.renderer.setStyle(this.#tooltip, 'padding', '5px');
      this.renderer.setStyle(this.#tooltip, 'border-radius', '3px');
      this.renderer.setStyle(this.#tooltip, 'z-index', '1000');
    }
  }

  #hideTooltip() {
    if (this.#tooltip) {
      this.renderer.removeChild(this.el.nativeElement.parentNode, this.#tooltip);
      this.#tooltip = null;
    }
  }

  ngOnDestroy() {
    this.#subscription.unsubscribe();
  }
}
