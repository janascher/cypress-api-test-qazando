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
            followRedirect: false, // desativar o seguimento automático de redirecionamentos HTTP
            body: body,
        }).as('postDeviceResult');

        cy.get('@postDeviceResult').then((response_post) => {
            expect(response_post.status).equal(200);

            // pega o resultado do cadastro para pegar o id
            cy.request({
                method: 'DELETE',
                url: `https://api.restful-api.dev/objects/${response_post.body.id}`,
                followRedirect: false, // desativar o seguimento automático de redirecionamentos HTTP
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
});
