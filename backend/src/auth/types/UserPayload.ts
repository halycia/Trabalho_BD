export interface UserPayload {
  sub: string;
  username: string;
  email?: string;
  iat?: number;
  exp?: number;
}