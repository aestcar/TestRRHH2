import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeComponent } from './pipe.component';

describe('PipeComponent', () => {
  let component: PipeComponent;
  let fixture: ComponentFixture<PipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a list of skill levels with the pipe', () => {
    const items: NodeListOf<HTMLLIElement> = fixture.nativeElement.querySelectorAll('ul:first-of-type li');
    expect(items.length).toBe(5);
    expect(items[0].textContent).toContain('1:');
    expect(items[4].textContent).toContain('5:');
  });
});
