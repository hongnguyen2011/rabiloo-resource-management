import {useEffect, useState} from 'react';
import {useLocation, useSearchParams} from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CreateQuestion from './items/CreateQuestion';
import QuestionTest from './items/QuestionTest';
import './content_test.css';
import {Button} from '@mui/material';
import {useQuery} from 'react-query';
import {FetchApi} from '../../utils';
import {AppLoadingView} from '../../components';

function ContentTestCountTime({title}) {
  const [mins, setMinutes] = useState(60);
  const [secs, setSeconds] = useState(0);
  useEffect(() => {
    let sampleInterval = setInterval(() => {
      if (secs > 0) {
        setSeconds(secs - 1);
      }
      if (secs === 0) {
        if (mins === 0) {
          clearInterval(sampleInterval);
        } else {
          setMinutes(mins - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(sampleInterval);
    };
  });
  return (
    <h2 style={{color: '#253f8e'}}>
      {title}- {mins}:{secs < 10 ? `0${secs}` : secs}
    </h2>
  );
}

export default function ContentTest() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const idTest = searchParams.get('idTest');
  const [showForm, setShowForm] = useState(false);

  const {data, isLoading} = useQuery(`listQuestion-${idTest}`, () =>
    FetchApi.getDetailExam({examId: idTest}),
  );
  if (isLoading) {
    return <AppLoadingView />;
  }
  return (
    <div className="contentTest">
      {/* <ContentTestCountTime
        style={{color: '#253f8e'}}
        title={data?.dto?.title}
      /> */}
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
      {showForm && (
        <CreateQuestion
          showForm={showForm}
          idTest={idTest}
          setShowForm={setShowForm}
        />
      )}
      <QuestionTest questionList={data?.dto?.questions} idTest={idTest} />
    </div>
  );
}
