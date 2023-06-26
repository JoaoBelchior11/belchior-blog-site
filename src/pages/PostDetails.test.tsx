import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Comment } from '../models/comment.model';
import { AppContextValues } from '../models/context.model';
import { PostDetail } from '../models/post.model';
import { PostDetails } from './PostDetails';

describe('PostDetails', () => {
  const mockPost: PostDetail = {
    id: 1,
    title: 'I am a Post...man!',
    body: 'What a body....much post',
    userId: 1,
    reactions: 5,
    tags: ['tag1'],
    user: {
      id: 1,
      firstName: 'Me',
      lastName: 'Me',
      username: 'MeMe'
    }
  };
  const mockPostError = 'An error occurred while fetching the post';
  const mockCommentsError = 'An error occurred while fetching the comments';
  const mockIsLoading = false;

  const mockComments: Comment[] = [
    {
      id: 1,
      body: 'I am a comment',
      postId: 1,
      user: {
        id: 1,
        username: 'JB'
      }
    }
  ];

  const mockAppContextValue: AppContextValues = {
    currentCommentsData: {
      currentComments: mockComments,
      isLoading: false,
      totalCommentsNumber: 10,
      commentsPageNumber: 5,
      commentsPerPage: 2,
      error: ''
    },
    currentPostData: {
      currentPost: mockPost,
      error: '',
      isLoading: false
    },
    postsData: {
      posts: [],
      postsPerPage: 2,
      totalPostNumber: 2,
      error: '',
      isLoading: mockIsLoading,
      pageNumber: 0
    },
    fetchCommentsByPostId: jest.fn(),
    fetchPostById: jest.fn(),
    fetchPosts: jest.fn(),
    resetCurrentPost: jest.fn()
  };

  it('should render loading state when isLoading is true', () => {
    render(
      <MemoryRouter>
        <AppContext.Provider
          value={{
            ...mockAppContextValue,
            currentPostData: { ...mockAppContextValue.currentPostData, isLoading: true }
          }}>
          <PostDetails />
        </AppContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render error message when postError is not an empty string', () => {
    render(
      <MemoryRouter>
        <AppContext.Provider
          value={{
            ...mockAppContextValue,
            currentPostData: { ...mockAppContextValue.currentPostData, error: mockPostError }
          }}>
          <PostDetails />
        </AppContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(mockPostError)).toBeInTheDocument();
  });

  it('should render error message when commentsError is not an empty string', () => {
    render(
      <MemoryRouter>
        <AppContext.Provider
          value={{
            ...mockAppContextValue,
            currentCommentsData: {
              ...mockAppContextValue.currentCommentsData,
              error: mockCommentsError,
              isLoading: false
            }
          }}>
          <PostDetails />
        </AppContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(mockCommentsError)).toBeInTheDocument();
  });

  it('should render post details when currentPost is defined', () => {
    render(
      <MemoryRouter>
        <AppContext.Provider value={mockAppContextValue}>
          <PostDetails />
        </AppContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(
      screen.getByText(`Author: ${mockPost.user.firstName} ${mockPost.user.lastName}`)
    ).toBeInTheDocument();
    expect(screen.getByText(mockPost.body)).toBeInTheDocument();
  });
});
