import {
  validateName,
  validateEmail,
  validateBirthDate,
  validatePostalCode,
  getFieldError
} from '../validation';

describe('Validation Functions', () => {
  describe('validateName', () => {
    test('devrait accepter un nom valide avec lettres simples', () => {
      expect(validateName('Jean')).toBe(true);
      expect(validateName('Dupont')).toBe(true);
    });

    test('devrait accepter un nom avec accents', () => {
      expect(validateName('François')).toBe(true);
      expect(validateName('Müller')).toBe(true);
      expect(validateName('José')).toBe(true);
    });

    test('devrait accepter un nom avec tiret', () => {
      expect(validateName('Jean-Pierre')).toBe(true);
      expect(validateName('Marie-Claire')).toBe(true);
    });

    test('devrait accepter un nom avec apostrophe', () => {
      expect(validateName("D'Artagnan")).toBe(true);
      expect(validateName("L'Évêque")).toBe(true);
    });

    test('devrait accepter un nom avec espaces', () => {
      expect(validateName('Jean Pierre')).toBe(true);
      expect(validateName('Van der Berg')).toBe(true);
    });

    test('devrait rejeter un nom trop court', () => {
      expect(validateName('A')).toBe(false);
      expect(validateName('')).toBe(false);
    });

    test('devrait rejeter un nom avec des chiffres', () => {
      expect(validateName('Jean123')).toBe(false);
      expect(validateName('123Jean')).toBe(false);
    });

    test('devrait rejeter un nom avec des caractères spéciaux', () => {
      expect(validateName('Jean@')).toBe(false);
      expect(validateName('Jean#')).toBe(false);
      expect(validateName('Jean$')).toBe(false);
    });
  });

  describe('validateEmail', () => {
    test('devrait accepter un email valide', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
      expect(validateEmail('user+tag@example.org')).toBe(true);
    });

    test('devrait rejeter un email sans @', () => {
      expect(validateEmail('testexample.com')).toBe(false);
    });

    test('devrait rejeter un email sans domaine', () => {
      expect(validateEmail('test@')).toBe(false);
    });

    test('devrait rejeter un email sans partie locale', () => {
      expect(validateEmail('@example.com')).toBe(false);
    });

    test('devrait rejeter un email vide', () => {
      expect(validateEmail('')).toBe(false);
    });

    test('devrait rejeter un email avec espaces', () => {
      expect(validateEmail('test @example.com')).toBe(false);
      expect(validateEmail('test@ example.com')).toBe(false);
    });
  });

  describe('validateBirthDate', () => {
    test('devrait accepter une date de naissance pour un adulte de 18 ans', () => {
      const eighteenYearsAgo = new Date();
      eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
      const dateString = eighteenYearsAgo.toISOString().split('T')[0];
      expect(validateBirthDate(dateString)).toBe(true);
    });

    test('devrait accepter une date de naissance pour un adulte de plus de 18 ans', () => {
      const twentyYearsAgo = new Date();
      twentyYearsAgo.setFullYear(twentyYearsAgo.getFullYear() - 20);
      const dateString = twentyYearsAgo.toISOString().split('T')[0];
      expect(validateBirthDate(dateString)).toBe(true);
    });

    test('devrait rejeter une date de naissance pour un mineur', () => {
      const sixteenYearsAgo = new Date();
      sixteenYearsAgo.setFullYear(sixteenYearsAgo.getFullYear() - 16);
      const dateString = sixteenYearsAgo.toISOString().split('T')[0];
      expect(validateBirthDate(dateString)).toBe(false);
    });

    test('devrait rejeter une date de naissance vide', () => {
      expect(validateBirthDate('')).toBe(false);
      expect(validateBirthDate(null)).toBe(false);
      expect(validateBirthDate(undefined)).toBe(false);
    });

    test('devrait rejeter une date future', () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      const dateString = futureDate.toISOString().split('T')[0];
      expect(validateBirthDate(dateString)).toBe(false);
    });
  });

  describe('validatePostalCode', () => {
    test('devrait accepter un code postal français valide', () => {
      expect(validatePostalCode('75001')).toBe(true);
      expect(validatePostalCode('13001')).toBe(true);
      expect(validatePostalCode('69000')).toBe(true);
    });

    test('devrait rejeter un code postal avec moins de 5 chiffres', () => {
      expect(validatePostalCode('7501')).toBe(false);
      expect(validatePostalCode('750')).toBe(false);
      expect(validatePostalCode('75')).toBe(false);
      expect(validatePostalCode('7')).toBe(false);
    });

    test('devrait rejeter un code postal avec plus de 5 chiffres', () => {
      expect(validatePostalCode('750001')).toBe(false);
      expect(validatePostalCode('7500001')).toBe(false);
    });

    test('devrait rejeter un code postal avec des lettres', () => {
      expect(validatePostalCode('7500A')).toBe(false);
      expect(validatePostalCode('A7500')).toBe(false);
      expect(validatePostalCode('750AB')).toBe(false);
    });

    test('devrait rejeter un code postal vide', () => {
      expect(validatePostalCode('')).toBe(false);
    });

    test('devrait rejeter un code postal avec des espaces', () => {
      expect(validatePostalCode('750 01')).toBe(false);
      expect(validatePostalCode(' 75001')).toBe(false);
      expect(validatePostalCode('75001 ')).toBe(false);
    });
  });

  describe('getFieldError', () => {
    test('devrait retourner une erreur pour un prénom invalide', () => {
      expect(getFieldError('firstName', 'J')).toBe('Ce champ doit contenir uniquement des lettres, espaces, tirets et apostrophes (minimum 2 caractères)');
      expect(getFieldError('firstName', 'Jean123')).toBe('Ce champ doit contenir uniquement des lettres, espaces, tirets et apostrophes (minimum 2 caractères)');
    });

    test('devrait retourner une chaîne vide pour un prénom valide', () => {
      expect(getFieldError('firstName', 'Jean')).toBe('');
      expect(getFieldError('firstName', 'François')).toBe('');
    });

    test('devrait retourner une erreur pour un email invalide', () => {
      expect(getFieldError('email', 'invalid-email')).toBe('Veuillez entrer une adresse email valide');
      expect(getFieldError('email', 'test@')).toBe('Veuillez entrer une adresse email valide');
    });

    test('devrait retourner une chaîne vide pour un email valide', () => {
      expect(getFieldError('email', 'test@example.com')).toBe('');
    });

    test('devrait retourner une erreur pour une date de naissance invalide', () => {
      const sixteenYearsAgo = new Date();
      sixteenYearsAgo.setFullYear(sixteenYearsAgo.getFullYear() - 16);
      const dateString = sixteenYearsAgo.toISOString().split('T')[0];
      expect(getFieldError('birthDate', dateString)).toBe('Vous devez avoir au moins 18 ans');
    });

    test('devrait retourner une chaîne vide pour une date de naissance valide', () => {
      const twentyYearsAgo = new Date();
      twentyYearsAgo.setFullYear(twentyYearsAgo.getFullYear() - 20);
      const dateString = twentyYearsAgo.toISOString().split('T')[0];
      expect(getFieldError('birthDate', dateString)).toBe('');
    });

    test('devrait retourner une erreur pour un code postal invalide', () => {
      expect(getFieldError('postalCode', '7501')).toBe('Le code postal doit contenir exactement 5 chiffres');
      expect(getFieldError('postalCode', '7500A')).toBe('Le code postal doit contenir exactement 5 chiffres');
    });

    test('devrait retourner une chaîne vide pour un code postal valide', () => {
      expect(getFieldError('postalCode', '75001')).toBe('');
    });

    test('devrait retourner une chaîne vide pour un champ inconnu', () => {
      expect(getFieldError('unknownField', 'value')).toBe('');
    });
  });
}); 