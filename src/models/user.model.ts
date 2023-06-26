export interface User extends UserSimplified {
  firstName: string;
  lastName: string;
}

export interface UserSimplified {
  id: number;
  username: string;
}
