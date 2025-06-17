"use strict";

var _validation = require("../validation");
describe('Validation Functions', () => {
  describe('validateName', () => {
    test('devrait accepter un nom valide avec lettres simples', () => {
      expect((0, _validation.validateName)('Jean')).toBe(true);
      expect((0, _validation.validateName)('Dupont')).toBe(true);
    });
    test('devrait accepter un nom avec accents', () => {
      expect((0, _validation.validateName)('François')).toBe(true);
      expect((0, _validation.validateName)('Müller')).toBe(true);
      expect((0, _validation.validateName)('José')).toBe(true);
    });
    test('devrait accepter un nom avec tiret', () => {
      expect((0, _validation.validateName)('Jean-Pierre')).toBe(true);
      expect((0, _validation.validateName)('Marie-Claire')).toBe(true);
    });
    test('devrait accepter un nom avec apostrophe', () => {
      expect((0, _validation.validateName)("D'Artagnan")).toBe(true);
      expect((0, _validation.validateName)("L'Évêque")).toBe(true);
    });
    test('devrait accepter un nom avec espaces', () => {
      expect((0, _validation.validateName)('Jean Pierre')).toBe(true);
      expect((0, _validation.validateName)('Van der Berg')).toBe(true);
    });
    test('devrait rejeter un nom trop court', () => {
      expect((0, _validation.validateName)('A')).toBe(false);
      expect((0, _validation.validateName)('')).toBe(false);
    });
    test('devrait rejeter un nom avec des chiffres', () => {
      expect((0, _validation.validateName)('Jean123')).toBe(false);
      expect((0, _validation.validateName)('123Jean')).toBe(false);
    });
    test('devrait rejeter un nom avec des caractères spéciaux', () => {
      expect((0, _validation.validateName)('Jean@')).toBe(false);
      expect((0, _validation.validateName)('Jean#')).toBe(false);
      expect((0, _validation.validateName)('Jean$')).toBe(false);
    });
  });
  describe('validateEmail', () => {
    test('devrait accepter un email valide', () => {
      expect((0, _validation.validateEmail)('test@example.com')).toBe(true);
      expect((0, _validation.validateEmail)('user.name@domain.co.uk')).toBe(true);
      expect((0, _validation.validateEmail)('user+tag@example.org')).toBe(true);
    });
    test('devrait rejeter un email sans @', () => {
      expect((0, _validation.validateEmail)('testexample.com')).toBe(false);
    });
    test('devrait rejeter un email sans domaine', () => {
      expect((0, _validation.validateEmail)('test@')).toBe(false);
    });
    test('devrait rejeter un email sans partie locale', () => {
      expect((0, _validation.validateEmail)('@example.com')).toBe(false);
    });
    test('devrait rejeter un email vide', () => {
      expect((0, _validation.validateEmail)('')).toBe(false);
    });
    test('devrait rejeter un email avec espaces', () => {
      expect((0, _validation.validateEmail)('test @example.com')).toBe(false);
      expect((0, _validation.validateEmail)('test@ example.com')).toBe(false);
    });
  });
  describe('validateBirthDate', () => {
    test('devrait accepter une date de naissance pour un adulte de 18 ans', () => {
      const eighteenYearsAgo = new Date();
      eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
      const dateString = eighteenYearsAgo.toISOString().split('T')[0];
      expect((0, _validation.validateBirthDate)(dateString)).toBe(true);
    });
    test('devrait accepter une date de naissance pour un adulte de plus de 18 ans', () => {
      const twentyYearsAgo = new Date();
      twentyYearsAgo.setFullYear(twentyYearsAgo.getFullYear() - 20);
      const dateString = twentyYearsAgo.toISOString().split('T')[0];
      expect((0, _validation.validateBirthDate)(dateString)).toBe(true);
    });
    test('devrait rejeter une date de naissance pour un mineur', () => {
      const sixteenYearsAgo = new Date();
      sixteenYearsAgo.setFullYear(sixteenYearsAgo.getFullYear() - 16);
      const dateString = sixteenYearsAgo.toISOString().split('T')[0];
      expect((0, _validation.validateBirthDate)(dateString)).toBe(false);
    });
    test('devrait rejeter une date de naissance vide', () => {
      expect((0, _validation.validateBirthDate)('')).toBe(false);
      expect((0, _validation.validateBirthDate)(null)).toBe(false);
      expect((0, _validation.validateBirthDate)(undefined)).toBe(false);
    });
    test('devrait rejeter une date future', () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      const dateString = futureDate.toISOString().split('T')[0];
      expect((0, _validation.validateBirthDate)(dateString)).toBe(false);
    });
  });
  describe('validatePostalCode', () => {
    test('devrait accepter un code postal français valide', () => {
      expect((0, _validation.validatePostalCode)('75001')).toBe(true);
      expect((0, _validation.validatePostalCode)('13001')).toBe(true);
      expect((0, _validation.validatePostalCode)('69000')).toBe(true);
    });
    test('devrait rejeter un code postal avec moins de 5 chiffres', () => {
      expect((0, _validation.validatePostalCode)('7501')).toBe(false);
      expect((0, _validation.validatePostalCode)('750')).toBe(false);
      expect((0, _validation.validatePostalCode)('75')).toBe(false);
      expect((0, _validation.validatePostalCode)('7')).toBe(false);
    });
    test('devrait rejeter un code postal avec plus de 5 chiffres', () => {
      expect((0, _validation.validatePostalCode)('750001')).toBe(false);
      expect((0, _validation.validatePostalCode)('7500001')).toBe(false);
    });
    test('devrait rejeter un code postal avec des lettres', () => {
      expect((0, _validation.validatePostalCode)('7500A')).toBe(false);
      expect((0, _validation.validatePostalCode)('A7500')).toBe(false);
      expect((0, _validation.validatePostalCode)('750AB')).toBe(false);
    });
    test('devrait rejeter un code postal vide', () => {
      expect((0, _validation.validatePostalCode)('')).toBe(false);
    });
    test('devrait rejeter un code postal avec des espaces', () => {
      expect((0, _validation.validatePostalCode)('750 01')).toBe(false);
      expect((0, _validation.validatePostalCode)(' 75001')).toBe(false);
      expect((0, _validation.validatePostalCode)('75001 ')).toBe(false);
    });
  });
  describe('getFieldError', () => {
    test('devrait retourner une erreur pour un prénom invalide', () => {
      expect((0, _validation.getFieldError)('firstName', 'J')).toBe('Ce champ doit contenir uniquement des lettres, espaces, tirets et apostrophes (minimum 2 caractères)');
      expect((0, _validation.getFieldError)('firstName', 'Jean123')).toBe('Ce champ doit contenir uniquement des lettres, espaces, tirets et apostrophes (minimum 2 caractères)');
    });
    test('devrait retourner une chaîne vide pour un prénom valide', () => {
      expect((0, _validation.getFieldError)('firstName', 'Jean')).toBe('');
      expect((0, _validation.getFieldError)('firstName', 'François')).toBe('');
    });
    test('devrait retourner une erreur pour un email invalide', () => {
      expect((0, _validation.getFieldError)('email', 'invalid-email')).toBe('Veuillez entrer une adresse email valide');
      expect((0, _validation.getFieldError)('email', 'test@')).toBe('Veuillez entrer une adresse email valide');
    });
    test('devrait retourner une chaîne vide pour un email valide', () => {
      expect((0, _validation.getFieldError)('email', 'test@example.com')).toBe('');
    });
    test('devrait retourner une erreur pour une date de naissance invalide', () => {
      const sixteenYearsAgo = new Date();
      sixteenYearsAgo.setFullYear(sixteenYearsAgo.getFullYear() - 16);
      const dateString = sixteenYearsAgo.toISOString().split('T')[0];
      expect((0, _validation.getFieldError)('birthDate', dateString)).toBe('Vous devez avoir au moins 18 ans');
    });
    test('devrait retourner une chaîne vide pour une date de naissance valide', () => {
      const twentyYearsAgo = new Date();
      twentyYearsAgo.setFullYear(twentyYearsAgo.getFullYear() - 20);
      const dateString = twentyYearsAgo.toISOString().split('T')[0];
      expect((0, _validation.getFieldError)('birthDate', dateString)).toBe('');
    });
    test('devrait retourner une erreur pour un code postal invalide', () => {
      expect((0, _validation.getFieldError)('postalCode', '7501')).toBe('Le code postal doit contenir exactement 5 chiffres');
      expect((0, _validation.getFieldError)('postalCode', '7500A')).toBe('Le code postal doit contenir exactement 5 chiffres');
    });
    test('devrait retourner une chaîne vide pour un code postal valide', () => {
      expect((0, _validation.getFieldError)('postalCode', '75001')).toBe('');
    });
    test('devrait retourner une chaîne vide pour un champ inconnu', () => {
      expect((0, _validation.getFieldError)('unknownField', 'value')).toBe('');
    });
  });
});