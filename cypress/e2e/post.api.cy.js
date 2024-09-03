/// <reference types="cypress"/>

describe('Cadastrar Dispositivo', () => {
    it('Cadastrar um dispositivo', () => {
        const current_date = new Date().toISOString().slice(0, 16);

        const body = {
            name: 'Apple MacBook Pro 16',
            data: {
                year: 2020,
                price: 1650.8,
                'CPU model': 'Intel Core i9',
                'Hard disk size': '2 TB',
            },
        };

        cy.cadastrarDispositivo(body).then((response) => {
            // status code
            expect(response.status).equal(200);

            // id
            expect(response.body.id).not.empty;

            // nome
            expect(response.body.name).equal('Apple MacBook Pro 16');
            expect(response.body.name).not.empty;

            // data do registro
            expect(response.body.createdAt).not.empty;
            expect(response.body.createdAt.slice(0, 16)).equal(current_date);

            // corpo
            expect(response.body).not.empty;

            // ano
            expect(response.body.data.year).equal(2020);
            expect(response.body.data.year).not.string;

            // preço
            expect(response.body.data.price).equal(1650.8);
            expect(response.body.data.price).not.string;

            // modelo da cpu
            expect(response.body.data['CPU model']).equal('Intel Core i9');
            expect(response.body.data['CPU model']).not.empty;

            // tamanho do disco
            expect(response.body.data['Hard disk size']).equal('2 TB');
            expect(response.body.data['Hard disk size']).not.empty;
        });
    });

    it('Cadastrar um dispositivo sem mandar dados', () => {
        cy.cadastrarDispositivo('').then((response) => {
            // status code
            expect(response.status).equal(400);

            // mensagem de erro
            expect(response.body.error).equal(
                '400 Bad Request. If you are trying to create or update the data, potential issue is that you are sending incorrect body json or it is missing at all.'
            );
        });
    });
});
