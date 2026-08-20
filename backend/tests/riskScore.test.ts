import { describe, expect, it } from 'vitest';
import { calculateRiskScore, getRiskSeverity } from '../src/utils/riskScore';

describe('Risk Scoring Utility', () => {
  it('should accurately compute probability * impact', () => {
    expect(calculateRiskScore(5, 4)).toBe(20);
    expect(calculateRiskScore(3, 3)).toBe(9);
    expect(calculateRiskScore(1, 1)).toBe(1);
    expect(calculateRiskScore(4, 3)).toBe(12);
  });

  it('should correctly classify CRITICAL severity (score >= 17)', () => {
    expect(getRiskSeverity(25)).toBe('CRITICAL');
    expect(getRiskSeverity(20)).toBe('CRITICAL');
    expect(getRiskSeverity(17)).toBe('CRITICAL');
  });

  it('should correctly classify HIGH severity (10 <= score < 17)', () => {
    expect(getRiskSeverity(16)).toBe('HIGH');
    expect(getRiskSeverity(12)).toBe('HIGH');
    expect(getRiskSeverity(10)).toBe('HIGH');
  });

  it('should correctly classify MEDIUM severity (5 <= score < 10)', () => {
    expect(getRiskSeverity(9)).toBe('MEDIUM');
    expect(getRiskSeverity(6)).toBe('MEDIUM');
    expect(getRiskSeverity(5)).toBe('MEDIUM');
  });

  it('should correctly classify LOW severity (score < 5)', () => {
    expect(getRiskSeverity(4)).toBe('LOW');
    expect(getRiskSeverity(2)).toBe('LOW');
    expect(getRiskSeverity(1)).toBe('LOW');
  });
});
