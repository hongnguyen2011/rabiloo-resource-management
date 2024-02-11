import {useState} from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import {useSnackbar} from 'notistack';
import {useQueryClient} from 'react-query';
import {FetchApi} from '../../../utils';
import {Controller, useFormContext} from 'react-hook-form';

function QuestionsList({number, question, idTest}) {
  const {control, setValue, getValues} = useFormContext();
  const {content, id, type: typeQuestion} = question;
  const renderResult = () => {
    if (question.type === 'SELECT') {
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
                  control={<Radio />}
                  onChange={() => {
                    setValue(`${question.id}`, {
                      [`${item.id}`]: 1,
                      type: 'SELECT',
                    });
                  }}
                  label={<TextField defaultValue={item.content} disabled />}
                />
              </div>
            );
          })}
        </RadioGroup>
      );
    }
    if (question.type === 'MULTIPLE_SELECT') {
      return (
        <div>
          {question.answers?.map?.((item, index) => {
            return (
              <FormControlLabel
                style={{paddingTop: 10}}
                key={`${item.id}`}
                value={`${item.id}`}
                control={<Checkbox />}
                onChange={e => {
                  const answerCheckbox = getValues(`${question.id}`);
                  setValue(`${question.id}`, {
                    ...answerCheckbox,
                    [`${item.id}`]: e.target.checked ? 1 : 0,
                    type: 'MULTIPLE_SELECT',
                  });
                }}
                label={<TextField defaultValue={item.content} disabled />}
              />
            );
          })}
        </div>
      );
    }
    return (
      <TextField
        onChange={e => {
          setValue(`${question.id}`, {type: 'FILL', val: e.target.value});
        }}
      />
    );
  };

  return (
    <div
      style={{
        width: '80%',
        marginLeft: '10%',
        border: '1px solid #253f8e',
        color: '#253f8e',
        paddingBottom: 80,
      }}
      className="questionTest">
      <h4>
        Câu {number}: {content}
      </h4>
      {renderResult()}
    </div>
  );
}
export default function QuestionTestUser({questionList = [], idTest}) {
  return questionList.map((question, index) => {
    return (
      <QuestionsList
        key={`${question.id}`}
        question={question}
        number={index + 1}
        idTest={idTest}
      />
    );
  });
}
