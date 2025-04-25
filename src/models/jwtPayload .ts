export interface JwtPayload {
  sub: string; // username
  exp: number; // expiration
  iat: number; // issued at
  authorities: string[]; // array of roles
}
