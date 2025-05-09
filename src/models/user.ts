export interface User {
  userId?: number;
  username: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  newPassword: string;
  oldPassword: string;
  roles?: { roleName: string }[]; // USER/ADMIN
}
