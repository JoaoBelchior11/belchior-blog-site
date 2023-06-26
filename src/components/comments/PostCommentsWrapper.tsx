import { FC, useCallback, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { Comment } from '../../models/comment.model';
import { Loading } from '../loading/Loading';
interface PostCommentsWrapperProps {
  children: (
    comments: Comment[],
    totalCommentsNumber: number,
    commentsPerPage: number,
    commentsPageNumber: number,
    handleCommentPageClick: (pageClicked: number) => void
  ) => JSX.Element;
  postId: string;
}

export const PostCommentsWrapper: FC<PostCommentsWrapperProps> = ({ children, postId }) => {
  const {
    currentCommentsData: {
      currentComments,
      isLoading,
      totalCommentsNumber,
      commentsPageNumber,
      commentsPerPage
    },
    fetchCommentsByPostId
  } = useContext(AppContext);

  useEffect(() => {
    fetchCommentsByPostId(postId, (commentsPageNumber > 0 && commentsPageNumber - 1) || 0);
  }, [fetchCommentsByPostId, postId]);

  const handleCommentPageClick = useCallback(
    (pageClicked: number) => {
      fetchCommentsByPostId(postId, pageClicked);
    },
    [fetchCommentsByPostId, postId]
  );

  if (isLoading) {
    return <Loading />;
  }

  return currentComments
    ? children(
        currentComments,
        totalCommentsNumber,
        commentsPerPage,
        commentsPageNumber,
        handleCommentPageClick
      )
    : null;
};
