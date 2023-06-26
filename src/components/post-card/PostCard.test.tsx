import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Post } from '../../models/post.model';
import { PostCard } from './PostCard';

const mockPost: Post = {
  id: 1,
  title: 'A nice post',
  body: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
  tags: ['tag1', 'tag2'],
  reactions: 5,
  userId: 2
};

describe('PostCard', () => {
  const element = (
    <MemoryRouter>
      <PostCard post={mockPost} />
    </MemoryRouter>
  );
  test('renders the post title', () => {
    render(element);
    const titleElement = screen.getByText(mockPost.title);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the truncated post body, with only 10 words', () => {
    render(element);
    const bodyElement = screen.getByText('It is a long established fact that a reader will...');
    expect(bodyElement).toBeInTheDocument();
  });

  test("doesn't render the ellipsis in case the body is shorter than 10 words", () => {
    const shorterMockPost: Post = {
      ...mockPost,
      body: 'I am a shorter body'
    };
    render(
      <MemoryRouter>
        <PostCard post={shorterMockPost} />
      </MemoryRouter>
    );
    const bodyElement = screen.getByText(shorterMockPost.body);
    expect(bodyElement).toBeInTheDocument();
  });

  test('renders the Tags component with the correct tag names', () => {
    render(element);
    const tagElement1 = screen.getByText('tag1');
    const tagElement2 = screen.getByText('tag2');
    expect(tagElement1).toBeInTheDocument();
    expect(tagElement2).toBeInTheDocument();
  });

  test('renders the IconTextButton component with the correct number of reactions', () => {
    render(element);
    const reactionsButtonElement = screen.getByText('5');
    expect(reactionsButtonElement).toBeInTheDocument();
  });

  test('renders the Read more link with the correct URL', () => {
    render(element);
    const readMoreLinkElement = screen.getByRole('link', { name: 'Read more' });
    expect(readMoreLinkElement.getAttribute('href')).toBe('/1');
  });
});
