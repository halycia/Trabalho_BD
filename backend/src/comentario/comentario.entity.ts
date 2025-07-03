export interface Comentario {
    id: number;
    texto: string;
    data: Date | string;
    idAvaliacao: number;
    idUsuario: number;
}
