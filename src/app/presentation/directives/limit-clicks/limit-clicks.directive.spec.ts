import { Component, DebugElement, ViewChild, type WritableSignal, signal } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LimitClicksDirective } from './limit-clicks.directive';

@Component({
  standalone: true,
  imports: [LimitClicksDirective],
  template: `
    <button
      #button
      [appLimitClicks]="3"
      (disabledState)="onDisabledStateChanged($event)"
      [disabled]="isButtonDisabled()">
      Click me
    </button>
  `
})
class TestComponent {
  @ViewChild(LimitClicksDirective) directive!: LimitClicksDirective;
  isButtonDisabled: WritableSignal<boolean> = signal(false);

  onDisabledStateChanged(disabled: boolean): void {
    this.isButtonDisabled.set(disabled);
  }
}

describe('LimitClicksDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let buttonEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    buttonEl = fixture.debugElement.query(By.css('button'));
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component.directive).toBeTruthy();
  });

  it('should emit disabledState and add class when click limit is reached', fakeAsync(() => {
    const button: HTMLButtonElement = buttonEl.nativeElement;

    button.click();
    button.click();
    fixture.detectChanges();

    expect(component.isButtonDisabled()).toBe(false);
    expect(button.classList.contains('limit-reached')).toBe(false);

    button.click();
    fixture.detectChanges();

    expect(component.isButtonDisabled()).toBe(true);
    expect(button.classList.contains('limit-reached')).toBe(true);
    TestBed.flushEffects();
    discardPeriodicTasks();
  }));

  it('should reset clicks and disabled state after 60 seconds', fakeAsync(() => {
    const button: HTMLButtonElement = buttonEl.nativeElement;

    button.click();
    button.click();
    button.click();
    fixture.detectChanges();

    expect(component.isButtonDisabled()).toBe(true);
    expect(button.classList.contains('limit-reached')).toBe(true);

    tick(60000);
    fixture.detectChanges();

    expect(component.isButtonDisabled()).toBe(false);
    expect(button.classList.contains('limit-reached')).toBe(false);

    button.click();
    fixture.detectChanges();
    expect(component.isButtonDisabled()).toBe(false);
    TestBed.flushEffects();
    discardPeriodicTasks();
  }));

  it('should reset the timer on each click', fakeAsync(() => {
    const button: HTMLButtonElement = buttonEl.nativeElement;

    button.click();
    tick(30000);
    button.click();
    tick(30000);
    button.click();
    fixture.detectChanges();

    expect(component.isButtonDisabled()).toBe(true);

    tick(30000);
    fixture.detectChanges();

    expect(component.isButtonDisabled()).toBe(true);

    tick(30000);
    fixture.detectChanges();

    expect(component.isButtonDisabled()).toBe(false);
    TestBed.flushEffects();
    discardPeriodicTasks();
  }));
});
