import { FC } from 'react';
import { Comment } from '../../models/comment.model';
import { Pagination } from '../pagination/Pagination';
import { CommentDetail } from './CommentDetail';
import styles from './Comments.module.scss';
import { CommentsHeader } from './CommentsHeader';

export interface CommentsProps {
  comments: Comment[];
  commentsPageNumber: number;
  totalCommentsNumber: number;
  commentsPerPage: number;
  handleCommentPageClick: (pageClicked: number) => void;
}

export const Comments: FC<CommentsProps> = ({
  comments,
  commentsPageNumber,
  totalCommentsNumber,
  commentsPerPage,
  handleCommentPageClick
}) => {
  return (
    <section className={styles.commentsContainer} data-testid="comments">
      <CommentsHeader />
      <div className={styles.commentsBody}>
        {comments.map((comment) => (
          <CommentDetail key={comment.id} comment={comment} />
        ))}
      </div>
      <Pagination
        currentPageNumber={commentsPageNumber}
        totalItemsNumber={totalCommentsNumber}
        itemsPerPage={commentsPerPage}
        onPageClick={handleCommentPageClick}
      />
    </section>
  );
};
