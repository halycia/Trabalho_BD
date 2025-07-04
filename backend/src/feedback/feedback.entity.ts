export interface Feedback {
    id: number,
    data: Date | string,
    texto: string,
    tipo: string,
    id_setor: number,
    id_usuario: number;
}
