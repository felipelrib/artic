/// <reference types="cypress" />

const testUsername = 'rafaelpardini';

describe('User Page', () => {
	beforeEach(() => {
		cy.visit(`/${testUsername}`);
	});

	it('should have current url equal to homepage url', () => {
		cy.url().should('eq', `http://localhost:3000/${testUsername}`);
	});

	it('should have correct page title', () => {
		cy.title().should('eq', `${testUsername} | Álbuns`);
	});

	it('should have basic user info', () => {
		cy.get('#user-name').should('contain.text', 'Rafael');
		cy.get('#user-username').should('contain.text', testUsername);
		cy.get('#user-photo').should('not.be', null);
		cy.get('#user-bio').should('contain.text', 'Estudante');
	});

	it('should have user albums', () => {
		cy.get('.album-card').should('not.be', null);
	});

	it('should show first album artworks', () => {
		cy.get('.album-card').first().click();

		cy.get('#album-listing-title').should('contain.text', 'Artwork in');
		cy.get('.art-card').should('have.length.greaterThan', 0);
	});
});
