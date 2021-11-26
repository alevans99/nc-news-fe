import './styles/NewComment.css';
import { useState, useContext } from 'react';
import { postNewComment } from '../utils/api';
import { UserContext } from '../contexts/UserContext';
import ValidationWarning from './ValidationWarning';

function NewComment({
  setAddCommentVisible,
  articleId,
  setNewCommentsAdded,
  setAllComments,
}) {
  const [commentInput, setCommentInput] = useState('');
  const { currentUser } = useContext(UserContext);
  const [commentValidationWarning, setCommentValidationWarning] =
    useState(false);
  const [commentValidationWarningText, setCommentValidationWarningText] =
    useState('There was an issue with your submission');

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
          if (commentInput != '') {
            submitNewComment();
            setCommentValidationWarning(false);
          } else {
            setCommentValidationWarningText(
              "Please make sure your comment isn't empty"
            );
            setCommentValidationWarning(true);
          }
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
          <ValidationWarning
            isVisible={commentValidationWarning}
            warningText={commentValidationWarningText}
          ></ValidationWarning>
          <button type='submit' className='new-comment-submit-button'>
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default NewComment;
