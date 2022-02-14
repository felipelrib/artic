/// <reference types="cypress" />

const testUsername = 'rafaelpardini';

describe('User Page', () => {
	beforeEach(() => {
		cy.fixture('user/user.json').then((user) => {
			cy.intercept('GET', `/artic-users?Username=*`, user).as('getUser');
			cy.visit(`/${testUsername}`);
		});
	});

	it('should have current url equal to homepage url', () => {
		cy.url().should('eq', `http://localhost:3000/${testUsername}`);
	});

	it('should have correct page title', () => {
		cy.title().should('eq', `${testUsername} | Álbuns`);
	});

	it('should have basic user info', () => {
		cy.wait('@getUser').then((user) => {
			expect(user.Username).to.not.be.null.and.to.eq(testUsername);
		});
	});
});
