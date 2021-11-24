import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getComments } from '../utils/api';
import './styles/Comments.css';
import CommentCard from './CommentCard';

function Comments({ articleId }) {
  const [allComments, setAllComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [pageQuery, setPageQuery] = useState('1');
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    setCommentsLoading(true);

    getComments(articleId, pageQuery)
      .then((comments) => {
        setAllComments(comments.comments);
        setTotalComments(comments.total_count);
        setCommentsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setCommentsLoading(false);
      });
  }, [articleId, pageQuery]);

  return (
    <div className={`Comments`}>
      <h2 className='comments-title'>Comments</h2>
      <div className='comments-container'>
        {allComments.map((comment) => {
          return <CommentCard comment={comment}></CommentCard>;
        })}
      </div>
    </div>
  );
}

export default Comments;
