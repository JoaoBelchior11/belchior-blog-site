import { CommentsState } from './comment.model';
import { CurrentPostState, PostsState } from './post.model';

export interface RequestStatus {
  error: string;
  isLoading: boolean;
}

export interface StateValues {
  postsData: PostsState;
  currentPostData: CurrentPostState;
  currentCommentsData: CommentsState;
}
export interface AppContextValues extends StateValues {
  fetchPosts: (pageNumber: number) => void;
  fetchPostById: (postId: string) => void;
  fetchCommentsByPostId: (postId: string, pageNumber: number) => void;
  resetCurrentPost: () => void;
}
