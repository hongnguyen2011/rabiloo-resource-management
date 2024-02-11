import {
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import {useSnackbar} from 'notistack';
import {useEffect, useState} from 'react';
import {
  useFormContext,
  FormProvider,
  useForm,
  Controller,
} from 'react-hook-form';
import {useQueryClient} from 'react-query';
import {FetchApi} from '../../../utils';
import CreateQuestionUploadImage from './CreateQuestionUploadImage';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useAppLanguage} from '../../../hooks';
function RenderAnswer({typeQuestion}) {
  const {enqueueSnackbar} = useSnackbar();
  const queryClient = useQueryClient();
  const {control, setValue, getValues} = useFormContext();
  const [listAnswer, setListAnswer] = useState([1]);

  useEffect(() => {
    setValue('listAnswer', listAnswer);
  }, [listAnswer]);

  if (typeQuestion === 'SELECT') {
    return (
      <RadioGroup>
        {listAnswer.map((item, index) => {
          return (
            <div key={`${item}`}>
              <div
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 10,
                }}>
                <FormControlLabel
                  value={`${item}`}
                  control={<Radio />}
                  onChange={() => {
                    setValue(`${typeQuestion}-rightAnswer`, item);
                  }}
                  label={
                    <Controller
                      name={`${typeQuestion}-answer${item}`}
                      control={control}
                      render={({field: {onChange, value}}) => {
                        return (
                          <TextField
                            value={value || ''}
                            onChange={e => {
                              onChange(e.target.value);
                            }}
                          />
                        );
                      }}
                    />
                  }
                />
                {index !== 0 && (
                  <Button
                    onClick={() => {
                      const newArr = listAnswer.filter(
                        (i, indx) => indx !== index,
                      );
                      setListAnswer([...newArr]);
                    }}
                    startIcon={<DeleteForeverIcon />}></Button>
                )}
              </div>
            </div>
          );
        })}
        <AddCircleIcon
          onClick={() => {
            setListAnswer([...listAnswer, listAnswer.length + 1]);
          }}
          style={{paddingTop: 10}}
        />
      </RadioGroup>
    );
  }
  if (typeQuestion === 'MULTIPLE_SELECT') {
    return (
      <div>
        {listAnswer.map((item, index) => {
          return (
            <div
              key={`${item}`}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
              }}>
              <FormControlLabel
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                value={`${item}`}
                control={<Checkbox />}
                onChange={e => {
                  setValue(
                    `${typeQuestion}-rightAnswer-${item}`,
                    e.target.checked,
                  );
                }}
                label={
                  <Controller
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingTop: 10,
                    }}
                    name={`${typeQuestion}-answer${item}`}
                    control={control}
                    render={({field: {onChange, value}}) => {
                      return (
                        <TextField
                          value={value || ''}
                          onChange={e => {
                            onChange(e.target.value);
                          }}
                        />
                      );
                    }}
                  />
                }
              />
              {index !== 0 && (
                <Button
                  onClick={() => {
                    const newArr = listAnswer.filter(
                      (i, indx) => indx !== index,
                    );
                    setListAnswer([...newArr]);
                  }}
                  startIcon={<DeleteForeverIcon />}></Button>
              )}
            </div>
          );
        })}
        <AddCircleIcon
          onClick={() => {
            setListAnswer([...listAnswer, listAnswer.length + 1]);
          }}
          style={{paddingTop: 10}}
        />
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
              value={value || ''}
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

export default function CreateQuestion({idTest, setShowForm, showForm}) {
  const {enqueueSnackbar} = useSnackbar();
  const queryClient = useQueryClient();
  const {Strings} = useAppLanguage();

  const [typeQuestion, setTypeQuestion] = useState();
  const value = useForm({
    initialValue: {
      listAnswer: [1],
    },
  });
  const {getValues, control} = value;
  const listTypeQuestion = [
    {
      type: 'SELECT',
      title: Strings.one_answer,
      onChange: () => setTypeQuestion('SELECT'),
    },
    {
      type: 'MULTIPLE_SELECT',
      title: Strings.many_answer,
      onChange: () => setTypeQuestion('MULTIPLE_SELECT'),
    },
    {
      type: 'FILL',
      title: Strings.text_answer,
      onChange: () => setTypeQuestion('FILL'),
    },
  ];
  const onAddQuestion = async () => {
    const inputValue = getValues();
    console.log('inputValue', inputValue);

    let answers = [];
    if (typeQuestion === 'SELECT') {
      for (let i = 1; i < inputValue.listAnswer.length + 1; i++) {
        answers.push({
          content: inputValue[`SELECT-answer${i}`],
          isResult: inputValue[`SELECT-rightAnswer`] === i ? 1 : 0,
        });
      }
    }
    if (typeQuestion === 'MULTIPLE_SELECT') {
      for (let i = 1; i < inputValue.listAnswer.length + 1; i++) {
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
    const result = await FetchApi.createQuestion({
      type: typeQuestion,
      examId: idTest,
      content: inputValue.content,
      answers: answers,
    });
    if (result?.statusCode === 'OK') {
      value.reset();
      setShowForm(false);
      queryClient.refetchQueries(`listQuestion-${idTest}`);
      enqueueSnackbar('Create question success', {variant: 'success'});
      return;
    }
    enqueueSnackbar(`${result?.message}`, {variant: 'error'});
  };
  return (
    <div
      key={`${showForm}`}
      style={{
        width: '80%',
        marginLeft: '10%',
        border: '1px solid #253f8e',
        color: '#253f8e',
        paddingBottom: '70px',
      }}
      className="createQuestion">
      <FormProvider {...value}>
        <div>
          <CreateQuestionUploadImage />
          <div
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              display: 'flex',
            }}>
            <h4 style={{paddingRight: 20}}>{Strings.name_question}:</h4>
            <Controller
              style={{
                width: '100%',
                heightL: '25px',
                border: '1px solid #253f8e',
              }}
              control={control}
              name="content"
              render={({field: {onChange, value}}) => {
                return (
                  <TextField
                    onChange={e => {
                      onChange(e.target.value);
                    }}
                  />
                );
              }}
            />
          </div>
          {listTypeQuestion.map(item => {
            return (
              <div key={item.type}>
                <input
                  style={{
                    margin: '8px',
                  }}
                  type="radio"
                  onChange={item.onChange}
                  checked={typeQuestion === item.type}
                />
                {item.title}
              </div>
            );
          })}
          <RenderAnswer typeQuestion={typeQuestion} />
        </div>
        <button
          style={{
            border: '1px solid #253f8e',
            backgroundColor: '#253f8e',
            color: '#fff',
            marginTop: '20px',
            float: 'right',
          }}
          onClick={onAddQuestion}>
          Submit
        </button>
      </FormProvider>
    </div>
  );
}
