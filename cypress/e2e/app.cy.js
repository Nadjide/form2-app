describe('Form2 App E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the app title', () => {
    cy.contains('Form2 App')
    cy.get('[data-testid="app-title"]').should('be.visible')
  })

  it('should render the user form', () => {
    cy.get('[data-testid="user-form"]').should('exist')
  })

  it('should submit form with valid data', () => {
    cy.get('[data-testid="firstName"]').type('Jean')
    cy.get('[data-testid="lastName"]').type('Dupont')
    cy.get('[data-testid="email"]').type('jean.dupont@example.com')
    cy.get('[data-testid="birthDate"]').type('1990-01-01')
    cy.get('[data-testid="postalCode"]').type('75001')
    cy.get('[data-testid="city"]').type('Paris')
    
    cy.get('[data-testid="submit-button"]').click()
    
    cy.contains('Inscription réussie !')
    cy.contains('Merci pour votre inscription, Jean !')
  })

  it('should show validation errors for invalid data', () => {
    cy.get('[data-testid="submit-button"]').should('be.disabled')
  })

  it('should validate email format', () => {
    cy.get('[data-testid="firstName"]').type('Jean')
    cy.get('[data-testid="lastName"]').type('Dupont')
    cy.get('[data-testid="email"]').type('invalid-email')
    cy.get('[data-testid="birthDate"]').type('1990-01-01')
    cy.get('[data-testid="postalCode"]').type('75001')
    cy.get('[data-testid="city"]').type('Paris')
    
    // Le bouton doit rester désactivé avec un email invalide
    cy.get('[data-testid="submit-button"]').should('be.disabled')
    
    // Correction de l'email
    cy.get('[data-testid="email"]').clear().type('jean.dupont@example.com')
    cy.get('[data-testid="submit-button"]').should('not.be.disabled')
  })

  it('should test API integration', () => {
    // Test que l'API est accessible
    cy.request('GET', 'http://localhost:8000/').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.eq('Hello world')
    })

    // Test de l'endpoint users
    cy.request('GET', 'http://localhost:8000/users').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('utilisateurs')
      expect(response.body.utilisateurs).to.be.an('array')
    })
  })
}) 