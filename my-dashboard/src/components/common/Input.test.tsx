import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

describe('Input Component', () => {
  it('renders input with label correctly associated', () => {
    render(<Input label="Project Name" placeholder="Enter name" />);

    const input = screen.getByLabelText(/Project Name/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Enter name');
  });

  it('handles typing text values correctly', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Input label="Search" onChange={handleChange} />);
    const input = screen.getByLabelText(/Search/i);

    await user.type(input, 'Phoenix');
    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue('Phoenix');
  });

  it('displays error message and sets aria-invalid', () => {
    render(<Input label="Email Address" error="Invalid email address" />);

    const input = screen.getByLabelText(/Email Address/i);
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Invalid email address')).toBeInTheDocument();
  });

  it('displays helper text when no error is present', () => {
    render(<Input label="Code" helperText="Format: PRJ-XXX" />);

    expect(screen.getByText('Format: PRJ-XXX')).toBeInTheDocument();
  });
});
