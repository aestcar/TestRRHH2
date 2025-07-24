import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectiveComponent } from './directive.component';

describe('DirectiveComponent', () => {
  let component: DirectiveComponent;
  let fixture: ComponentFixture<DirectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectiveComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show limit message after 3 clicks on the button', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    button.click();
    button.click();
    button.click();
    fixture.detectChanges();
    const message = fixture.nativeElement.querySelector('.limit-message');
    expect(message).toBeTruthy();
    expect(message.textContent).toContain('Se ha alcanzado el límite de clics');
  });
});
