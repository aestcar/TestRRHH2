import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes } from '@angular/router';
import { Location } from '@angular/common';
import { DirectiveComponent } from '@/pages/directive/directive.component';
import { FormComponent } from '@/pages/form/form.component';
import { PipeComponent } from '@/pages/pipe/pipe.component';
import { ExtraComponent } from '@/pages/extra/extra.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let router: Router;
  let location: Location;

  const routes: Routes = [
    { path: 'directiva', component: DirectiveComponent },
    { path: 'formulario', component: FormComponent },
    { path: 'pipe', component: PipeComponent },
    { path: 'extra', component: ExtraComponent }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NavigationComponent,
        RouterTestingModule.withRoutes(routes),
        DirectiveComponent,
        FormComponent,
        PipeComponent,
        ExtraComponent
      ],
      providers: []
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    router.initialNavigation();
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

  it('should navigate to the correct route when a navigation link is clicked', async () => {
    const links: NodeListOf<HTMLAnchorElement> = fixture.nativeElement.querySelectorAll('a[routerLink]');
    links[1].click();
    await fixture.whenStable();
    expect(location.path()).toBe('/formulario');
  });

  it('should navigate to /directiva when "Página de directiva" is clicked', async () => {
    const links: NodeListOf<HTMLAnchorElement> = fixture.nativeElement.querySelectorAll('a[routerLink]');
    links[0].click();
    await fixture.whenStable();
    expect(location.path()).toBe('/directiva');
  });

  it('should navigate to /pipe when "Página de pipe" is clicked', async () => {
    const links: NodeListOf<HTMLAnchorElement> = fixture.nativeElement.querySelectorAll('a[routerLink]');
    links[2].click();
    await fixture.whenStable();
    expect(location.path()).toBe('/pipe');
  });

  it('should navigate to /extra when "..." is clicked', async () => {
    const links: NodeListOf<HTMLAnchorElement> = fixture.nativeElement.querySelectorAll('a[routerLink]');
    links[3].click();
    await fixture.whenStable();
    expect(location.path()).toBe('/extra');
  });
});
