import './styles/UserProfile.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext, useCallback, useRef } from 'react';
import {
  deleteArticle,
  deleteComment,
  getArticlesByUsername,
  getCommentsByUsername,
  getUserByUsername,
} from '../utils/api';
import { UserContext } from '../contexts/UserContext';
import Loading from './Loading';
import ProfileContentCard from './ProfileContentCard';
import ErrorMessage from './ErrorMessage';
import loadingSpinner from '../images/spinner.png';

function UserProfile() {
  const { currentUser } = useContext(UserContext);
  const [userProfileInformation, setUserProfileInformation] = useState({});
  const [userContent, setUserContent] = useState([]);
  // const [userContentTotal, setUserContentTotal] = useState(0);
  const [displayChoice, setDisplayChoice] = useState('Comments');
  const [cardsLoading, setCardsLoading] = useState(true);
  const [scrollCardsLoading, setScrollCardsLoading] = useState(false);
  const [totalCardsDisplayed, setTotalCardsDisplayed] = useState(0);
  const [totalCards, setTotalCards] = useState(0);
  const pageQuery = useRef(0);
  //const [pageQuery, setPageQuery] = useState(1);
  // const [cardsRemoved, setCardsRemoved] = useState(0);
  const [profileError, setProfileError] = useState(false);
  const [profileErrorText, setProfileErrorText] = useState(
    'There was an unexpected error'
  );
  const [contentError, setContentError] = useState(false);

  //keeps track of scrolling to avoid multiple loads on user reaching end of page
  const [userReachedEnd, setUserReachedEnd] = useState(false);

  const { username } = useParams();

  const handleDelete = (id) => {
    if (displayChoice === 'Comments') {
      deleteComment(id)
        .then((result) => {
          setUserContent((previousContent) => {
            const filteredContent = previousContent.filter((item) => {
              return Number(item.id) !== Number(id);
            });

            return filteredContent;
          });
        })
        .catch((err) => {
          setProfileErrorText(
            'There was an error when trying to delete your comment, please reload the page to try again.'
          );
          setProfileError(true);
        });
    } else {
      deleteArticle(id)
        .then((result) => {
          setUserContent((previousContent) => {
            const filteredContent = previousContent.filter((item) => {
              return Number(item.id) !== Number(id);
            });

            return filteredContent;
          });
        })
        .catch((err) => {
          setProfileErrorText(
            'There was an error when trying to delete your article, please reload the page to try again.'
          );
          setProfileError(true);
        });
    }
  };

  //Loads the user details based on the username in the url
  useEffect(() => {
    getUserByUsername(username)
      .then((result) => {
        setUserProfileInformation(result);
      })
      .catch((err) => {
        setProfileErrorText("We couldn't find the user you requested");
        setProfileError(true);
      });
  }, [username]);

  //Deals with loading initial comments/articles and loads the first page of
  //comments or articles when user changes selection
  useEffect(() => {
    console.log('initial useeffect triggered');
    window.scrollTo(0, 0);

    setCardsLoading(true);
    pageQuery.current = 1;

    if (displayChoice === 'Comments') {
      getCommentsByUsername(username, 1)
        .then((comments) => {
          const contentObjects = comments.comments.map((comment) => {
            return {
              id: comment.comment_id,
              author: comment.author,
              text: comment.body,
              votes: comment.votes,
              date: comment.created_at,
              link: `/articles/${comment.article_id}`,
            };
          });
          setUserContent(contentObjects);
          setTotalCards(comments.total_count);

          setTotalCardsDisplayed(comments.comments.length);
          setCardsLoading(false);
          setUserReachedEnd(false);
        })
        .catch((err) => {
          setContentError(true);
        });
    } else {
      getArticlesByUsername(username, 1)
        .then((articles) => {
          const contentObjects = articles.articles.map((article) => {
            return {
              id: article.article_id,
              author: article.author,
              text: article.title,
              votes: article.votes,
              date: article.created_at,
              link: `/articles/${article.article_id}`,
            };
          });
          setUserContent(contentObjects);
          setTotalCards(articles.total_count);
          setTotalCardsDisplayed(articles.articles.length);
          setCardsLoading(false);
          setUserReachedEnd(false);
        })
        .catch((err) => {
          setContentError(true);
        });
    }
  }, [displayChoice, username]);

  //Loads more images when the pageQuery changes (when the user scrolls to the bottom
  //of the page). It skips changes to page 1 as this indicates the user is changing the
  //type of card displayed.

  const loadMoreCards = useCallback(
    (pageRequested) => {
      setScrollCardsLoading(true);
      console.log('loading more cards for page ', pageRequested);
      if (displayChoice === 'Comments') {
        getCommentsByUsername(username, pageRequested)
          .then((comments) => {
            const contentObjects = comments.comments.map((comment) => {
              return {
                id: comment.comment_id,
                author: comment.author,
                text: comment.body,
                votes: comment.votes,
                date: comment.created_at,
                link: `/articles/${comment.article_id}`,
              };
            });
            console.log('new content objects are ', contentObjects);

            setUserContent((previousObjects) => {
              console.log('old ones are ', previousObjects);

              const newObjects = [...previousObjects, ...contentObjects];
              return newObjects;
            });

            setTotalCardsDisplayed((previousTotal) => {
              return previousTotal + comments.comments.length;
            });

            setScrollCardsLoading(false);
            setUserReachedEnd(false);
            setCardsLoading(false);
          })
          .catch((err) => {
            setContentError(true);
            setScrollCardsLoading(false);
            setCardsLoading(false);
          });
      } else {
        getArticlesByUsername(username, pageRequested)
          .then((articles) => {
            const contentObjects = articles.articles.map((article) => {
              return {
                id: article.article_id,
                author: article.author,
                text: article.title,
                votes: article.votes,
                date: article.created_at,
                link: `/articles/${article.article_id}`,
              };
            });

            setUserContent((previousObjects) => {
              const newObjects = [...previousObjects, ...contentObjects];
              return newObjects;
            });

            setTotalCardsDisplayed((previousTotal) => {
              return previousTotal + articles.articles.length;
            });

            setScrollCardsLoading(false);
            setUserReachedEnd(false);
            setCardsLoading(false);
          })
          .catch((err) => {
            setContentError(true);
            setScrollCardsLoading(false);
            setCardsLoading(false);
          });
      }

      return () => {
        setUserContent({});
        setScrollCardsLoading(false);
        setUserReachedEnd(false);
        setCardsLoading(false);
        setContentError(false);
        setTotalCardsDisplayed(0);
      };
    },
    [displayChoice, username]
  );

  //Monitors user scrolling and requests more cards if there are more
  //comments/articles available

  useEffect(() => {
    function handleScroll(e) {
      if (
        window.innerHeight + window.pageYOffset - 2 >=
          document.body.offsetHeight &&
        !userReachedEnd &&
        !cardsLoading &&
        !scrollCardsLoading
      ) {
        setUserReachedEnd(true);
        console.log('bottom of page');
        if (totalCardsDisplayed < totalCards) {
          pageQuery.current = pageQuery.current + 1;
          console.log('reset page query ', pageQuery);
          loadMoreCards(pageQuery.current);
        } else {
          console.log('There are no more cards to load');
        }
      }
    }

    if (!userReachedEnd && !cardsLoading && !scrollCardsLoading) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [
    totalCardsDisplayed,
    totalCards,
    userReachedEnd,
    cardsLoading,
    scrollCardsLoading,
    loadMoreCards,
    displayChoice,
  ]);

  return (
    <div className={`UserProfile`}>
      <ErrorMessage isVisible={profileError} errorText={profileErrorText}>
        <div className='user-profile-user-details-body'>
          <div className='user-profile-user-details-container'>
            <h2 className='user-profile-username-title'>{username}</h2>
            <img
              className='user-profile-image'
              src={userProfileInformation.avatar_url}
              alt='user-profile-avatar'
            ></img>
          </div>
        </div>

        <select
          value={displayChoice}
          className='user-profile-display-select'
          onChange={(e) => {
            setDisplayChoice(e.target.value);
          }}
        >
          <option value='Comments'>Comments</option>
          <option value='Articles'>Articles</option>
        </select>
        <ErrorMessage
          isVisible={contentError}
          errorText={`Unable to load ${displayChoice} for this user`}
        >
          <Loading isLoading={cardsLoading}>
            <div className='user-profile-cards-body'>
              <div className='user-profile-cards-container'>
                {userContent.map((content) => {
                  return username === currentUser.username ? (
                    <div
                      key={content.id}
                      className='user-profile-individual-card-container'
                    >
                      <ProfileContentCard
                        content={content}
                      ></ProfileContentCard>
                      <button
                        className='user-profile-card-delete-button'
                        value={content.id}
                        onClick={(e) => {
                          handleDelete(e.target.value);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <ProfileContentCard
                      key={content.id}
                      content={content}
                    ></ProfileContentCard>
                  );
                })}
                {scrollCardsLoading ? (
                  <div className='cards-loading-more-container'>
                    <img
                      className='cards-loading-spinner'
                      src={loadingSpinner}
                      alt='spinning arrow'
                    ></img>

                    <h2 className='cards-loading-text'>Loading More...</h2>
                  </div>
                ) : null}
              </div>
            </div>
          </Loading>
        </ErrorMessage>
      </ErrorMessage>
    </div>
  );
}

export default UserProfile;
