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
import {ModalUpdateQuestion} from './ModalUpdateQuestion';
import {AppModalService} from '../../../components';
import {useAppLanguage} from '../../../hooks';

function QuestionsList({number, question, idTest}) {
  const {Strings} = useAppLanguage();
  const [loading, setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const {content, id} = question;
  const renderResult = () => {
    if (question.type === 'SELECT') {
      return (
        <RadioGroup>
          {question.answers?.map?.(item => {
            return (
              <div
                key={`${item.id}`}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 10,
                  pointerEvents: 'none',
                  width: '80%',
                  marginLeft: '10%',
                  color: '#253f8e',
                }}>
                <FormControlLabel
                  value={`${item.id}`}
                  control={<Radio checked={item.isResult === 1} />}
                  label={<TextField value={item.content} />}
                />
              </div>
            );
          })}
        </RadioGroup>
      );
    }
    if (question.type === 'MULTIPLE_SELECT') {
      return (
        <div style={{pointerEvents: 'none'}}>
          {question.answers?.map?.(item => {
            return (
              <FormControlLabel
                style={{paddingTop: 10}}
                key={`${item.id}`}
                value={`${item}`}
                control={<Checkbox checked={item.isResult === 1} />}
                label={<TextField value={item.content} />}
              />
            );
          })}
        </div>
      );
    }
    return (
      <div style={{pointerEvents: 'none'}}>
        <TextField value={question.answers?.[0]?.content} />
      </div>
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
      <div
        style={{
          width: 200,
          float: 'right',
          flexDirection: 'row',
          display: 'flex',
        }}>
        <Button
          fullWidth
          variant="contained"
          sx={{mt: 2, mb: 2}}
          onClick={() => {
            AppModalService.set({
              title: 'Update Question',
              noFooter: true,
              children: (
                <ModalUpdateQuestion question={question} idTest={idTest} />
              ),
            });
          }}>
          {Strings.edit}
        </Button>
        <Button
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            const resultDelete = await FetchApi.deleteQuestion({
              questionId: id,
            });
            setLoading(false);
            if (resultDelete?.statusCode === 'OK') {
              queryClient.refetchQueries(`listQuestion-${idTest}`);
              enqueueSnackbar('Delete question success', {
                variant: 'success',
              });
              return;
            }
            enqueueSnackbar(`${resultDelete?.message}`, {
              variant: 'error',
            });
          }}
          fullWidth
          variant="contained"
          sx={{mt: 2, mb: 2}}
          style={{color: 'red'}}>
          {Strings.delete}
        </Button>
      </div>
    </div>
  );
}
export default function QuestionTest({questionList = [], idTest}) {
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
