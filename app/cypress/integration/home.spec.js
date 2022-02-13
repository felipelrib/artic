/// <reference types="cypress" />

describe('Home Page', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('should have current url equal to homepage url', () => {
		cy.url().should('eq', 'http://localhost:3000/');
	});

	it('should have correct page title', () => {
		cy.title().should('eq', 'Artic');
	});

	it('should have content and description', () => {
		cy.get('.home-name').should('contain.text', 'Artic');
		cy.get('.home-description').should('contain.text', 'art');
	});

	// Maybe add something a bit more sofisticated to this
	it('should have two buttons that lead to search and publish own', () => {
		cy.get('.home-actions').children().should('have.length', 2);

		cy.get('.home-actions').children().first().should('have.text', 'Search for art');
		cy.get('.home-actions').children().last().should('have.text', 'Publish yours');
	});
});
