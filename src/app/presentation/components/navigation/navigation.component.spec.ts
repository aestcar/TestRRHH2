import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import { ActivatedRoute } from '@angular/router';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationComponent],
      providers: [{ provide: ActivatedRoute, useValue: {} }]
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render navigation links with correct text and routes', () => {
    const links: NodeListOf<HTMLAnchorElement> = fixture.nativeElement.querySelectorAll('a[routerLink]');
    expect(links.length).toBe(4);
    expect(links[0].textContent).toContain('Página de directiva');
    expect(links[0].getAttribute('routerLink')).toBe('/directiva');
    expect(links[1].textContent).toContain('Página de formulario');
    expect(links[1].getAttribute('routerLink')).toBe('/formulario');
    expect(links[2].textContent).toContain('Página de pipe');
    expect(links[2].getAttribute('routerLink')).toBe('/pipe');
    expect(links[3].textContent).toContain('...');
    expect(links[3].getAttribute('routerLink')).toBe('/extra');
  });
});
