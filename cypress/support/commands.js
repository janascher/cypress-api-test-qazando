// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('buscarDispositivoEspecífico', (device_id) => {
    cy.request({
        method: 'GET',
        url: `/objects/${device_id}`,
        failOnStatusCode: false, // não falhar automaticamente em status diferentes de 2xx ou 3xx
    }).then((response) => {
        return response;
    });
});

Cypress.Commands.add('cadastrarDispositivo', (payload) => {
    cy.request({
        method: 'POST',
        url: '/objects',
        failOnStatusCode: false, // não falhar automaticamente em status diferentes de 2xx ou 3xx
        body: payload,
    }).then((response) => {
        return response;
    });
});

Cypress.Commands.add('deletarDispositivo', (id) => {
    cy.request({
        method: 'DELETE',
        url: `https://api.restful-api.dev/objects/${id}`,
        failOnStatusCode: false, // não falhar automaticamente em status diferentes de 2xx ou 3xx
    }).then((response) => {
        return response;
    });
});

Cypress.Commands.add('atualizarDispositivo', (id, payload) => {
    cy.request({
        method: 'PUT',
        url: `/objects/${id}`,
        failOnStatusCode: false, // não falhar automaticamente em status diferentes de 2xx ou 3xx
        body: payload,
    }).then((response) => {
        return response;
    });
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
