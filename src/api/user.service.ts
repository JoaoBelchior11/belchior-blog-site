import { BASE_URL } from '../constants/contants';
import { User } from '../models/user.model';

export const getUserById = (userId: number): Promise<User> => {
  return fetch(`${BASE_URL}/users/${userId}`).then((userResp) => userResp.json());
};
