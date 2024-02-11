import {useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {AddStatus} from './items/AddStatus';
import {StatusList} from './items/StatusList';

import './status.css';
import {useAppLanguage} from '../../hooks';

export default function Status() {
  const {Strings} = useAppLanguage();
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      content:
        'Để có cái nhìn tổng quan về ngành IT - Lập trình web các bạn nên xem các videos tại khóa này trước nhé.',
    },
    {
      id: 2,
      content:
        'Trong khóa này chúng ta sẽ cùng nhau xây dựng giao diện 2 trang web là The Band & Shopee.',
    },
  ]);
  return (
    <div
      style={{
        color: '#253f8e',
      }}
      className="status">
      <h2>{Strings.status}</h2>
      <button
        style={{
          textAlignLast: 'center',
          width: '82.7%',
          marginLeft: '10%',
          marginBottom: '20px',
          border: '1px solid #253f8e',
          boxShadow: '0 0 5px #253f8e',
          borderRadius: '5px',
          color: '#253f8e',
          cursor: 'pointer',
        }}
        onClick={() => {
          setShowForm(!showForm);
        }}>
        {!showForm ? <AddIcon /> : <RemoveIcon />}
      </button>
      {showForm && <AddStatus posts={posts} setPosts={setPosts} />}
      <StatusList posts={posts} setPosts={setPosts} />
    </div>
  );
}
