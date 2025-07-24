import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LimitClicksDirective } from '../../directives/limit-clicks/limit-clicks.directive';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from "@/components/navigation/navigation.component";

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html',
  styleUrls: ['./directive.component.scss'],
  standalone: true,
  imports: [CommonModule, LimitClicksDirective, NavigationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DirectiveComponent {}
