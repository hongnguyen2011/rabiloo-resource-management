import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Modal from 'react-modal';
import ModalUpdateTest from './ModalUpdateTest';
import ModalRequirePassword from './ModalRequirePassword';
import {Button} from '@mui/material';
import {FetchApi} from '../../../utils';
import {useQueryClient} from 'react-query';
import moment from 'moment';
import {useSnackbar} from 'notistack';
import {useAppAccount, useAppLanguage} from '../../../hooks';

function ExamItem({exam = {}}) {
  const {Strings} = useAppLanguage();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpenModalPassword, setIsOpenModalPassword] = useState(false);
  const {enqueueSnackbar} = useSnackbar();
  const {account} = useAppAccount();
  const isAdmin = account?.roles?.[0] === 'ROLE_ADMIN';
  const updateTest = async () => {
    const newData = {
      title: document.getElementsByClassName('testName')[0].value,
      description: document.getElementsByClassName('testDescription')[0].value,
    };
    setLoading(true);
    const resultEdit = await FetchApi.editExam({id: exam.id, ...newData});
    setLoading(false);

    if (resultEdit?.statusCode === 'OK') {
      queryClient.refetchQueries('listExam');
      enqueueSnackbar('Edit test success', {variant: 'success'});
      setIsOpen(false);

      return;
    }
    enqueueSnackbar(`${resultEdit?.message}`, {
      variant: 'error',
    });
  };

  return (
    <div
      style={{
        width: '80%',
        marginLeft: '10%',
        border: '1px solid #253f8e',
        color: '#253f8e',
      }}>
      <h2>{exam.title}</h2>
      <p>
        {moment(exam.startFrom).isValid()
          ? moment(exam.startFrom).format('YYYY-MM-DD HH:mm')
          : moment().format('YYYY-MM-DD HH:mm')}
      </p>
      <p>{exam.description}</p>
      <p>Số học viên tham gia: {exam.studentsCount || 0}</p>
      <div>
        <p>{exam.status}</p>
        <div>
          <Button
            style={{padding: '8px 16px'}}
            fullWidth
            variant="contained"
            sx={{mt: 2, mb: 2}}
            onClick={async () => {
              // if (requirePassword) {
              //   // setIsOpen(true);
              //   setIsOpenModalPassword(true);
              //   return;
              // }
              if (isAdmin) {
                navigate(`/content-test?idTest=${exam.id}`, {
                  state: {data: {...exam}},
                });
                return;
              }
              const result = await FetchApi.userStartExam({
                examId: exam.id,
              });
              navigate(`/user-test?idTest=${exam.id}`, {
                state: {data: {...exam, id: result?.dto?.id}},
              });
            }}>
            {Strings.start}
          </Button>
          {isAdmin && (
            <>
              <Button
                fullWidth
                variant="contained"
                sx={{mt: 2, mb: 2}}
                onClick={() => {
                  setIsOpen(true);
                }}>
                {Strings.edit}
              </Button>
              <Button
                disabled={loading}
                onClick={async () => {
                  setLoading(true);
                  const resultDelete = await FetchApi.deleteExam({id: exam.id});
                  setLoading(false);
                  if (resultDelete?.statusCode === 'OK') {
                    queryClient.refetchQueries('listExam');
                    enqueueSnackbar('Delete test success', {
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
            </>
          )}
        </div>
      </div>
      <ModalUpdateTest
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={exam.title}
        description={exam.description}
        updateTest={updateTest}
      />
      <ModalRequirePassword
        isOpen={isOpenModalPassword}
        setIsOpen={setIsOpenModalPassword}
      />
    </div>
  );
}
function ExamList({listExam = []}) {
  return listExam.map(exam => {
    return <ExamItem key={`${exam.id}`} exam={exam} />;
  });
}

export default ExamList;
