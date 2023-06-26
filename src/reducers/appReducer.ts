import { initialState } from '../context/AppContext';
import { CommentsApiResponse } from '../models/comment.model';
import { RequestStatus, StateValues } from '../models/context.model';
import { PostDetail, PostsApiResponse } from '../models/post.model';

export const actions = {
  UPDATE_POSTS: 'UPDATE_POSTS',
  SET_CURRENT_POST: 'SET_CURRENT_POST',
  SET_CURRENT_POST_COMMENTS: 'SET_CURRENT_POST_COMMENTS',
  RESET_CURRENT_POST: 'RESET_CURRENT_POST'
};

export const appReducer = (
  state: StateValues,
  action: {
    type: string;
    payload: {
      requestStatus: RequestStatus;
      postsApiResponse?: PostsApiResponse;
      postDetail?: PostDetail;
      commentsApiResponse?: CommentsApiResponse;
    };
  }
): StateValues => {
  const { postsApiResponse, requestStatus, postDetail, commentsApiResponse } = action.payload;
  switch (action.type) {
    case actions.UPDATE_POSTS:
      if (!postsApiResponse) {
        return {
          ...state,
          postsData: {
            ...state.postsData,
            ...requestStatus
          }
        };
      }
      return {
        ...state,
        postsData: {
          posts: postsApiResponse.posts,
          totalPostNumber: postsApiResponse.total,
          pageNumber: (postsApiResponse.skip + postsApiResponse.limit) / postsApiResponse.limit,
          postsPerPage: postsApiResponse.limit,
          ...requestStatus
        }
      };
    case actions.SET_CURRENT_POST:
      return {
        ...state,
        currentPostData: {
          ...state.currentPostData,
          currentPost: postDetail,
          ...requestStatus
        }
      };
    case actions.RESET_CURRENT_POST:
      return {
        ...state,
        currentPostData: {
          ...initialState.currentPostData,
          ...requestStatus
        }
      };
    case actions.SET_CURRENT_POST_COMMENTS:
      if (!commentsApiResponse) {
        return {
          ...state,
          currentCommentsData: {
            ...state.currentCommentsData,
            ...requestStatus
          }
        };
      }
      return {
        ...state,
        currentCommentsData: {
          currentComments: commentsApiResponse.comments,
          totalCommentsNumber: commentsApiResponse.total,
          commentsPerPage: commentsApiResponse.limit,
          commentsPageNumber:
            (commentsApiResponse.skip + commentsApiResponse.limit) / commentsApiResponse.limit,
          ...requestStatus
        }
      };
    default:
      return state;
  }
};
