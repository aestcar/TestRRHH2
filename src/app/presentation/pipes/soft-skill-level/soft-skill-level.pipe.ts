import { SoftSkillLevelMode } from '@/types/soft-skill-level/soft-skill-level.type';
import { Pipe, PipeTransform } from '@angular/core';

interface SkillLevel {
  text: string;
  emoji: string;
}

@Pipe({
  name: 'softSkillLevel',
  standalone: true
})
export class SoftSkillLevelPipe implements PipeTransform {
  transform(value: unknown, mode: SoftSkillLevelMode = 'normal'): string | null {
    if (typeof value !== 'number' || value < 1 || value > 5) {
      return null;
    }

    const skillLevels: Record<number, SkillLevel> = {
      1: { text: 'Bajo', emoji: '😞' },
      2: { text: 'Medio-Bajo', emoji: '😟' },
      3: { text: 'Medio', emoji: '😐' },
      4: { text: 'Medio-Alto', emoji: '😊' },
      5: { text: 'Alto', emoji: '😄' }
    };

    const level = skillLevels[value];

    if (mode === 'compact') {
      return level.emoji;
    }

    return `${level.text} ${level.emoji}`;
  }
}
