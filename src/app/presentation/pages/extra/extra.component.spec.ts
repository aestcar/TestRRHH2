import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraComponent } from './extra.component';

describe('ExtraComponent', () => {
  let component: ExtraComponent;
  let fixture: ComponentFixture<ExtraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtraComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the cat image', () => {
    const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(img).toBeTruthy();
    expect(img.alt).toBe('Gatito');
    expect(img.src).toContain('/assets/images/cat.webp');
  });
});
