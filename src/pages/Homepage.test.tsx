import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Comment } from '../models/comment.model';
import { AppContextValues } from '../models/context.model';
import { Post } from '../models/post.model';
import { Homepage } from './Homepage';

describe('Homepage', () => {
  const mockPosts: Post[] = [
    {
      id: 1,
      title: 'A Post',
      body: 'Body of Post!',
      tags: ['tag1'],
      userId: 1,
      reactions: 5
    }
  ];
  const mockPostsPerPage = 5;
  const mockTotalPostNumber = 10;
  const mockError = 'An error occurred';
  const mockIsLoading = false;
  const mockPageNumber = 2;

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
      isLoading: true,
      totalCommentsNumber: 10,
      commentsPageNumber: 5,
      commentsPerPage: 2,
      error: ''
    },
    currentPostData: {
      currentPost: undefined,
      error: '',
      isLoading: true
    },
    postsData: {
      posts: mockPosts,
      postsPerPage: mockPostsPerPage,
      totalPostNumber: mockTotalPostNumber,
      error: mockError,
      isLoading: mockIsLoading,
      pageNumber: mockPageNumber
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
            postsData: { ...mockAppContextValue.postsData, isLoading: true }
          }}>
          <Homepage />
        </AppContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render error message when error is not null', () => {
    render(
      <MemoryRouter>
        <AppContext.Provider
          value={{
            ...mockAppContextValue,
            postsData: { ...mockAppContextValue.postsData, error: mockError }
          }}>
          <Homepage />
        </AppContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(mockError)).toBeInTheDocument();
  });

  it('should render posts and pagination when isLoading is false and error is null', () => {
    render(
      <MemoryRouter>
        <AppContext.Provider value={mockAppContextValue}>
          <Homepage />
        </AppContext.Provider>
      </MemoryRouter>
    );

    const postCards = screen.getAllByTestId('post-card');
    expect(postCards.length).toBe(mockPosts.length);
  });
});
