import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

describe('Login Page Component', () => {
  it('renders branding and login form fields', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/work email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in to workspace/i })).toBeInTheDocument();
  });

  it('populates credentials when clicking Admin quick-fill button', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    const adminQuickFill = screen.getByRole('button', { name: /admin/i });
    await user.click(adminQuickFill);

    const emailInput = screen.getByLabelText(/work email/i);
    const passwordInput = screen.getByLabelText(/^Password$/i);

    expect(emailInput).toHaveValue('admin@enterprise.demo');
    expect(passwordInput).toHaveValue('Password123!');
  });

  it('shows error validation if submitted empty', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    const submitBtn = screen.getByRole('button', { name: /sign in to workspace/i });
    await user.click(submitBtn);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/please enter your work email/i)).toBeInTheDocument();
  });
});
