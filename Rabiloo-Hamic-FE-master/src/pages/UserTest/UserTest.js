import {useEffect, useState} from 'react';
import {useLocation, useSearchParams} from 'react-router-dom';

import './user_test.css';
import {Button} from '@mui/material';
import {useQuery} from 'react-query';
import {FetchApi} from '../../utils';
import {AppLoadingView, AppModalService} from '../../components';
import QuestionTestUser from './items/QuestionTestUser';
import {FormProvider, useForm} from 'react-hook-form';
import {ModalResultTest} from './items/ModalResultTest';
import {useAppLanguage} from '../../hooks';

function UserTestCountTime({title}) {
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

export default function UserTest() {
  const value = useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const idTest = searchParams.get('idTest');
  const [loading, setLoading] = useState(false);
  const {data, isLoading} = useQuery(`userTest-${idTest}`, () =>
    FetchApi.getDetailExamUser({examId: idTest}),
  );
  const totalQuestion = data?.dto?.questions?.length;
  const {Strings} = useAppLanguage();
  const onSubmit = async data => {
    const questionReq = Object.keys(data).map(ques => {
      if (data[ques]?.type === 'FILL') {
        return {
          questionId: ques,
          content: data[ques].val,
          answerId: [],
          examId: idTest,
          examResultId: location.state.data.id,
          type: data[ques].type,
        };
      }

      const answerId = Object.keys(data[ques]).filter(ans => {
        return data[ques][ans] === 1;
      });
      return {
        questionId: ques,
        answerId: answerId,
        examId: idTest,
        examResultId: location.state.data.id,
        type: data[ques].type,
      };
    });
    setLoading(true);
    const result = await FetchApi.userSubmitExam({
      id: location.state.data.id,
      examId: idTest,
      questionResultRequests: questionReq,
    });
    if (result?.statusCode === 'OK') {
      AppModalService.set({
        title: Strings.congrats,
        noFooter: true,
        children: (
          <ModalResultTest
            totalQuestion={totalQuestion}
            totalRightAnswer={result.dto.points / 10}
            totalScore={result.dto.points}
          />
        ),
      });
    }

    setLoading(false);
  };
  if (isLoading) {
    return <AppLoadingView />;
  }
  return (
    <FormProvider {...value}>
      <div className="contentTest" style={{paddingBottom: 50}}>
        <UserTestCountTime
          style={{color: '#253f8e'}}
          title={data?.dto?.title}
        />

        <QuestionTestUser questionList={data?.dto?.questions} idTest={idTest} />
        <Button color={'secondary'} onClick={value.handleSubmit(onSubmit)}>
          Submit
        </Button>
      </div>
    </FormProvider>
  );
}
