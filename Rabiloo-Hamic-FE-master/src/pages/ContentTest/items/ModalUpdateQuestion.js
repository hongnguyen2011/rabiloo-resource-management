import Modal from 'react-modal';
import {
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import {useSnackbar} from 'notistack';
import {useState} from 'react';
import {
  useFormContext,
  FormProvider,
  useForm,
  Controller,
} from 'react-hook-form';
import {useQueryClient} from 'react-query';
import {FetchApi} from '../../../utils';
import CreateQuestionUploadImage from './CreateQuestionUploadImage';
import {Button} from '@mui/material';
import {AppModalService} from '../../../components';
import {useAppLanguage} from '../../../hooks';

function RenderAnswer({typeQuestion, question}) {
  const {enqueueSnackbar} = useSnackbar();
  const queryClient = useQueryClient();
  const {control, setValue, getValues} = useFormContext();
  if (typeQuestion === 'SELECT') {
    return (
      <RadioGroup>
        {question.answers?.map?.((item, index) => {
          return (
            <div
              key={`${item.id}`}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
              }}>
              <FormControlLabel
                value={`${item.id}`}
                control={<Radio defaultChecked={item.isResult === 1} />}
                onChange={() => {
                  setValue(`${typeQuestion}-rightAnswer`, item);
                }}
                label={
                  <Controller
                    name={`${typeQuestion}-answer${index + 1}`}
                    control={control}
                    render={({field: {onChange, value}}) => {
                      return (
                        <TextField
                          defaultValue={item.content}
                          onChange={e => {
                            onChange(e.target.value);
                          }}
                        />
                      );
                    }}
                  />
                }
              />
            </div>
          );
        })}
      </RadioGroup>
    );
  }
  if (typeQuestion === 'MULTIPLE_SELECT') {
    return (
      <div>
        {question.answers?.map?.((item, index) => {
          return (
            <FormControlLabel
              style={{paddingTop: 10}}
              key={`${item.id}`}
              value={`${item.id}`}
              control={<Checkbox defaultChecked={item.isResult === 1} />}
              onChange={e => {
                setValue(
                  `${typeQuestion}-rightAnswer-${index + 1}`,
                  e.target.checked,
                );
              }}
              label={
                <Controller
                  name={`${typeQuestion}-answer${index + 1}`}
                  control={control}
                  render={({field: {onChange, value}}) => {
                    return (
                      <TextField
                        defaultValue={item.content}
                        onChange={e => {
                          onChange(e.target.value);
                        }}
                      />
                    );
                  }}
                />
              }
            />
          );
        })}
      </div>
    );
  }
  if (typeQuestion === 'FILL') {
    return (
      <Controller
        name={`${typeQuestion}-rightAnswer`}
        control={control}
        render={({field: {onChange, value}}) => {
          return (
            <TextField
              defaultValue={question.answers?.[0]?.content}
              onChange={e => {
                onChange(e.target.value);
              }}
            />
          );
        }}
      />
    );
  }
  return null;
}

export function ModalUpdateQuestion({question, idTest}) {
  const {Strings} = useAppLanguage();
  const {enqueueSnackbar} = useSnackbar();
  const queryClient = useQueryClient();
  const listAnswer = question.answers;
  let valueInitial;
  if (question.type === 'SELECT') {
    valueInitial = {
      [`SELECT-rightAnswer`]: listAnswer?.findIndex(i => i.isResult === 1) + 1,
    };
  } else if (question.type === 'MULTIPLE_SELECT') {
    valueInitial = {
      [`MULTIPLE_SELECT-rightAnswer-1`]: listAnswer?.[0]?.isResult,
      [`MULTIPLE_SELECT}-rightAnswer-2`]: listAnswer?.[1]?.isResult,
      [`MULTIPLE_SELECT-rightAnswer-3`]: listAnswer?.[2]?.isResult,
      [`MULTIPLE_SELECT-rightAnswer-4`]: listAnswer?.[3]?.isResult,
      [`MULTIPLE_SELECT-rightAnswer-5`]: listAnswer?.[4]?.isResult,
      [`MULTIPLE_SELECT-rightAnswer-6`]: listAnswer?.[5]?.isResult,
    };
  } else if (question.type === 'FILL') {
    valueInitial = {
      [`FILL-rightAnswer`]: listAnswer?.[0]?.content,
    };
  }
  const value = useForm({
    defaultValues: {
      content: question.content,
      [`${question.type}-answer${1}`]: listAnswer?.[0]?.content,
      [`${question.type}-answer${2}`]: listAnswer?.[1]?.content,
      [`${question.type}-answer${3}`]: listAnswer?.[2]?.content,
      [`${question.type}-answer${4}`]: listAnswer?.[3]?.content,
      [`${question.type}-answer${5}`]: listAnswer?.[4]?.content,
      [`${question.type}-answer${6}`]: listAnswer?.[5]?.content,
      ...valueInitial,
    },
  });

  const {control, getValues} = value;

  const updateQuestion = async () => {
    const inputValue = getValues();
    const typeQuestion = question.type;

    let answers = [];
    if (typeQuestion === 'SELECT') {
      for (let i = 1; i < 5; i++) {
        answers.push({
          content: inputValue[`SELECT-answer${i}`],
          isResult: inputValue[`SELECT-rightAnswer`] === i ? 1 : 0,
        });
      }
    }
    if (typeQuestion === 'MULTIPLE_SELECT') {
      for (let i = 1; i < 7; i++) {
        answers.push({
          content: inputValue[`MULTIPLE_SELECT-answer${i}`],
          isResult: inputValue[`MULTIPLE_SELECT-rightAnswer-${i}`] ? 1 : 0,
        });
      }
    }
    if (typeQuestion === 'FILL') {
      answers.push({
        content: inputValue['FILL-rightAnswer'],
        isResult: 1,
      });
    }
    const result = await FetchApi.updateQuestion({
      type: typeQuestion,
      examId: idTest,
      content: inputValue.content,
      answers: answers,
      id: question.id,
    });
    if (result?.statusCode === 'OK') {
      queryClient.refetchQueries(`listQuestion-${idTest}`);
      AppModalService.close();
      enqueueSnackbar('Update question success', {variant: 'success'});
      return;
    }
    enqueueSnackbar(`${result?.message}`, {variant: 'error'});
  };
  return (
    <FormProvider {...value}>
      <div style={{paddingTop: 30, paddingBottom: 30}}>
        <div
          style={{
            flexDirection: 'row',
            display: 'flex',
            alignItems: 'center',
          }}>
          <h4 style={{paddingRight: 10}}>{Strings.name_question}</h4>
          <Controller
            control={control}
            name="content"
            render={({field: {onChange, value}}) => {
              return (
                <TextField
                  value={value}
                  fullWidth={true}
                  onChange={e => {
                    onChange(e.target.value);
                  }}
                />
              );
            }}
          />
        </div>
        <RenderAnswer typeQuestion={question.type} question={question} />
        <Button
          fullWidth
          variant="contained"
          sx={{mt: 2, mb: 2}}
          onClick={updateQuestion}>
          {Strings.update_test}
        </Button>
      </div>
    </FormProvider>
  );
}
