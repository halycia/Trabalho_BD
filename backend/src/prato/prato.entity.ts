export interface Prato {
    id: number,
    nome: string,
    categoria?: string | null,
    icone?: Buffer | null;
}
