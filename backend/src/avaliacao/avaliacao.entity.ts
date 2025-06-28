export interface Avaliacao{
    id: number;
    nota: number;
    texto: string;
    dataavaliacao: Date | string;
    dataconsumo: Date | string;
    emailusuario: string;
    nomeprato: string;
}