import axios from "axios";
import { User, Campus, Setor, Feedback, Avaliacao, Prato, Comentario, infoPrato, AuthResponse } from "@/types";

//URL base da API
export const api = axios.create({
    baseURL: "http://localhost:3000",
});

// Interceptor para adicionar automaticamente o token de autenticação
api.interceptors.request.use((request) => {
    const token = localStorage.getItem("access_token");

    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
});

//Funções para chamadas aos endpoints de Usuário
export const getUserById = async (id: number): Promise<User> => {
    const response = await api.get<User>(`/user/${id}`);
    return response.data;
}

export const getUserProfile = async (): Promise<User> => {
    const response = await api.get<User>('/user/perfil');
    return response.data;
}

export const getAllUsers = async (): Promise<User[]> => {
    const response = await api.get<User[]>('/user');
    return response.data;
}

export const createUser = async (user: Partial<User>): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/user', user);
    return response.data;
}

export const updateUser = async (id: number, user: Partial<User>) => {
    const response = await api.patch<void>(`/user/${id}`, user);
    return response.data;
}

export const deleteUser = async (id: number) => {
    const response = await api.delete<void>(`/user/${id}`);
    return response.data;
}

//Funções para chamadas aos endpoints de Campus
export const getAllCampuses = async (): Promise<Campus[]> => {
    const response = await api.get<Campus[]>('/campus');
    return response.data;
}

export const getCampusById = async (idCampus: number): Promise<Campus> => {
    const response = await api.get<Campus>(`/campus/${idCampus}`);
    return response.data;
}

//Funções para chamadas aos endpoints de Setor
export const getSetorById = async (idSetor: number): Promise<Setor> => {
    const response = await api.get<Setor>(`/setor/${idSetor}`);
    return response.data;
}

export const getAllSetores = async (): Promise<Setor[]> => {
    const response = await api.get<Setor[]>('/setor');
    return response.data;
}

export const getSetorByCampus = async (idCampus: number): Promise<Setor[]> => {
    const response = await api.get<Setor[]>(`/setor/campus/${idCampus}`);
    return response.data;
}

//Funções para chamadas aos endpoints de Feedback

export const getFeedbackById = async (idFeedback: number): Promise<Feedback> => {
    const response = await api.get<Feedback>(`/feedback/${idFeedback}`);
    return response.data;
}

export const getFeedbacksByUser = async (idUsuario: number): Promise<Feedback[]> => {
    const response = await api.get<Feedback[]>(`/feedback/user/${idUsuario}`);
    return response.data;
}

export const getAllFeedbacks = async (): Promise<Feedback[]> => {
    const response = await api.get<Feedback[]>('/feedback');
    return response.data;
}


export const createFeedback = async (feedback: Partial<Feedback>) => {
    const response = await api.post<void>('/feedback', feedback);
    return response.data;
}

export const updateFeedback = async (idFeedback: number, feedback: Partial<Feedback>) => {
    const response = await api.patch<void>(`/feedback/${idFeedback}`, feedback);
    return response.data;
}

export const deleteFeedback = async (idFeedback: number) => {
    const response = await api.delete<void>(`/feedback/${idFeedback}`);
    return response.data;
}

//Funções para chamadas aos endpoints de Avaliação
export const getAvaliacaoById = async (idAvaliacao: number): Promise<Avaliacao> => {
    const response = await api.get<Avaliacao>(`/avaliacao/${idAvaliacao}`);
    return response.data;
}

export const getAvaliacoesByUser = async (idUsuario:number) : Promise <Avaliacao[]> => {
    const response = await api.get<Avaliacao[]>(`/avaliacao/user/${idUsuario}`);
    return response.data;
}
export const getAvaliacoesByPrato = async (idPrato: number): Promise<Avaliacao[]> => {
    const response = await api.get<Avaliacao[]>(`/avaliacao/prato/${idPrato}`);
    return response.data;
}

export const getAllAvaliacoes = async (): Promise<Avaliacao[]> => {
    const response = await api.get<Avaliacao[]>('/avaliacao');
    return response.data;
}

export const createAvaliacao = async (avaliacao: Partial<Avaliacao>) => {
    const response = await api.post<void>('/avaliacao', avaliacao);
    return response.data;
}

export const updateAvaliacao = async (idAvaliacao: number, avaliacao: Partial<Avaliacao>) => {
    const response = await api.patch<void>(`/avaliacao/${idAvaliacao}`, avaliacao);
    return response.data;
}

export const deleteAvaliacao = async (idAvaliacao: number) => {
    const response = await api.delete<void>(`/avaliacao/${idAvaliacao}`);
    return response.data;
}

//Funções para chamadas aos endpoints de Prato
export const getPratoById = async (idPrato: number): Promise<Prato> => {
    const response = await api.get<Prato>(`/prato/${idPrato}`);
    return response.data;
}
export const getInfoPratoById = async (idPrato: number): Promise<infoPrato> => {
    const response = await api.get<infoPrato>(`/prato/info/${idPrato}`);
    return response.data;
}
export const getAllPratos = async (): Promise<Prato[]> => {
    const response = await api.get<Prato[]>('/prato');
    return response.data;
}
export const getAllInfoPratos = async (): Promise<infoPrato[]> => {
    const response = await api.get<infoPrato[]>('/prato/info');
    return response.data;
}

//Funções para chamadas aos endpoints de Comentário
export const getComentarioById = async (idComentario: number): Promise<Comentario> => {
    const response = await api.get<Comentario>(`/comentario/${idComentario}`);
    return response.data;
}

export const getComentariosByAvaliacao = async (idAvaliacao: number): Promise<Comentario[]> => {
    const response = await api.get<Comentario[]>(`/comentario/avaliacao/${idAvaliacao}`);
    return response.data;
}

export const getAllComentarios = async (): Promise<Comentario[]> => {
    const response = await api.get<Comentario[]>('/comentario');
    return response.data;
}

export const createComentario = async (comentario: Partial<Comentario>) => {
    const response = await api.post<void>('/comentario', comentario);
    return response.data;
}

export const updateComentario = async (idComentario: number, comentario: Partial<Comentario>) => {
    const response = await api.patch<void>(`/comentario/${idComentario}`, comentario);
    return response.data;
}

export const deleteComentario = async (idComentario: number) => {
    const response = await api.delete<void>(`/comentario/${idComentario}`);
    return response.data;
}

//Funções para autenticação
export const login = async (email: string, senha: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', { email, senha });
    return response.data;
}
export const logout = () => {
    localStorage.removeItem("acess_token");
}


