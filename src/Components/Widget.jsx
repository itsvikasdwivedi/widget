import React, { useState } from 'react';
import '../index.css'
const Widget = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleNewCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    const timestamp = new Date().toISOString();
    setComments([...comments, { text: newComment, timestamp, likes: 0 }]);
    setNewComment('');
  };

  const handleEditComment = (index, newText) => {
    const updatedComments = [...comments];
    updatedComments[index].text = newText;
    setComments(updatedComments);
  };

  const handleDeleteComment = (index) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
  };

  const handleLikeComment = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].likes += 1;
    setComments(updatedComments);
  };

  const handleSortByDate = () => {
    setComments([...comments].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
  };

  const handleSortByLikes = () => {
    setComments([...comments].sort((a, b) => b.likes - a.likes));
  };

  return (
    <div className='container'>
      <div className='heading'>
        <h3>Comment Widget</h3>
      </div>
    <div>
      <div className='comment-widget'>
      <textarea
      placeholder='Join the discussion'
      className='comment-input'
        value={newComment}
        onChange={handleNewCommentChange}
        maxLength={200}
        />
      <button onClick={handleAddComment}>Add Comment</button>
      </div>
      <br />
      <br />
      <button onClick={handleSortByDate}>Sort by Date</button>
      <button onClick={handleSortByLikes}>Sort by Likes</button>
      <br />
      <br />
      {comments.map((comment, index) => (
        <div key={comment.timestamp}>
          <p>{comment.text}</p>
          <p>
            Likes: {comment.likes}{' '}
            <button onClick={() => handleLikeComment(index)}>Like</button>
          </p>
          <button onClick={() => handleEditComment(index, prompt('Edit comment'))}>
            Edit
          </button>
          <button onClick={() => handleDeleteComment(index)}>Delete</button>
        </div>
      ))}
    </div>
        </div>
  );
};

export default Widget;
