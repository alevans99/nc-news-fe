import './styles/CommentCard.css';
import { useState } from 'react';
import incArrow from '../images/up-arrow.png';
import decArrow from '../images/down-arrow.png';
import { patchCommentVotes } from '../utils/api';
import { dateFormatter } from '../utils/utils';

function CommentCard({ comment }) {
  const [commentVotes, setCommentVotes] = useState(comment.votes);

  const changeVote = (voteChange) => {
    setCommentVotes((previousVotes) => {
      return previousVotes + voteChange;
    });

    patchCommentVotes(comment.comment_id, voteChange)
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
