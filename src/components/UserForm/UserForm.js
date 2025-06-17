import React, { useState } from 'react';
import { getFieldError } from '../../utils/validation';
import './UserForm.css';

const UserForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    postalCode: '',
    city: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    const error = getFieldError(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      const error = getFieldError(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true);
      console.log('Formulaire soumis:', formData);
    } else {
      setErrors(newErrors);
    }
  };

  const isFormValid = () => {
    const hasErrors = Object.values(errors).some(error => error !== '');
    const allFieldsFilled = Object.values(formData).every(value => value.trim() !== '');
    return !hasErrors && allFieldsFilled;
  };

  if (isSubmitted) {
    return (
      <div className="success-message">
        <h2>Inscription réussie !</h2>
        <p>Merci pour votre inscription, {formData.firstName} !</p>
        <button onClick={() => {
          setIsSubmitted(false);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            birthDate: '',
            postalCode: '',
            city: ''
          });
        }}>
          Nouvelle inscription
        </button>
      </div>
    );
  }

  return (
    <div className="user-form-container">
      <h1>Formulaire d'inscription</h1>
      <form onSubmit={handleSubmit} className="user-form" data-testid="user-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">Prénom *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={errors.firstName ? 'error' : ''}
              placeholder="Votre prénom"
              data-testid="firstName"
              required
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Nom *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={errors.lastName ? 'error' : ''}
              placeholder="Votre nom"
              data-testid="lastName"
              required
            />
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? 'error' : ''}
            placeholder="votre.email@exemple.com"
            data-testid="email"
            required
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="birthDate">Date de naissance *</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
            className={errors.birthDate ? 'error' : ''}
            data-testid="birthDate"
            required
          />
          {errors.birthDate && <span className="error-message">{errors.birthDate}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="postalCode">Code postal *</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              className={errors.postalCode ? 'error' : ''}
              placeholder="75001"
              maxLength="5"
              data-testid="postalCode"
              required
            />
            {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="city">Ville *</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className={errors.city ? 'error' : ''}
              placeholder="Votre ville"
              data-testid="city"
              required
            />
            {errors.city && <span className="error-message">{errors.city}</span>}
          </div>
        </div>

        <button 
          type="submit" 
          className="submit-button"
          data-testid="submit-button"
          disabled={!isFormValid()}
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default UserForm; 