/// <reference types="cypress"/>

describe('Buscar Dispositivos', () => {
    it('Buscar um dispositivo específico', () => {
        const device_id = '7';

        cy.request({
            method: 'GET',
            url: `https://api.restful-api.dev/objects/${device_id}`,
            failOnStatusCode: false, // não falhar automaticamente em status diferentes de 2xx ou 3xx
        }).as('getDeviceResult');

        // validações
        cy.get('@getDeviceResult').then((response) => {
            // status code
            expect(response.status).equal(200);

            // corpo
            expect(response.body).not.empty;

            // id
            expect(response.body.id).equal(device_id);
            expect(response.body.id).not.empty;

            // nome
            expect(response.body.name).equal('Apple MacBook Pro 16');
            expect(response.body.name).not.empty;

            // ano
            expect(response.body.data.year).equal(2019);
            expect(response.body.data.year).not.string;

            // preço
            expect(response.body.data.price).equal(1849.99);
            expect(response.body.data.price).not.string;

            // modelo da cpu
            expect(response.body.data['CPU model']).equal('Intel Core i9');
            expect(response.body.data['CPU model']).not.empty;

            // tamanho do disco
            expect(response.body.data['Hard disk size']).equal('1 TB');
            expect(response.body.data['Hard disk size']).not.empty;
        });
    });
});
