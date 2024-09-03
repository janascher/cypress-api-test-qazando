/// <reference types="cypress"/>

describe('Alterar Dispositivo', () => {
    it('Alterar um dispositivo', () => {
        const current_date = new Date().toISOString().slice(0, 16);

        const body_post = {
            name: 'Apple MacBook Pro 16',
            data: {
                year: 2020,
                price: 1650.8,
                'CPU model': 'Intel Core i9',
                'Hard disk size': '2 TB',
                owner: 'Empresa',
            },
        };

        const body_put = {
            name: 'Apple MacBook Pro 16 - Testando',
            data: {
                year: 2020,
                price: 1650.8,
                'CPU model': 'Intel Core i9',
                'Hard disk size': '2 TB',
                owner: 'Empresa Teste',
            },
        };

        cy.cadastrarDispositivo(body_post).then((response_post) => {
            // status code
            expect(response_post.status).equal(200);
            // nome
            expect(response_post.body.name).equal(body_post.name);
            // dono
            expect(response_post.body.data.owner).equal(body_post.data.owner);
            // data do registro
            expect(response_post.body.createdAt.slice(0, 16)).equal(current_date);

            cy.atualizarDispositivo(response_post.body.id, body_put).then((response_put) => {
                // status code
                expect(response_put.status).equal(200);
                // nome
                expect(response_put.body.name).equal(body_put.name);
                // dono
                expect(response_put.body.data.owner).equal(body_put.data.owner);
                // data do registro
                expect(response_put.body.updatedAt.slice(0, 16)).equal(current_date);
            });
        });
    });
});
