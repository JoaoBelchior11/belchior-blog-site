import { useContext, useEffect } from 'react';
import { Loading } from '../components/loading/Loading';
import { Pagination } from '../components/pagination/Pagination';
import { PostCard } from '../components/post-card/PostCard';
import { Toast } from '../components/toast/Toast';
import { AppContext } from '../context/AppContext';

export const Homepage = () => {
  const {
    postsData: { posts, postsPerPage, totalPostNumber, error, isLoading, pageNumber },
    fetchPosts
  } = useContext(AppContext);

  useEffect(() => {
    fetchPosts((pageNumber > 0 && pageNumber - 1) || 0);
  }, [fetchPosts]);

  const handlePageClick = (pageClicked: number) => {
    fetchPosts(pageClicked);
  };
  return (
    <>
      {error && <Toast level="danger" message={error} />}
      <section>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="columns is-multiline">
              {posts.map((post) => (
                <div key={post.id} className="column is-half" data-testid="post-card">
                  <PostCard post={post} />
                </div>
              ))}
            </div>
            <div>
              <Pagination
                totalItemsNumber={totalPostNumber}
                currentPageNumber={pageNumber}
                itemsPerPage={postsPerPage}
                onPageClick={handlePageClick}
              />
            </div>
          </>
        )}
      </section>
    </>
  );
};
