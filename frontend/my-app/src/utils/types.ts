export interface User {
    email: string,
    username: string,
    nome: string,
    senha: string,
    telefone: string | null
}

export interface Campus {
    nome: string,
    email: string,
    endereco: string,
    telefone: string | null;
}

export interface Setor {
    id: number,
    nome: string;
    telefone: string | null;
    nomecampus: string;
}

export interface Feedback {
    id: number,
    data: Date | string, 
    texto: string,
    tipo: string,
    idsetor: number,
    emailusuario: string;
}

export interface Avaliacao {
    id: number;
    nota: number;
    texto: string;
    dataavaliacao: Date | string;
    dataconsumo: Date | string;
    emailusuario: string;
    nomeprato: string;
}