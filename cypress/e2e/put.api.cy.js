/// <reference types="cypress"/>

describe('Alterar Dispositivo', () => {
    const payload_cadastrar_dispositivo = require('../fixtures/cadastrar_dispositivo_sucesso.json');

    const payload_atualizar_dispositivo = require('../fixtures/atualizar_dispositivo_sucesso.json');

    it('Alterar um dispositivo', () => {
        const current_date = new Date().toISOString().slice(0, 16);


        cy.cadastrarDispositivo(payload_cadastrar_dispositivo).then((response_post) => {
            // status code
            expect(response_post.status).equal(200);
            // nome
            expect(response_post.body.name).equal(payload_cadastrar_dispositivo.name);
            // dono
            expect(response_post.body.data.owner).equal(payload_cadastrar_dispositivo.data.owner);
            // data do registro
            expect(response_post.body.createdAt.slice(0, 16)).equal(current_date);

            cy.atualizarDispositivo(response_post.body.id, payload_atualizar_dispositivo).then(
                (response_put) => {
                    // status code
                    expect(response_put.status).equal(200);
                    // nome
                    expect(response_put.body.name).equal(payload_atualizar_dispositivo.name);
                    // dono
                    expect(response_put.body.data.owner).equal(
                        payload_atualizar_dispositivo.data.owner
                    );
                    // data do registro
                    expect(response_put.body.updatedAt.slice(0, 16)).equal(current_date);
                }
            );
        });
    });
});
