import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../models/post.model';
import { IconTextButton } from '../icon-text-button/IconTextButton';
import { MessageIcon } from '../icons/MessageIcon';
import { Tags } from '../tags/Tags';
import styles from './PostCard.module.scss';

interface PostCardProps {
  post: Post;
}

export const PostCard: FC<PostCardProps> = ({ post }) => {
  const truncatedBody = useMemo(() => {
    const words = post.body.trim().split(' ');
    if (words.length <= 10) {
      return <div>{post.body}</div>;
    }
    return <div>{`${words.slice(0, 10).join(' ')}...`}</div>;
  }, [post.body]);

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-title">{post.title}</div>
      </div>
      <div className={`card-content ${styles.cardBody}`}>
        <Tags tagNames={post.tags} />
        {truncatedBody}
      </div>
      <div className="card-footer">
        <div className="card-footer-item">
          <IconTextButton icon={<MessageIcon />} text={post.reactions} />
        </div>

        <Link className={`card-footer-item ${styles.readMore}`} to={`/${post.id}`}>
          <span>Read more</span>
        </Link>
      </div>
    </div>
  );
};
