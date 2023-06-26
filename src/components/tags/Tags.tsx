import { FC } from 'react';

interface TagsProps {
  tagNames: string[];
}

export const Tags: FC<TagsProps> = ({ tagNames }) => {
  return (
    <div className="tags">
      {tagNames.map((tag, index) => (
        <span key={`${tag}${index}`} data-testid="tag" className="tag">
          {tag}
        </span>
      ))}
    </div>
  );
};
