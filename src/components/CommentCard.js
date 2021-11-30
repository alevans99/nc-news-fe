import './styles/CommentCard.css';
import { useState, useContext } from 'react';
import incArrow from '../images/up-arrow.png';
import decArrow from '../images/down-arrow.png';
import { patchCommentVotes } from '../utils/api';
import { dateFormatter } from '../utils/utils';
import { UserContext } from '../contexts/UserContext';

function CommentCard({ comment }) {
  const [commentVotes, setCommentVotes] = useState(comment.votes);
  const { userCommentVotes, setUserCommentVotes } = useContext(UserContext);

  const updateUserCommentVotes = (changeInVotes) => {
    setUserCommentVotes((previousObject) => {
      const newObject = { ...previousObject };
      newObject[comment.comment_id] = changeInVotes;
      return newObject;
    });
  };

  const changeVote = (voteChange) => {
    let amountToChange = 0;

    //If the user has voted before and chosen the same - remove the vote and remove value from
    //object
    if (userCommentVotes[comment.comment_id] !== undefined) {
      //Chosen the same

      if (userCommentVotes[comment.comment_id] === voteChange) {
        if (voteChange === -1) {
          amountToChange = 1;
        } else {
          amountToChange = -1;
        }

        //Remove from object
        updateUserCommentVotes(undefined);
      } else {
        //If the user has voted before and chosen a different one, add or remove 2 and update the object

        if (voteChange === -1) {
          amountToChange = -2;
        } else {
          amountToChange = 2;
        }
        updateUserCommentVotes(voteChange);
      }
    } else {
      //If the user hasn't voted before, just update it based on the value given and update the object.

      amountToChange = voteChange;

      updateUserCommentVotes(voteChange);
    }

    setCommentVotes((previousVotes) => {
      return previousVotes + amountToChange;
    });

    patchCommentVotes(comment.comment_id, amountToChange)
      .then((result) => {})
      .catch((err) => {});
  };

  return (
    <div className={`CommentCard`}>
      <div className='comment-card-vote-container'>
        <button
          className='comment-card-inc-vote-button cc-vote-button'
          onClick={() => {
            changeVote(1);
          }}
        >
          <img
            className='comment-card-inc-arrow cc-button-image'
            src={incArrow}
            alt='up arrow'
          ></img>
        </button>
        <h3 className='comment-card-vote-count'>{`${commentVotes}`}</h3>

        <button
          className='comment-card-dec-vote-button cc-vote-button'
          onClick={() => {
            changeVote(-1);
          }}
        >
          <img
            className='comment-card-dec-arrow ac-button-image'
            src={decArrow}
            alt='down arrow'
          ></img>
        </button>
      </div>
      <h2 className='comment-card-body'>{comment.body}</h2>

      <h3 className='comment-card-author'>{`Posted by ${
        comment.author
      } ${dateFormatter(comment.created_at)}`}</h3>
    </div>
  );
}

export default CommentCard;
