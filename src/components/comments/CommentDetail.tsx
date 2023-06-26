import { FC } from 'react';
import { Comment } from '../../models/comment.model';
import { IconTextButton } from '../icon-text-button/IconTextButton';
import { UserIcon } from '../icons/UserIcon';
import styles from './Comments.module.scss';

interface CommentDetailProps {
  comment: Comment;
}

export const CommentDetail: FC<CommentDetailProps> = ({ comment }) => {
  return (
    <div className={styles.commentDetail}>
      <div>
        <IconTextButton text={comment.user.username} icon={<UserIcon />} />
      </div>
      <div>{comment.body}</div>
    </div>
  );
};
