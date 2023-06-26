import { render, screen } from '@testing-library/react';
import { Comment } from '../../models/comment.model';
import { Comments } from './Comments';

const mockComments: Comment[] = [
  {
    user: {
      id: 1,
      username: 'BelchiorJ'
    },
    body: 'This my perfect test comment!',
    id: 1,
    postId: 2
  },
  {
    user: {
      id: 2,
      username: 'BigSis'
    },
    body: 'This is Better!!!!',
    id: 2,
    postId: 2
  }
];

const mockHandleCommentPageClick = jest.fn();

describe('Comments', () => {
  test('renders the CommentsHeader component', () => {
    render(
      <Comments
        comments={mockComments}
        commentsPageNumber={1}
        totalCommentsNumber={2}
        commentsPerPage={5}
        handleCommentPageClick={mockHandleCommentPageClick}
      />
    );
    const commentsHeaderElement = screen.getByRole('heading', {
      level: 5,
      name: 'Comments'
    });
    expect(commentsHeaderElement).toBeInTheDocument();
  });

  test('renders the CommentDetail components', () => {
    render(
      <Comments
        comments={mockComments}
        commentsPageNumber={1}
        totalCommentsNumber={10}
        commentsPerPage={5}
        handleCommentPageClick={mockHandleCommentPageClick}
      />
    );
    const bodyElement1 = screen.getByText('This my perfect test comment!');
    const bodyElement2 = screen.getByText('This is Better!!!!');
    expect(bodyElement1).toBeInTheDocument();
    expect(bodyElement2).toBeInTheDocument();
  });

  test('renders the Pagination component', () => {
    render(
      <Comments
        comments={mockComments}
        commentsPageNumber={1}
        totalCommentsNumber={10}
        commentsPerPage={5}
        handleCommentPageClick={mockHandleCommentPageClick}
      />
    );
    const paginationElement = screen.getByLabelText('pagination');
    expect(paginationElement).toBeInTheDocument();
  });

  test('calls handleCommentPageClick when pagination page is clicked', () => {
    render(
      <Comments
        comments={mockComments}
        commentsPageNumber={1}
        totalCommentsNumber={10}
        commentsPerPage={5}
        handleCommentPageClick={mockHandleCommentPageClick}
      />
    );
    const pageLinkElement = screen.getByLabelText('Go to page 2');
    pageLinkElement.click();
    expect(mockHandleCommentPageClick).toHaveBeenCalledWith(1);
  });
});
