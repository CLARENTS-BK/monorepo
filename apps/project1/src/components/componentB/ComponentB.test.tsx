import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ComponentB from './ComponentB';

describe('ComponentB', () => {
  test('renders the form correctly', () => {
    render(<ComponentB />);

    expect(screen.getByText('Formulario de contacto')).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre:')).toBeInTheDocument();
    expect(screen.getByLabelText('Correo electrónico:')).toBeInTheDocument();
    expect(screen.getByText('Enviar')).toBeInTheDocument();
  });

  test('validates the form correctly', () => {
    render(<ComponentB />);

    fireEvent.click(screen.getByText('Enviar'));

    expect(screen.getByText('El nombre es requerido.')).toBeInTheDocument();
    expect(screen.getByText('Introduce un correo electrónico válido.')).toBeInTheDocument();
  });

  test('submits the form successfully', async () => {
    render(<ComponentB />);

    const nameInput = screen.getByLabelText('Nombre:');
    const emailInput = screen.getByLabelText('Correo electrónico:');
    const submitButton = screen.getByText('Enviar');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(screen.getByText('¡Gracias por enviar el formulario, John Doe!')).toBeInTheDocument(), {
      timeout: 3000,
    });
  });
});
