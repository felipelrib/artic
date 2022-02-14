/// <reference types="cypress" />

const randomSearchTerm = 'sdjhfgasdlfk';

describe('Search Page', () => {
	beforeEach(() => {
		cy.visit('/search');
		cy.get('#search-bar').should('be.visible').clear();
	});

	it('should have current url equal to homepage url', () => {
		cy.url().should('eq', 'http://localhost:3000/search');
	});

	it('should have correct page title', () => {
		cy.title().should('eq', 'Pesquisa por obras');
	});

	context('default static content', () => {
		it('should have search bar with placeholder', () => {
			cy.get('#search-bar')
				.invoke('attr', 'placeholder')
				.should('eq', 'Pesquise por um termo ou username');
		});

		it('should have results title', () => {
			cy.get('#search-page-content-title').contains('Resultados');
		});
	});

	context('filled search field', () => {
		it('should perform search with no results', () => {
			cy.get('#search-bar').type(`${randomSearchTerm}{enter}`);

			cy.get('#search-results')
				.children()
				.should('have.length', 1)
				.first()
				.contains('Não há resultados para o termo pesquisado.');
		});

		it('should perform search with some results', () => {
			cy.fixture('search/search-results.json').then((data) => {
				cy.intercept('GET', '/arts*', data).as('getSearchResults');

				cy.get('#search-bar').type('No{enter}');

				cy.wait('@getSearchResults').then((interceptData) => {
					const [firstResult, secondResult] = interceptData.response.body;

					expect(firstResult.name).to.eq('Noite Estrelada');
					expect(firstResult.description).to.contain('Van Gogh');
					expect(firstResult.artic_user.Name).to.eq('Rafael');

					expect(secondResult.name).to.eq('Mona Lisa');
					expect(secondResult.description).to.contain('sfumato');
					expect(secondResult.artic_user.Name).to.eq('Rafael');
				});
			});
		});
	});
});
