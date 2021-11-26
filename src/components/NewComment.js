import './styles/NewComment.css';
import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { getArticles, postNewComment } from '../utils/api';
import Collapsable from './Collapsable';
import { UserContext } from '../contexts/UserContext';

function NewComment({
  setAddCommentVisible,
  articleId,
  setNewCommentsAdded,
  setAllComments,
}) {
  const [commentInput, setCommentInput] = useState('');
  const { currentUser } = useContext(UserContext);

  const submitNewComment = () => {
    postNewComment(articleId, currentUser.username, commentInput)
      .then((comment) => {
        setNewCommentsAdded((previousTotal) => {
          return previousTotal + 1;
        });
        setAllComments((previousComments) => {
          return [comment, ...previousComments];
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setAddCommentVisible(false);
  };

  return (
    <div className={`NewComment`}>
      <form
        className='new-comment-form'
        onSubmit={(e) => {
          e.preventDefault();
          submitNewComment();
        }}
      >
        <fieldset className='new-comment-form-fieldset'>
          <legend className='new-comment-form-legend'>
            Enter your comment below:
          </legend>
          <textarea
            className='new-comment-input'
            value={commentInput}
            onChange={(e) => {
              setCommentInput(e.target.value);
            }}
          ></textarea>
          <button type='submit' className='new-comment-submit-button'>
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default NewComment;
