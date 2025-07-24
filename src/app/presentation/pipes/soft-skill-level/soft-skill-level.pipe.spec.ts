import { SoftSkillLevelPipe } from './soft-skill-level.pipe';

describe('SoftSkillLevelPipe', () => {
  let pipe: SoftSkillLevelPipe;

  beforeEach(() => {
    pipe = new SoftSkillLevelPipe();
  });

  it('should return null for non-number values', () => {
    expect(pipe.transform('a')).toBeNull();
    expect(pipe.transform(null as unknown as number)).toBeNull();
    expect(pipe.transform(undefined as unknown as number)).toBeNull();
  });

  it('should return null for numbers out of range', () => {
    expect(pipe.transform(0)).toBeNull();
    expect(pipe.transform(6)).toBeNull();
  });

  it('should return text and emoji for normal mode', () => {
    expect(pipe.transform(1)).toBe('Bajo 😞');
    expect(pipe.transform(2)).toBe('Medio-Bajo 😟');
    expect(pipe.transform(3)).toBe('Medio 😐');
    expect(pipe.transform(4)).toBe('Medio-Alto 😊');
    expect(pipe.transform(5)).toBe('Alto 😄');
  });

  it('should return only emoji for compact mode', () => {
    expect(pipe.transform(1, 'compact')).toBe('😞');
    expect(pipe.transform(2, 'compact')).toBe('😟');
    expect(pipe.transform(3, 'compact')).toBe('😐');
    expect(pipe.transform(4, 'compact')).toBe('😊');
    expect(pipe.transform(5, 'compact')).toBe('😄');
  });
});
