export interface JwtPayload {
  sub: string; // username
  exp: number; // expiration time (UNIX timestamp)
  iat: number; // issued at (UNIX timestamp)
  authorities: string[]; // example: ['ROLE_USER', 'ROLE_ADMIN']
}
