import { RequestStatus } from './context.model';
import { User } from './user.model';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

export interface PostDetail extends Post {
  user: User;
}

export type PostsApiResponse = {
  limit: number;
  posts: Post[];
  skip: number;
  total: number;
};

export interface PostsState extends RequestStatus {
  posts: Post[];
  pageNumber: number;
  postsPerPage: number;
  totalPostNumber: number;
}

export interface CurrentPostState extends RequestStatus {
  currentPost?: PostDetail;
}
