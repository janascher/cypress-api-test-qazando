/// <reference types="cypress"/>

describe('Buscar Dispositivos', () => {

    it('Buscar um dispositivo específico', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.restful-api.dev/objects/7',
            followRedirect: false, // desativar o seguimento automático de redirecionamentos HTTP
        });
    })
})