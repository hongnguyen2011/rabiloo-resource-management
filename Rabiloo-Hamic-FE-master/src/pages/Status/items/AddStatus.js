import {useState} from 'react';
export function AddStatus({posts, setPosts}) {
  return (
    <div
      style={{
        width: '80%',
        height: '250px',
        margin: '0 10%',
        padding: '8px 16px',
        border: '1px solid #253f8e',
        boxShadow: '0 0 5px #253f8e',
        color: '#253f8e',
      }}
      className="addStatus">
      <h4>Nhập thông báo:</h4>
      <textarea
        style={{
          border: '1px solid #253f8e',
          width: '95%',
          marginRight: '10px',
        }}
        className="formContent"></textarea>
      <button
        style={{backgroundColor: '#253f8e', color: '#fff'}}
        onClick={() => {
          const newTest = {
            content: document.getElementsByClassName('formContent')[0].value,
          };
          setPosts([newTest, ...posts]);
        }}>
        Submit
      </button>
    </div>
  );
}
