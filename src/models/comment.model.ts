import { RequestStatus } from './context.model';
import { UserSimplified } from './user.model';

export interface CommentsApiResponse {
  comments: Comment[];
  total: number;
  skip: number;
  limit: number;
}

export interface Comment {
  id: number;
  body: string;
  postId: number;
  user: UserSimplified;
}

export interface CommentsState extends RequestStatus {
  currentComments?: Comment[];
  commentsPageNumber: number;
  commentsPerPage: number;
  totalCommentsNumber: number;
}
