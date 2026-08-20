import type { RiskSeverity } from '@prisma/client';

export function calculateRiskScore(probability: number, impact: number): number {
  return probability * impact;
}

export function getRiskSeverity(score: number): RiskSeverity {
  if (score >= 17) {
    return 'CRITICAL';
  }
  if (score >= 10) {
    return 'HIGH';
  }
  if (score >= 5) {
    return 'MEDIUM';
  }
  return 'LOW';
}
