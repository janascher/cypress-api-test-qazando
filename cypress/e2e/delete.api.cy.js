/// <reference types="cypress"/>

describe('Deletar Dispositivo', () => {
    const payload_cadastro_dispositivo = require('../fixtures/cadastrar_dispositivo_sucesso.json');
    it('Deletar um dispositivo', () => {
        cy.cadastrarDispositivo(payload_cadastro_dispositivo).then((response_post) => {
            expect(response_post.status).equal(200);

            // pega o resultado do cadastro para pegar o id
            cy.deletarDispositivo(response_post.body.id).then((response_delete) => {
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

        cy.deletarDispositivo(id_not_exist).then((response_delete) => {
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

        cy.deletarDispositivo(reserved_id).then((response_delete) => {
            // status code
            expect(response_delete.status).equal(405);
            // mensagem de erro
            expect(response_delete.body.error).equal(
                `${reserved_id} is a reserved id and the data object of it cannot be deleted. You can create your own new object via POST request and try to send a DELETE request with new generated object id.`
            );
        });
    });
});
