export interface AuthState {
  token: string | null;
  role: string | null;
  username?: string | null;
}
