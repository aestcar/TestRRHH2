import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LimitClicksDirective } from '../../directives/limit-clicks/limit-clicks.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html',
  styleUrls: ['./directive.component.scss'],
  standalone: true,
  imports: [CommonModule, LimitClicksDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DirectiveComponent {}
