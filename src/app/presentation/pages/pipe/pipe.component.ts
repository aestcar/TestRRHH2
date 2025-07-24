import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal, signal } from '@angular/core';

import { SoftSkillLevelPipe } from '../../pipes/soft-skill-level/soft-skill-level.pipe';
import { NavigationComponent } from "@/components/navigation/navigation.component";

@Component({
  selector: 'app-pipe',
  standalone: true,
  imports: [CommonModule, SoftSkillLevelPipe, NavigationComponent],
  templateUrl: './pipe.component.html',
  styleUrl: './pipe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PipeComponent {
  readonly skillLevels: Signal<number[]> = signal([1, 2, 3, 4, 5]);
}
