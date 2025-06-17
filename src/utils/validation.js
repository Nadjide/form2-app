export const validateName = (value) => {
  const nameRegex = /^[a-zA-ZÀ-ÿ\s\-']+$/;
  return nameRegex.test(value) && value.trim().length >= 2;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateBirthDate = (birthDate) => {
  if (!birthDate) return false;
  
  const today = new Date();
  const birth = new Date(birthDate);
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    return age - 1 >= 18;
  }
  return age >= 18;
};

export const validatePostalCode = (postalCode) => {
  const postalRegex = /^\d{5}$/;
  return postalRegex.test(postalCode);
};

export const getFieldError = (name, value) => {
  switch (name) {
    case 'firstName':
    case 'lastName':
    case 'city':
      return validateName(value) ? '' : 'Ce champ doit contenir uniquement des lettres, espaces, tirets et apostrophes (minimum 2 caractères)';
    
    case 'email':
      return validateEmail(value) ? '' : 'Veuillez entrer une adresse email valide';
    
    case 'birthDate':
      return validateBirthDate(value) ? '' : 'Vous devez avoir au moins 18 ans';
    
    case 'postalCode':
      return validatePostalCode(value) ? '' : 'Le code postal doit contenir exactement 5 chiffres';
    
    default:
      return '';
  }
}; 