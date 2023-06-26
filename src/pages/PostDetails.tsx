import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Comments } from '../components/comments/Comments';
import { PostCommentsWrapper } from '../components/comments/PostCommentsWrapper';
import { Loading } from '../components/loading/Loading';
import { Toast } from '../components/toast/Toast';
import { AppContext } from '../context/AppContext';

export const PostDetails = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const {
    fetchPostById,
    currentPostData: { currentPost, error: postError, isLoading },
    currentCommentsData: { error: commentsError },
    resetCurrentPost
  } = useContext(AppContext);

  const handleGoBack = () => {
    resetCurrentPost();
    navigate(-1);
  };

  useEffect(() => {
    postId && fetchPostById(postId);
  }, [postId, fetchPostById]);

  return (
    <>
      {postError && <Toast level="danger" message={postError} />}
      {commentsError && <Toast level="danger" message={commentsError} />}
      <div>
        <button className="button" onClick={handleGoBack}>
          Go Back
        </button>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {currentPost && (
              <article>
                <h6 className="is-size-5">{currentPost?.title}</h6>
                <span className="is-size-7">
                  Author: {currentPost?.user.firstName} {currentPost?.user.lastName}
                </span>
                <div>{currentPost?.body}</div>
              </article>
            )}
          </>
        )}

        {postId && (
          <PostCommentsWrapper postId={postId}>
            {(
              currentComments,
              totalCommentsNumber,
              commentsPerPage,
              commentsPageNumber,
              handleCommentPageClick
            ) => (
              <Comments
                comments={currentComments}
                totalCommentsNumber={totalCommentsNumber}
                commentsPerPage={commentsPerPage}
                commentsPageNumber={commentsPageNumber}
                handleCommentPageClick={handleCommentPageClick}
              />
            )}
          </PostCommentsWrapper>
        )}
      </div>
    </>
  );
};
