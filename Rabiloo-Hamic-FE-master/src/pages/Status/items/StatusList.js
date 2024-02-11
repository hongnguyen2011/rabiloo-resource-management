import {useState} from 'react';

function StatusListItem(props) {
  const {id, content} = props;

  return (
    <div
      style={{
        width: '80%',
        margin: '20px 10%',
        border: '1px solid #253f8e',
        color: '#253f8e',
      }}
      className="statusList">
      <h4>Thông báo:</h4>
      <p>{content}</p>
    </div>
  );
}
export function StatusList({posts, setPosts}) {
  return posts.map(post => {
    return <StatusListItem key={post.id} id={post.id} content={post.content} />;
  });
}
