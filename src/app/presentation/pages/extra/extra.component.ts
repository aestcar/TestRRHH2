import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-extra',
  standalone: true,
  imports: [],
  templateUrl: './extra.component.html',
  styleUrl: './extra.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExtraComponent {}
