export interface Avaliacao {
    id: number;
    nota: number;
    texto: string;
    data_avaliacao: Date | string;
    data_consumo: Date | string;
    id_usuario: number;
    id_prato: number;
    refeicao: string;
}