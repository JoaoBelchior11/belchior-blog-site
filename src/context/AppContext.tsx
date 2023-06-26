import { FC, createContext, useCallback, useMemo, useReducer } from 'react';
import { getPaginatedComments } from '../api/comment.service';
import { getDetailedPostById, getPaginatedPosts } from '../api/post.service';
import { getUserById } from '../api/user.service';
import { CommentsApiResponse } from '../models/comment.model';
import { AppContextValues, StateValues } from '../models/context.model';
import { Post, PostsApiResponse } from '../models/post.model';
import { User } from '../models/user.model';
import { actions, appReducer } from '../reducers/appReducer';

export const initialState: StateValues = {
  postsData: {
    posts: [],
    isLoading: true,
    error: '',
    pageNumber: 0,
    postsPerPage: 10,
    totalPostNumber: 0
  },
  currentPostData: {
    currentPost: undefined,
    isLoading: true,
    error: ''
  },
  currentCommentsData: {
    currentComments: [],
    isLoading: true,
    error: '',
    commentsPageNumber: 0,
    commentsPerPage: 2,
    totalCommentsNumber: 0
  }
};

const contextDefaultValues: AppContextValues = {
  ...initialState,
  fetchPosts: () => {
    // Do nothing
  },
  fetchPostById: () => {
    // Do nothing
  },
  fetchCommentsByPostId: () => {
    // Do nothing
  },
  resetCurrentPost: () => {
    // Do nothing
  }
};

export const AppContext = createContext<AppContextValues>(contextDefaultValues);

interface AppProviderProps {
  children: JSX.Element;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const getPosts = useCallback(
    (pageNumber: number) => {
      getPaginatedPosts(pageNumber, state.postsData.postsPerPage)
        .then((data: PostsApiResponse) => {
          dispatch({
            type: actions.UPDATE_POSTS,
            payload: { postsApiResponse: data, requestStatus: { isLoading: false, error: '' } }
          });
        })
        .catch((error) => {
          console.error(error);
          dispatch({
            type: actions.UPDATE_POSTS,
            payload: {
              requestStatus: { isLoading: false, error: 'There was an error fetching the posts' }
            }
          });
        });
    },
    [state.postsData.pageNumber]
  );

  const getPostById = useCallback((postId: string) => {
    getDetailedPostById(postId)
      .then((resp: Post) => {
        getUserById(resp.userId)
          .then((userData: User) => {
            dispatch({
              type: actions.SET_CURRENT_POST,
              payload: {
                postDetail: { ...resp, user: userData },
                requestStatus: { isLoading: false, error: '' }
              }
            });
          })
          .catch((err) => {
            console.error(err);
            dispatch({
              type: actions.SET_CURRENT_POST,
              payload: {
                postDetail: undefined,
                requestStatus: { isLoading: false, error: 'There was an error fetching the post' }
              }
            });
          });
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: actions.SET_CURRENT_POST,
          payload: {
            postDetail: undefined,
            requestStatus: { isLoading: false, error: 'There was an error fetching the post' }
          }
        });
      });
  }, []);

  const getCommentsByPostId = useCallback(
    (postId: string, commentPageNumber: number) => {
      getPaginatedComments(postId, state.currentCommentsData.commentsPerPage, commentPageNumber)
        .then((data: CommentsApiResponse) => {
          dispatch({
            type: actions.SET_CURRENT_POST_COMMENTS,
            payload: { commentsApiResponse: data, requestStatus: { error: '', isLoading: false } }
          });
        })
        .catch((error) => {
          console.error(error);
          dispatch({
            type: actions.SET_CURRENT_POST_COMMENTS,
            payload: {
              requestStatus: { isLoading: false, error: 'There was an error fetching the comments' }
            }
          });
        });
    },
    [state.currentCommentsData.commentsPageNumber]
  );

  const resetCurrentPost = () => {
    dispatch({
      type: actions.RESET_CURRENT_POST,
      payload: { requestStatus: { error: '', isLoading: true } }
    });
  };
  const value = useMemo(() => {
    return {
      ...state,
      fetchPosts: getPosts,
      fetchPostById: getPostById,
      fetchCommentsByPostId: getCommentsByPostId,
      resetCurrentPost
    };
  }, [state, getPosts, getPostById, getCommentsByPostId]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
