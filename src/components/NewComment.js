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
    if (commentInput === '') {
      setCommentValidationWarningText(
        "Please make sure your comment isn't empty"
      );
      setCommentValidationWarning(true);
      return;
    }

    setCommentValidationWarning(false);

    postNewComment(articleId, currentUser.username, commentInput)
      .then((comment) => {
        setNewCommentsAdded((previousTotal) => {
          return previousTotal + 1;
        });
        setAllComments((previousComments) => {
          return [comment, ...previousComments];
        });

        setAddCommentVisible(false);
      })

      .catch((err) => {
        setCommentValidationWarningText(
          'Unfortunately there was an issue when trying to post your comment'
        );
        setCommentValidationWarning(true);
      });
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
