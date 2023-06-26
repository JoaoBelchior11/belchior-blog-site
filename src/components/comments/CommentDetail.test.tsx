import { render, screen } from '@testing-library/react';
import { Comment } from '../../models/comment.model';
import { CommentDetail } from './CommentDetail';

const mockComment: Comment = {
  user: {
    id: 1,
    username: 'BelchiorJ'
  },
  body: 'This my perfect test comment!',
  id: 1,
  postId: 2
};

describe('CommentDetail', () => {
  it('renders the username and comment body', () => {
    render(<CommentDetail comment={mockComment} />);

    const usernameElement = screen.getByText('BelchiorJ');
    expect(usernameElement).toBeInTheDocument();

    const bodyElement = screen.getByText('This my perfect test comment!');
    expect(bodyElement).toBeInTheDocument();
  });
});
