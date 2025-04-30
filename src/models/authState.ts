export interface AuthState {
  token: string | null; // Access token from backend
  role: "admin" | "user" | "root" | null; // Simplified role for UI
  username: string | null; // From JWT 'sub'
}
