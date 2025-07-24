import { ChangeDetectionStrategy, Component, WritableSignal, signal } from '@angular/core';
import { LimitClicksDirective } from '../../directives/limit-clicks/limit-clicks.directive';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '@/components/navigation/navigation.component';
import { MButtonComponent } from '@mercadona/components/button';

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html',
  styleUrls: ['./directive.component.scss'],
  standalone: true,
  imports: [CommonModule, MButtonComponent, LimitClicksDirective, NavigationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DirectiveComponent {
  readonly isButtonDisabled: WritableSignal<boolean> = signal(false);

  onDisabledStateChanged(isDisabled: boolean): void {
    this.isButtonDisabled.set(isDisabled);
  }
}
