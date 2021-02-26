
//    test description, funcao que contem todos os testes
describe("First", () => {
    /* o teste comeca com a funcao it, cujo primeiro 
    parametro é uma rigorosa descricao do teste, 
    o segundo parametro é uma funcao com a rotina do teste*/
    it("deve ser possivel somar dois numeros", () => {
        expect(2+2).toBe(4);
    })
    it("deve ser possivel somar dois numeros", () => {
        expect(2+2).not.toBe(5);
    })

})