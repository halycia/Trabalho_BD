export interface Comentario {
    id: number;
    texto: string;
    data: Date | string;
    id_avaliacao: number;
    id_usuario: number;
}
