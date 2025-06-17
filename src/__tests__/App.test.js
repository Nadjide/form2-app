import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  test('devrait rendre le composant UserForm', () => {
    render(<App />);
    expect(screen.getByText("Formulaire d'inscription")).toBeInTheDocument();
  });

  test('devrait avoir la classe App', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toHaveClass('App');
  });
}); 