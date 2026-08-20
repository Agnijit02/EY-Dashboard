import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import KPICard from './KPICard';
import type { KPIData } from '../dashboard.types';

describe('KPICard Component', () => {
  const mockPositiveKpi: KPIData = {
    id: 'kpi-1',
    title: 'Total Revenue',
    value: '₹128.4 Cr',
    change: '+14.2%',
    changeType: 'positive',
    description: 'vs previous quarter',
  };

  const mockNegativeKpi: KPIData = {
    id: 'kpi-2',
    title: 'Critical Risks',
    value: '4',
    change: '-25.0%',
    changeType: 'negative',
    description: 'requires executive mitigation',
  };

  it('renders positive KPI card title, value, change and description', () => {
    render(<KPICard data={mockPositiveKpi} />);

    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('₹128.4 Cr')).toBeInTheDocument();
    expect(screen.getByText('+14.2%')).toBeInTheDocument();
    expect(screen.getByText('vs previous quarter')).toBeInTheDocument();
  });

  it('renders negative KPI card with appropriate styling indicators', () => {
    render(<KPICard data={mockNegativeKpi} />);

    expect(screen.getByText('Critical Risks')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('-25.0%')).toBeInTheDocument();
  });
});
