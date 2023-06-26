import { BASE_URL } from '../constants/contants';

export const getPaginatedComments = (
  postId: string,
  commentsPerPage: number,
  commentsPageNumber: number
) => {
  return fetch(
    `${BASE_URL}/posts/${postId}/comments?limit=${commentsPerPage}&skip=${
      commentsPageNumber * commentsPerPage
    }`
  ).then((resp) => resp.json());
};
