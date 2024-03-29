import { useEffect, useState, useRef } from 'react';
import loadingSpinner from '../images/spinner.png';
import { getComments } from '../utils/api';
import './styles/Comments.css';
import CommentCard from './CommentCard';
import Loading from './Loading';
import CollapsableContainer from './CollapsableContainer';
import NewComment from './NewComment';
import ErrorMessage from './ErrorMessage';

function Comments({ articleId }) {
  const [allComments, setAllComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [scrollCommentsLoading, setScrollCommentsLoading] = useState(false);
  const [addCommentVisible, setAddCommentVisible] = useState(false);
  const [pageQuery, setPageQuery] = useState(1);
  const [totalComments, setTotalComments] = useState(0);
  const [totalCommentsDisplayed, setTotalCommentsDisplayed] = useState(0);
  const [userReachedEnd, setUserReachedEnd] = useState(false);
  const [newCommentsAdded, setNewCommentsAdded] = useState(0);
  const newCommentsAddedRef = useRef(0);

  const [commentsErrorVisible, setCommentsErrorVisible] = useState(false);
  const commentsErrorText =
    'There was a problem loading the comments for this article.';

  const handlePostCommentButton = () => {
    setAddCommentVisible((previousState) => {
      return !previousState;
    });
  };

  useEffect(() => {
    newCommentsAddedRef.current = newCommentsAdded;
  }, [newCommentsAdded]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    function handleScroll(e) {
      if (
        window.innerHeight + window.pageYOffset - 2 >=
          document.body.offsetHeight &&
        !userReachedEnd &&
        !commentsLoading &&
        !scrollCommentsLoading
      ) {
        setUserReachedEnd(true);

        if (totalCommentsDisplayed < totalComments) {
          setPageQuery((previousPage) => {
            return previousPage + 1;
          });
        } else {
          //console.log('There are no more comments to load');
        }
      }
    }
    if (!userReachedEnd && !commentsLoading && !scrollCommentsLoading) {

      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [
    totalCommentsDisplayed,
    totalComments,
    userReachedEnd,
    commentsLoading,
    scrollCommentsLoading,
  ]);



  useEffect(() => {
    setCommentsErrorVisible(false);

    if (pageQuery === 1) {
      setCommentsLoading(true);
    } else {
      setScrollCommentsLoading(true);
    }

    getComments(articleId, pageQuery)
      .then((comments) => {
        setTotalComments((previousTotal) => {
          return Number(comments.total_count);
        });

        setAllComments((previousComments) => {
          if (newCommentsAddedRef.current > 9) {
            setNewCommentsAdded((previousTotal) => {
              return previousTotal - 10;
            });
            return [...previousComments];
          } else {
            const newComments = comments.comments.slice(
              newCommentsAddedRef.current
            );
            return [...previousComments, ...newComments];
          }
        });

        setTotalCommentsDisplayed((previousNumber) => {
          return previousNumber + comments.comments.length;
        });

        setCommentsLoading(false);
        setScrollCommentsLoading(false);
        setUserReachedEnd(false);
      })
      .catch((err) => {
        setCommentsErrorVisible(true);
        setScrollCommentsLoading(false);
        setCommentsLoading(false);
      });
  }, [articleId, pageQuery]);

  return (
    <div className={`Comments`}>
      <ErrorMessage
        isVisible={commentsErrorVisible}
        errorText={commentsErrorText}
      >
        <Loading isLoading={commentsLoading} loadingText='Loading Comments'>
          <h2 className='comments-title'>Comments</h2>
          <button
            className='comments-new-comment-button'
            onClick={(e) => {
              handlePostCommentButton();
            }}
          >
            Post a Comment
          </button>
          <CollapsableContainer isVisible={addCommentVisible}>
            <NewComment
              setAddCommentVisible={setAddCommentVisible}
              articleId={articleId}
              setNewCommentsAdded={setNewCommentsAdded}
              setAllComments={setAllComments}
            ></NewComment>
          </CollapsableContainer>
          <div className='comments-container'>
            {allComments.map((comment) => {
              return (
                <CommentCard
                  key={comment.comment_id}
                  comment={comment}
                ></CommentCard>
              );
            })}
            {scrollCommentsLoading ? (
              <div className='comments-loading-more-container'>
                <img
                  className='comments-loading-spinner'
                  src={loadingSpinner}
                  alt='spinning arrow'
                ></img>

                <h2 className='comments-loading-text'>
                  Loading More Comments...
                </h2>
              </div>
            ) : null}
          </div>
        </Loading>
      </ErrorMessage>
    </div>
  );
}

export default Comments;
