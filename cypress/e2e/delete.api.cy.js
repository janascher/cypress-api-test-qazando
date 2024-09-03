/// <reference types="cypress"/>

describe('Deletar Dispositivo', () => {
    it('Deletar um dispositivo', () => {
        const body = {
            name: 'Apple MacBook Pro 16',
            data: {
                year: 2020,
                price: 1650.8,
                'CPU model': 'Intel Core i9',
                'Hard disk size': '2 TB',
            },
        };

        cy.request({
            method: 'POST',
            url: 'https://api.restful-api.dev/objects',
            failOnStatusCode: false, // não falhar automaticamente em status diferentes de 2xx ou 3xx
            body: body,
        }).as('postDeviceResult');

        cy.get('@postDeviceResult').then((response_post) => {
            expect(response_post.status).equal(200);

            // pega o resultado do cadastro para pegar o id
            cy.request({
                method: 'DELETE',
                url: `https://api.restful-api.dev/objects/${response_post.body.id}`,
                failOnStatusCode: false, // não falhar automaticamente em status diferentes de 2xx ou 3xx
            }).as('deleteDeviceResult');

            // validações
            cy.get('@deleteDeviceResult').then((response_delete) => {
                // status code
                expect(response_delete.status).equal(200);
                // mensagem
                expect(response_delete.body.message).equal(
                    `Object with id = ${response_post.body.id} has been deleted.`
                );
            });
        });
    });

    it('Deletar um dispositivo não existente', () => {
        const id_not_exist = 'testando';

        cy.request({
            method: 'DELETE',
            url: `/objects/${id_not_exist}`,
            failOnStatusCode: false, // não falhar automaticamente em status diferentes de 2xx ou 3xx
        }).as('deleteDeviceResult');

        // validações
        cy.get('@deleteDeviceResult').then((response_delete) => {
            // status code
            expect(response_delete.status).equal(404);
            // mensagem de erro
            expect(response_delete.body.error).equal(
                `Object with id = ${id_not_exist} doesn't exist.`
            );
        });
    });

    it('Deletar um dispositivo de ID reservado', () => {
        const reserved_id = 7;

        cy.request({
            method: 'DELETE',
            url: `/objects/${reserved_id}`,
            failOnStatusCode: false, // não falhar automaticamente em status diferentes de 2xx ou 3xx
        }).as('deleteDeviceResult');

        // validações
        cy.get('@deleteDeviceResult').then((response_delete) => {
            // status code
            expect(response_delete.status).equal(405);
            // mensagem de erro
            expect(response_delete.body.error).equal(
                `${reserved_id} is a reserved id and the data object of it cannot be deleted. You can create your own new object via POST request and try to send a DELETE request with new generated object id.`
            );
        });
    });
});
