export interface Feedback {
    id: number,
    data: Date,
    texto: string,
    tipo: 'Elogio' | 'Sugestão' | 'Reclamação',
    idSetor: number,
    emailUsuario: string;
}
