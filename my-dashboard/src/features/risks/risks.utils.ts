import type { RiskSeverity } from './risks.types';

export function calculateRiskScore(probability: number, impact: number): number {
	return probability * impact;
}

export function getRiskSeverity(score: number): RiskSeverity {
	if (score >= 17) {
		return 'critical';
	}

	if (score >= 10) {
		return 'high';
	}

	if (score >= 5) {
		return 'medium';
	}

	return 'low';
}
