import { BASE_URL } from '../constants/contants';
import { Post, PostsApiResponse } from '../models/post.model';

export const getPaginatedPosts = (
  pageNumber: number,
  postsPerPage: number
): Promise<PostsApiResponse> => {
  return fetch(`${BASE_URL}/posts?limit=${postsPerPage}&skip=${pageNumber * postsPerPage}`).then(
    (resp) => resp.json()
  );
};

export const getDetailedPostById = (postId: string): Promise<Post> => {
  return fetch(`${BASE_URL}/posts/${postId}`).then((resp) => resp.json());
};
