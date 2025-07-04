export interface Avaliacao {
    id: number;
    nota: number;
    texto: string;
    dataavaliacao: Date | string;
    dataconsumo: Date | string;
    idusuario: number;
    idprato: number;
    refeicao: string;
}