"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));
var _UserForm = _interopRequireDefault(require("../UserForm"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
describe('UserForm Component', () => {
  beforeEach(() => {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_UserForm.default, {}));
  });
  describe('Rendu initial', () => {
    test('devrait afficher le titre du formulaire', () => {
      expect(_react2.screen.getByText("Formulaire d'inscription")).toBeInTheDocument();
    });
    test('devrait afficher tous les champs requis', () => {
      expect(_react2.screen.getByLabelText('Prénom *')).toBeInTheDocument();
      expect(_react2.screen.getByLabelText('Nom *')).toBeInTheDocument();
      expect(_react2.screen.getByLabelText('Email *')).toBeInTheDocument();
      expect(_react2.screen.getByLabelText('Date de naissance *')).toBeInTheDocument();
      expect(_react2.screen.getByLabelText('Code postal *')).toBeInTheDocument();
      expect(_react2.screen.getByLabelText('Ville *')).toBeInTheDocument();
    });
    test('devrait afficher le bouton de soumission désactivé', () => {
      const submitButton = _react2.screen.getByRole('button', {
        name: /s'inscrire/i
      });
      expect(submitButton).toBeDisabled();
    });
  });
  describe('Validation des champs', () => {
    test('devrait valider un prénom valide', async () => {
      const firstNameInput = _react2.screen.getByLabelText('Prénom *');
      await _userEvent.default.type(firstNameInput, 'Jean');
      expect(firstNameInput).toHaveValue('Jean');
      expect(_react2.screen.queryByText(/ce champ doit contenir uniquement des lettres/i)).not.toBeInTheDocument();
    });
    test('devrait afficher une erreur pour un prénom invalide', async () => {
      const firstNameInput = _react2.screen.getByLabelText('Prénom *');
      await _userEvent.default.type(firstNameInput, 'J');
      expect(_react2.screen.getByText(/ce champ doit contenir uniquement des lettres/i)).toBeInTheDocument();
    });
    test('devrait valider un nom avec accents', async () => {
      const lastNameInput = _react2.screen.getByLabelText('Nom *');
      await _userEvent.default.type(lastNameInput, 'François');
      expect(lastNameInput).toHaveValue('François');
      expect(_react2.screen.queryByText(/ce champ doit contenir uniquement des lettres/i)).not.toBeInTheDocument();
    });
    test('devrait valider un email valide', async () => {
      const emailInput = _react2.screen.getByLabelText('Email *');
      await _userEvent.default.type(emailInput, 'test@example.com');
      expect(emailInput).toHaveValue('test@example.com');
      expect(_react2.screen.queryByText(/veuillez entrer une adresse email valide/i)).not.toBeInTheDocument();
    });
    test('devrait afficher une erreur pour un email invalide', async () => {
      const emailInput = _react2.screen.getByLabelText('Email *');
      await _userEvent.default.type(emailInput, 'invalid-email');
      expect(_react2.screen.getByText(/veuillez entrer une adresse email valide/i)).toBeInTheDocument();
    });
    test('devrait valider un code postal français', async () => {
      const postalCodeInput = _react2.screen.getByLabelText('Code postal *');
      await _userEvent.default.type(postalCodeInput, '75001');
      expect(postalCodeInput).toHaveValue('75001');
      expect(_react2.screen.queryByText(/le code postal doit contenir exactement 5 chiffres/i)).not.toBeInTheDocument();
    });
    test('devrait afficher une erreur pour un code postal invalide', async () => {
      const postalCodeInput = _react2.screen.getByLabelText('Code postal *');
      await _userEvent.default.type(postalCodeInput, '7501');
      expect(_react2.screen.getByText(/le code postal doit contenir exactement 5 chiffres/i)).toBeInTheDocument();
    });
    test('devrait valider une ville avec tiret', async () => {
      const cityInput = _react2.screen.getByLabelText('Ville *');
      await _userEvent.default.type(cityInput, 'Saint-Étienne');
      expect(cityInput).toHaveValue('Saint-Étienne');
      expect(_react2.screen.queryByText(/ce champ doit contenir uniquement des lettres/i)).not.toBeInTheDocument();
    });
  });
  describe('Validation de la date de naissance', () => {
    test('devrait accepter une date de naissance pour un adulte', async () => {
      const birthDateInput = _react2.screen.getByLabelText('Date de naissance *');
      const today = new Date();
      today.setFullYear(today.getFullYear() - 20);
      const dateString = today.toISOString().split('T')[0];
      _react2.fireEvent.change(birthDateInput, {
        target: {
          value: dateString
        }
      });
      expect(birthDateInput).toHaveValue(dateString);
      expect(_react2.screen.queryByText(/vous devez avoir au moins 18 ans/i)).not.toBeInTheDocument();
    });
    test('devrait afficher une erreur pour un mineur', async () => {
      const birthDateInput = _react2.screen.getByLabelText('Date de naissance *');
      const today = new Date();
      today.setFullYear(today.getFullYear() - 16);
      const dateString = today.toISOString().split('T')[0];
      _react2.fireEvent.change(birthDateInput, {
        target: {
          value: dateString
        }
      });
      expect(_react2.screen.getByText(/vous devez avoir au moins 18 ans/i)).toBeInTheDocument();
    });
  });
  describe('Soumission du formulaire', () => {
    test('devrait activer le bouton quand tous les champs sont valides', async () => {
      const user = _userEvent.default.setup();
      const firstNameInput = _react2.screen.getByLabelText('Prénom *');
      const lastNameInput = _react2.screen.getByLabelText('Nom *');
      const emailInput = _react2.screen.getByLabelText('Email *');
      const birthDateInput = _react2.screen.getByLabelText('Date de naissance *');
      const postalCodeInput = _react2.screen.getByLabelText('Code postal *');
      const cityInput = _react2.screen.getByLabelText('Ville *');
      const submitButton = _react2.screen.getByRole('button', {
        name: /s'inscrire/i
      });
      await user.type(firstNameInput, 'Jean');
      await user.type(lastNameInput, 'Dupont');
      await user.type(emailInput, 'jean.dupont@example.com');
      const today = new Date();
      today.setFullYear(today.getFullYear() - 20);
      const dateString = today.toISOString().split('T')[0];
      _react2.fireEvent.change(birthDateInput, {
        target: {
          value: dateString
        }
      });
      await user.type(postalCodeInput, '75001');
      await user.type(cityInput, 'Paris');
      await (0, _react2.waitFor)(() => {
        expect(submitButton).not.toBeDisabled();
      });
    });
    test('devrait soumettre le formulaire avec des données valides', async () => {
      const user = _userEvent.default.setup();
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const firstNameInput = _react2.screen.getByLabelText('Prénom *');
      const lastNameInput = _react2.screen.getByLabelText('Nom *');
      const emailInput = _react2.screen.getByLabelText('Email *');
      const birthDateInput = _react2.screen.getByLabelText('Date de naissance *');
      const postalCodeInput = _react2.screen.getByLabelText('Code postal *');
      const cityInput = _react2.screen.getByLabelText('Ville *');
      const submitButton = _react2.screen.getByRole('button', {
        name: /s'inscrire/i
      });
      await user.type(firstNameInput, 'Jean');
      await user.type(lastNameInput, 'Dupont');
      await user.type(emailInput, 'jean.dupont@example.com');
      const today = new Date();
      today.setFullYear(today.getFullYear() - 20);
      const dateString = today.toISOString().split('T')[0];
      _react2.fireEvent.change(birthDateInput, {
        target: {
          value: dateString
        }
      });
      await user.type(postalCodeInput, '75001');
      await user.type(cityInput, 'Paris');
      await user.click(submitButton);
      await (0, _react2.waitFor)(() => {
        expect(_react2.screen.getByText('Inscription réussie !')).toBeInTheDocument();
        expect(_react2.screen.getByText(/merci pour votre inscription, jean !/i)).toBeInTheDocument();
        expect(consoleSpy).toHaveBeenCalledWith('Formulaire soumis:', {
          firstName: 'Jean',
          lastName: 'Dupont',
          email: 'jean.dupont@example.com',
          birthDate: dateString,
          postalCode: '75001',
          city: 'Paris'
        });
      });
      consoleSpy.mockRestore();
    });
    test('devrait afficher le message de succès et permettre une nouvelle inscription', async () => {
      const user = _userEvent.default.setup();
      const firstNameInput = _react2.screen.getByLabelText('Prénom *');
      const lastNameInput = _react2.screen.getByLabelText('Nom *');
      const emailInput = _react2.screen.getByLabelText('Email *');
      const birthDateInput = _react2.screen.getByLabelText('Date de naissance *');
      const postalCodeInput = _react2.screen.getByLabelText('Code postal *');
      const cityInput = _react2.screen.getByLabelText('Ville *');
      const submitButton = _react2.screen.getByRole('button', {
        name: /s'inscrire/i
      });
      await user.type(firstNameInput, 'Jean');
      await user.type(lastNameInput, 'Dupont');
      await user.type(emailInput, 'jean.dupont@example.com');
      const today = new Date();
      today.setFullYear(today.getFullYear() - 20);
      const dateString = today.toISOString().split('T')[0];
      _react2.fireEvent.change(birthDateInput, {
        target: {
          value: dateString
        }
      });
      await user.type(postalCodeInput, '75001');
      await user.type(cityInput, 'Paris');
      await user.click(submitButton);
      await (0, _react2.waitFor)(() => {
        expect(_react2.screen.getByText('Inscription réussie !')).toBeInTheDocument();
      });
      const newRegistrationButton = _react2.screen.getByRole('button', {
        name: /nouvelle inscription/i
      });
      await user.click(newRegistrationButton);
      expect(_react2.screen.getByText("Formulaire d'inscription")).toBeInTheDocument();
      const firstNameInputAfter = await _react2.screen.findByLabelText('Prénom *');
      const lastNameInputAfter = await _react2.screen.findByLabelText('Nom *');
      const emailInputAfter = await _react2.screen.findByLabelText('Email *');
      const birthDateInputAfter = await _react2.screen.findByLabelText('Date de naissance *');
      const postalCodeInputAfter = await _react2.screen.findByLabelText('Code postal *');
      const cityInputAfter = await _react2.screen.findByLabelText('Ville *');
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
      const user = _userEvent.default.setup();
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const firstNameInput = _react2.screen.getByLabelText('Prénom *');
      const lastNameInput = _react2.screen.getByLabelText('Nom *');
      const emailInput = _react2.screen.getByLabelText('Email *');
      const submitButton = _react2.screen.getByRole('button', {
        name: /s'inscrire/i
      });
      await user.type(firstNameInput, 'J');
      await user.type(lastNameInput, 'D');
      await user.type(emailInput, 'invalid-email');
      await user.click(submitButton);
      const nameErrors = _react2.screen.getAllByText(/ce champ doit contenir uniquement des lettres/i);
      expect(nameErrors.length).toBeGreaterThan(0);
      expect(_react2.screen.getByText(/veuillez entrer une adresse email valide/i)).toBeInTheDocument();
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});