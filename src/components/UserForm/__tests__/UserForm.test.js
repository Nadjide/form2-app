import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserForm from '../UserForm';

// Mock du service API
jest.mock('../../../services/api', () => ({
  __esModule: true,
  default: {
    createUser: jest.fn(() => Promise.resolve({ message: "Utilisateur créé avec succès", user_id: 1 })),
  },
}));

describe('UserForm Component', () => {
  beforeEach(() => {
    render(<UserForm />);
  });

  describe('Rendu initial', () => {
    test('devrait afficher le titre du formulaire', () => {
      expect(screen.getByText("Formulaire d'inscription")).toBeInTheDocument();
    });

    test('devrait afficher tous les champs requis', () => {
      expect(screen.getByLabelText('Prénom *')).toBeInTheDocument();
      expect(screen.getByLabelText('Nom *')).toBeInTheDocument();
      expect(screen.getByLabelText('Email *')).toBeInTheDocument();
      expect(screen.getByLabelText('Date de naissance *')).toBeInTheDocument();
      expect(screen.getByLabelText('Code postal *')).toBeInTheDocument();
      expect(screen.getByLabelText('Ville *')).toBeInTheDocument();
    });

    test('devrait afficher le bouton de soumission désactivé', () => {
      const submitButton = screen.getByRole('button', { name: /s'inscrire/i });
      expect(submitButton).toBeDisabled();
    });
  });

  describe('Validation des champs', () => {
    test('devrait valider un prénom valide', async () => {
      const firstNameInput = screen.getByLabelText('Prénom *');
      await userEvent.type(firstNameInput, 'Jean');
      
      expect(firstNameInput).toHaveValue('Jean');
      expect(screen.queryByText(/ce champ doit contenir uniquement des lettres/i)).not.toBeInTheDocument();
    });

    test('devrait afficher une erreur pour un prénom invalide', async () => {
      const firstNameInput = screen.getByLabelText('Prénom *');
      await userEvent.type(firstNameInput, 'J');
      
      expect(screen.getByText(/ce champ doit contenir uniquement des lettres/i)).toBeInTheDocument();
    });

    test('devrait valider un nom avec accents', async () => {
      const lastNameInput = screen.getByLabelText('Nom *');
      await userEvent.type(lastNameInput, 'François');
      
      expect(lastNameInput).toHaveValue('François');
      expect(screen.queryByText(/ce champ doit contenir uniquement des lettres/i)).not.toBeInTheDocument();
    });

    test('devrait valider un email valide', async () => {
      const emailInput = screen.getByLabelText('Email *');
      await userEvent.type(emailInput, 'test@example.com');
      
      expect(emailInput).toHaveValue('test@example.com');
      expect(screen.queryByText(/veuillez entrer une adresse email valide/i)).not.toBeInTheDocument();
    });

    test('devrait afficher une erreur pour un email invalide', async () => {
      const emailInput = screen.getByLabelText('Email *');
      await userEvent.type(emailInput, 'invalid-email');
      
      expect(screen.getByText(/veuillez entrer une adresse email valide/i)).toBeInTheDocument();
    });

    test('devrait valider un code postal français', async () => {
      const postalCodeInput = screen.getByLabelText('Code postal *');
      await userEvent.type(postalCodeInput, '75001');
      
      expect(postalCodeInput).toHaveValue('75001');
      expect(screen.queryByText(/le code postal doit contenir exactement 5 chiffres/i)).not.toBeInTheDocument();
    });

    test('devrait afficher une erreur pour un code postal invalide', async () => {
      const postalCodeInput = screen.getByLabelText('Code postal *');
      await userEvent.type(postalCodeInput, '7501');
      
      expect(screen.getByText(/le code postal doit contenir exactement 5 chiffres/i)).toBeInTheDocument();
    });

    test('devrait valider une ville avec tiret', async () => {
      const cityInput = screen.getByLabelText('Ville *');
      await userEvent.type(cityInput, 'Saint-Étienne');
      
      expect(cityInput).toHaveValue('Saint-Étienne');
      expect(screen.queryByText(/ce champ doit contenir uniquement des lettres/i)).not.toBeInTheDocument();
    });
  });

  describe('Validation de la date de naissance', () => {
    test('devrait accepter une date de naissance pour un adulte', async () => {
      const birthDateInput = screen.getByLabelText('Date de naissance *');
      const today = new Date();
      today.setFullYear(today.getFullYear() - 20);
      const dateString = today.toISOString().split('T')[0];
      
      fireEvent.change(birthDateInput, { target: { value: dateString } });
      
      expect(birthDateInput).toHaveValue(dateString);
      expect(screen.queryByText(/vous devez avoir au moins 18 ans/i)).not.toBeInTheDocument();
    });

    test('devrait afficher une erreur pour un mineur', async () => {
      const birthDateInput = screen.getByLabelText('Date de naissance *');
      const today = new Date();
      today.setFullYear(today.getFullYear() - 16);
      const dateString = today.toISOString().split('T')[0];
      
      fireEvent.change(birthDateInput, { target: { value: dateString } });
      
      expect(screen.getByText(/vous devez avoir au moins 18 ans/i)).toBeInTheDocument();
    });
  });

  describe('Soumission du formulaire', () => {
    test('devrait activer le bouton quand tous les champs sont valides', async () => {
      const user = userEvent.setup();
      
      const firstNameInput = screen.getByLabelText('Prénom *');
      const lastNameInput = screen.getByLabelText('Nom *');
      const emailInput = screen.getByLabelText('Email *');
      const birthDateInput = screen.getByLabelText('Date de naissance *');
      const postalCodeInput = screen.getByLabelText('Code postal *');
      const cityInput = screen.getByLabelText('Ville *');
      const submitButton = screen.getByRole('button', { name: /s'inscrire/i });

      await user.type(firstNameInput, 'Jean');
      await user.type(lastNameInput, 'Dupont');
      await user.type(emailInput, 'jean.dupont@example.com');
      
      const today = new Date();
      today.setFullYear(today.getFullYear() - 20);
      const dateString = today.toISOString().split('T')[0];
      fireEvent.change(birthDateInput, { target: { value: dateString } });
      
      await user.type(postalCodeInput, '75001');
      await user.type(cityInput, 'Paris');

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });
    });

    test('devrait soumettre le formulaire avec des données valides', async () => {
      const user = userEvent.setup();
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      const firstNameInput = screen.getByLabelText('Prénom *');
      const lastNameInput = screen.getByLabelText('Nom *');
      const emailInput = screen.getByLabelText('Email *');
      const birthDateInput = screen.getByLabelText('Date de naissance *');
      const postalCodeInput = screen.getByLabelText('Code postal *');
      const cityInput = screen.getByLabelText('Ville *');
      const submitButton = screen.getByRole('button', { name: /s'inscrire/i });

      await user.type(firstNameInput, 'Jean');
      await user.type(lastNameInput, 'Dupont');
      await user.type(emailInput, 'jean.dupont@example.com');
      
      const today = new Date();
      today.setFullYear(today.getFullYear() - 20);
      const dateString = today.toISOString().split('T')[0];
      fireEvent.change(birthDateInput, { target: { value: dateString } });
      
      await user.type(postalCodeInput, '75001');
      await user.type(cityInput, 'Paris');

      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Inscription réussie !')).toBeInTheDocument();
        expect(screen.getByText(/merci pour votre inscription, jean !/i)).toBeInTheDocument();
        expect(consoleSpy).toHaveBeenCalledWith('Utilisateur créé:', undefined);
      });

      consoleSpy.mockRestore();
    });

    test('devrait afficher le message de succès et permettre une nouvelle inscription', async () => {
      const user = userEvent.setup();
      
      const firstNameInput = screen.getByLabelText('Prénom *');
      const lastNameInput = screen.getByLabelText('Nom *');
      const emailInput = screen.getByLabelText('Email *');
      const birthDateInput = screen.getByLabelText('Date de naissance *');
      const postalCodeInput = screen.getByLabelText('Code postal *');
      const cityInput = screen.getByLabelText('Ville *');
      const submitButton = screen.getByRole('button', { name: /s'inscrire/i });

      await user.type(firstNameInput, 'Jean');
      await user.type(lastNameInput, 'Dupont');
      await user.type(emailInput, 'jean.dupont@example.com');
      
      const today = new Date();
      today.setFullYear(today.getFullYear() - 20);
      const dateString = today.toISOString().split('T')[0];
      fireEvent.change(birthDateInput, { target: { value: dateString } });
      
      await user.type(postalCodeInput, '75001');
      await user.type(cityInput, 'Paris');

      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Inscription réussie !')).toBeInTheDocument();
      });

      const newRegistrationButton = screen.getByRole('button', { name: /nouvelle inscription/i });
      await user.click(newRegistrationButton);

      expect(screen.getByText("Formulaire d'inscription")).toBeInTheDocument();
      const firstNameInputAfter = await screen.findByLabelText('Prénom *');
      const lastNameInputAfter = await screen.findByLabelText('Nom *');
      const emailInputAfter = await screen.findByLabelText('Email *');
      const birthDateInputAfter = await screen.findByLabelText('Date de naissance *');
      const postalCodeInputAfter = await screen.findByLabelText('Code postal *');
      const cityInputAfter = await screen.findByLabelText('Ville *');
      expect(firstNameInputAfter).toHaveValue('');
      expect(lastNameInputAfter).toHaveValue('');
      expect(emailInputAfter).toHaveValue('');
      expect(birthDateInputAfter).toHaveValue('');
      expect(postalCodeInputAfter).toHaveValue('');
      expect(cityInputAfter).toHaveValue('');
    });
  });

  describe('Gestion des erreurs', () => {
    test('devrait empêcher la soumission avec des données invalides', async () => {
      const user = userEvent.setup();
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      const firstNameInput = screen.getByLabelText('Prénom *');
      const lastNameInput = screen.getByLabelText('Nom *');
      const emailInput = screen.getByLabelText('Email *');
      const submitButton = screen.getByRole('button', { name: /s'inscrire/i });

      await user.type(firstNameInput, 'J');
      await user.type(lastNameInput, 'D');
      await user.type(emailInput, 'invalid-email');

      await user.click(submitButton);

      const nameErrors = screen.getAllByText(/ce champ doit contenir uniquement des lettres/i);
      expect(nameErrors.length).toBeGreaterThan(0);
      expect(screen.getByText(/veuillez entrer une adresse email valide/i)).toBeInTheDocument();
      expect(consoleSpy).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });
}); 