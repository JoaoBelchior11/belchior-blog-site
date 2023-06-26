import { render, screen } from '@testing-library/react';
import { Tags } from './Tags';

describe('Tags', () => {
  test('renders the tags with the correct tag names', () => {
    const tagNames = ['tag1', 'tag2', 'tag3'];
    render(<Tags tagNames={tagNames} />);
    const tagElements = screen.getAllByTestId('tag');
    expect(tagElements).toHaveLength(tagNames.length);

    tagNames.forEach((tagName, index) => {
      const tagElement = tagElements[index];
      expect(tagElement).toHaveTextContent(tagName);
    });
  });
});
