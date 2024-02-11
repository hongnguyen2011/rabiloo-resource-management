import './problem.css';
import {useState} from 'react';
import {AddTest} from './items/AddTest';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useQuery} from 'react-query';
import {FetchApi} from '../../utils';
import {CircularProgress} from '@mui/material';
import {AppLoadingView} from '../../components';
import ExamList from './items/ExamList';
import {Box} from '@mui/system';
import {useAppAccount} from '../../hooks';
import {useAppLanguage} from '../../hooks';

function Problems() {
  const {Strings} = useAppLanguage();
  const [showForm, setShowForm] = useState(false);
  const {account} = useAppAccount();
  const isRoleAdmin = account.roles && account.roles[0] === 'ROLE_ADMIN';
  const {data, isLoading} = useQuery(['listExam'], () => {
    if (isRoleAdmin) {
      return FetchApi.allExam();
    }
    return FetchApi.getAllUserExam();
  });
  if (isLoading) {
    return <AppLoadingView />;
  }
  return (
    <div className="problemsBody">
      <h2 style={{color: '#253f8e'}}>{Strings.problem}</h2>
      {!!isRoleAdmin && (
        <div
          style={{
            textAlignLast: 'center',
            width: '80%',
            marginLeft: '10%',
            border: '1px solid #253f8e',
            color: '#253f8e',
            cursor: 'pointer',
          }}
          onClick={() => {
            setShowForm(!showForm);
          }}>
          {!showForm ? <AddIcon /> : <RemoveIcon />}
        </div>
      )}
      {showForm && <AddTest />}

      <ExamList listExam={data?.dtos || []} />
    </div>
  );
}

export default Problems;
