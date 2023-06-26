import { CommentsApiResponse } from '../models/comment.model';
import { RequestStatus, StateValues } from '../models/context.model';
import { Post, PostDetail, PostsApiResponse } from '../models/post.model';
import { actions, appReducer } from './appReducer';

describe('appReducer', () => {
  const initialState: StateValues = {
    currentCommentsData: {
      currentComments: [],
      commentsPageNumber: 0,
      commentsPerPage: 5,
      totalCommentsNumber: 1,
      error: '',
      isLoading: true
    },
    currentPostData: {
      currentPost: undefined,
      error: '',
      isLoading: true
    },
    postsData: {
      posts: [],
      postsPerPage: 5,
      totalPostNumber: 1,
      pageNumber: 0,
      error: '',
      isLoading: true
    }
  };

  const mockPost: Post = {
    id: 1,
    title: 'My Post',
    body: 'My body, my rules',
    userId: 1,
    tags: ['tag1'],
    reactions: 5
  };

  const mockRequestStatus: RequestStatus = {
    error: '',
    isLoading: false
  };

  it('should update posts data when action type is UPDATE_POSTS and postsApiResponse is defined', () => {
    const mockPostsApiResponse: PostsApiResponse = {
      limit: 5,
      total: 1,
      skip: 5,
      posts: [mockPost]
    };

    const action = {
      type: actions.UPDATE_POSTS,
      payload: {
        requestStatus: mockRequestStatus,
        postsApiResponse: mockPostsApiResponse
      }
    };

    const newState = appReducer(initialState, action);

    expect(newState.postsData.posts).toEqual(mockPostsApiResponse.posts);
    expect(newState.postsData.totalPostNumber).toEqual(mockPostsApiResponse.total);
    expect(newState.postsData.pageNumber).toEqual(
      (mockPostsApiResponse.skip + mockPostsApiResponse.limit) / mockPostsApiResponse.limit
    );
    expect(newState.postsData.postsPerPage).toEqual(mockPostsApiResponse.limit);
    expect(newState.postsData).toMatchObject(mockRequestStatus);
  });

  it('should update current post data when action type is SET_CURRENT_POST', () => {
    const mockPostDetail: PostDetail = {
      ...mockPost,
      user: {
        id: 1,
        firstName: 'João',
        lastName: 'Belchior',
        username: 'JB'
      }
    };

    const action = {
      type: actions.SET_CURRENT_POST,
      payload: {
        requestStatus: mockRequestStatus,
        postDetail: mockPostDetail
      }
    };

    const newState = appReducer(initialState, action);

    expect(newState.currentPostData.currentPost).toEqual(mockPostDetail);
    expect(newState.currentPostData).toMatchObject(mockRequestStatus);
  });

  it('should reset current post data when action type is RESET_CURRENT_POST', () => {
    const action = {
      type: actions.RESET_CURRENT_POST,
      payload: {
        requestStatus: mockRequestStatus
      }
    };

    const newState = appReducer(initialState, action);

    expect(newState.currentPostData.currentPost).toBeUndefined();
  });

  it('should update current comments data when action type is SET_CURRENT_POST_COMMENTS and commentsApiResponse is defined', () => {
    const mockCommentsApiResponse: CommentsApiResponse = {
      comments: [
        {
          id: 1,
          body: 'I am a comment',
          postId: 1,
          user: {
            id: 1,
            username: 'JB'
          }
        }
      ],
      total: 5,
      skip: 5,
      limit: 2
    };

    const action = {
      type: actions.SET_CURRENT_POST_COMMENTS,
      payload: {
        requestStatus: mockRequestStatus,
        commentsApiResponse: mockCommentsApiResponse
      }
    };

    const newState = appReducer(initialState, action);

    expect(newState.currentCommentsData.currentComments).toEqual(mockCommentsApiResponse.comments);
    expect(newState.currentCommentsData.totalCommentsNumber).toEqual(mockCommentsApiResponse.total);
    expect(newState.currentCommentsData.commentsPerPage).toEqual(mockCommentsApiResponse.limit);
    expect(newState.currentCommentsData.commentsPageNumber).toEqual(
      (mockCommentsApiResponse.skip + mockCommentsApiResponse.limit) / mockCommentsApiResponse.limit
    );
    expect(newState.currentCommentsData).toMatchObject(mockRequestStatus);
  });

  it('should return the current state when action type is unknown', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
      payload: {
        requestStatus: {} as RequestStatus
      }
    };

    const newState = appReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
