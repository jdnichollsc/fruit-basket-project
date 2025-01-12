/// <reference types="cypress" />

describe('HomePage', () => {
  beforeEach(() => {
    cy.visit('/');
    // Wait for initial loading to complete
    cy.get('[data-testid="loading-title"]').should('exist');
    cy.get('[data-testid="loading-title"]').should('not.exist', { timeout: 10000 });
  });

  it('should display loading state initially', () => {
    cy.visit('/'); // Visit again to see loading state
    cy.get('[data-testid="loading-title"]').should('exist');
    cy.get('[data-testid="loading-form"]').should('exist');
    cy.get('[data-testid="loading-list"]').should('exist');
    cy.contains('Loading Fruit Basket...').should('exist');
  });

  it('should display fruits after loading', () => {
    // Check form exists
    cy.get('[data-testid="add-fruit-input"]').should('exist');
    cy.get('button').contains('Add').should('exist');

    // Check initial fruits
    cy.get('[data-testid="fruit-list"]').within(() => {
      cy.contains('Apple').should('exist');
      cy.contains('Banana').should('exist');
    });
  });

  it('should add a new fruit', () => {
    const newFruit = 'Cherry';
    cy.get('[data-testid="add-fruit-input"]').type(newFruit);
    cy.get('button').contains('Add').click();

    // Check loading state
    cy.contains('Adding...').should('exist');
    cy.get('.loading-spinner').should('exist');

    // Check new fruit appears
    cy.get('[data-testid="fruit-list"]').within(() => {
      cy.contains(newFruit, { timeout: 5000 }).should('exist');
    });
  });

  it('should show error when adding duplicate fruit', () => {
    cy.get('[data-testid="add-fruit-input"]').type('Apple');
    cy.get('button').contains('Add').click();

    // Check error message
    cy.contains('Apple already exists', { timeout: 5000 }).should('exist');
  });

  it('should edit a fruit', () => {
    const oldName = 'Apple';
    const newName = 'Dragon Fruit';

    // Wait for initial list to load
    cy.get('[data-testid="fruit-list"]').should('exist');
    cy.contains('li', oldName, { timeout: 10000 }).should('exist');
    
    // Click edit button
    cy.get(`[data-testid="edit-fruit-button-${oldName}"]`).click();

    // Wait for input to be visible and verify value
    cy.get(`[data-testid="edit-fruit-input-${oldName}"]`).should('be.visible');
    cy.get(`[data-testid="edit-fruit-input-${oldName}"]`).should('have.value', oldName);
    
    // Edit the fruit name
    cy.get(`[data-testid="edit-fruit-input-${oldName}"]`).clear();
    cy.get(`[data-testid="edit-fruit-input-${oldName}"]`).type(newName);

    // Save changes
    cy.get(`[data-testid="save-fruit-button-${oldName}"]`).click();

    // Wait for loading state to complete
    cy.get('.loading-spinner').should('exist');
    cy.get('.loading-spinner').should('not.exist', { timeout: 10000 });
    
    // Verify the change
    cy.get('[data-testid="fruit-list"]').within(() => {
      cy.contains(newName).should('exist');
      cy.contains(oldName).should('not.exist');
    });
  });

  it('should cancel fruit editing', () => {
    const oldName = 'Apple';
    const newName = 'Dragon Fruit';

    // Wait for the list to be ready
    cy.get('[data-testid="fruit-list"]').within(() => {
      cy.contains(oldName).should('exist');
    });

    // Start edit mode
    cy.get(`[data-testid="edit-fruit-button-${oldName}"]`).click();
    
    // Wait for input and edit
    cy.get(`[data-testid="edit-fruit-input-${oldName}"]`).should('have.value', oldName);
    cy.get(`[data-testid="edit-fruit-input-${oldName}"]`).clear();
    cy.get(`[data-testid="edit-fruit-input-${oldName}"]`).type(newName);
    
    // Cancel edit
    cy.get(`[data-testid="cancel-edit-button-${oldName}"]`).click();

    // Verify no changes
    cy.get('[data-testid="fruit-list"]').within(() => {
      cy.contains(oldName).should('exist');
      cy.contains(newName).should('not.exist');
    });
  });

  it('should delete a fruit', () => {
    const fruitName = 'Apple';
    
    // Wait for the list to be ready
    cy.get('[data-testid="fruit-list"]').within(() => {
      cy.contains(fruitName).should('exist');
    });

    // Delete fruit
    cy.get(`[data-testid="delete-fruit-button-${fruitName}"]`).click();

    // Check loading state
    cy.contains('Deleting...').should('exist');
    cy.get('.loading-spinner').should('exist');

    // Verify deletion
    cy.get('[data-testid="fruit-list"]').within(() => {
      cy.contains(fruitName, { timeout: 5000 }).should('not.exist');
    });
  });
});
