import { fireEvent, render, screen } from '@testing-library/react';
import { AppContext } from '../../context/AppContext';
import { Comment } from '../../models/comment.model';
import { AppContextValues } from '../../models/context.model';
import { PostCommentsWrapper } from './PostCommentsWrapper';

describe('PostCommentsWrapper', () => {
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
      currentPost: undefined,
      error: '',
      isLoading: true
    },
    postsData: {
      posts: [],
      totalPostNumber: 0,
      pageNumber: 0,
      postsPerPage: 5,
      error: '',
      isLoading: true
    },
    fetchCommentsByPostId: jest.fn(),
    fetchPostById: jest.fn(),
    fetchPosts: jest.fn(),
    resetCurrentPost: jest.fn()
  };

  const MockChildComponent = (
    comments: Comment[],
    totalCommentsNumber: number,
    commentsPerPage: number,
    commentsPageNumber: number,
    handleCommentPageClick: (pageNumber: number) => void
  ) => (
    <div>
      <div data-testid="total-comments">{totalCommentsNumber}</div>
      <div data-testid="comments-per-page">{commentsPerPage}</div>
      <div data-testid="comments-page-number">{commentsPageNumber}</div>
      <button onClick={() => handleCommentPageClick(3)}>Next Page</button>
    </div>
  );

  it('should render loading state when isLoading is true', () => {
    render(
      <AppContext.Provider
        value={{
          ...mockAppContextValue,
          currentCommentsData: {
            ...mockAppContextValue.currentCommentsData,
            isLoading: true,
            error: ''
          }
        }}>
        <PostCommentsWrapper postId="123">{MockChildComponent}</PostCommentsWrapper>
      </AppContext.Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render child component with correct props when isLoading is false and currentComments is not null', () => {
    render(
      <AppContext.Provider
        value={{
          ...mockAppContextValue,
          currentCommentsData: { ...mockAppContextValue.currentCommentsData, isLoading: false }
        }}>
        <PostCommentsWrapper postId="123">{MockChildComponent}</PostCommentsWrapper>
      </AppContext.Provider>
    );

    expect(screen.getByTestId('total-comments')).toHaveTextContent('10');
    expect(screen.getByTestId('comments-per-page')).toHaveTextContent('2');
    expect(screen.getByTestId('comments-page-number')).toHaveTextContent('5');
  });

  it('should call fetchCommentsByPostId with the correct arguments when handleCommentPageClick is called', () => {
    render(
      <AppContext.Provider value={mockAppContextValue}>
        <PostCommentsWrapper postId="123">{MockChildComponent}</PostCommentsWrapper>
      </AppContext.Provider>
    );

    fireEvent.click(screen.getByText('Next Page'));

    expect(mockAppContextValue.fetchCommentsByPostId).toHaveBeenCalledWith('123', 3);
  });
});
