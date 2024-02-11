import {useSnackbar} from 'notistack';
import {useQueryClient} from 'react-query';
import {FetchApi} from '../../../utils';
import {useAppLanguage} from '../../../hooks';

export function AddTest() {
  const {enqueueSnackbar} = useSnackbar();
  const queryClient = useQueryClient();
  const {Strings} = useAppLanguage();
  return (
    <div
      style={{
        height: 'fit-content',
        width: '80%',
        margin: '0 10%',
        border: '1px solid #253f8e',
        color: '#253f8e',
        paddingBottom: 50,
      }}
      className="addTest">
      <div>
        <div className="colTitle">
          <p>{Strings.name_test}:</p>
          <p>{Strings.desc_test}:</p>
          <p>{Strings.code_test}:</p>
        </div>
        <div className="colForm">
          <input
            style={{
              border: '1px solid #253f8e',
              height: '25px',
              width: '80%',
            }}
            type="text"
            className="testName"
          />
          <input
            style={{
              border: '1px solid #253f8e',
              height: '25px',
              width: '80%',
            }}
            type="text"
            className="testDescription"
          />
          <input
            style={{
              border: '1px solid #253f8e',
              height: '25px',
              width: '80%',
            }}
            type="text"
            className="testCode"
          />
        </div>
      </div>
      <button
        style={{
          border: '1px solid #253f8e',
          backgroundColor: '#253f8e',
          color: '#fff',
          marginRight: 50,
        }}
        onClick={async () => {
          const newTest = {
            title: document.getElementsByClassName('testName')[0].value,
            description:
              document.getElementsByClassName('testDescription')[0].value,
            code: document.getElementsByClassName('testCode')[0].value,
          };
          const resultCreate = await FetchApi.createExam({
            title: newTest.title,
            description: newTest.description,
            code: newTest.code,
          });
          if (resultCreate?.statusCode === 'OK') {
            queryClient.refetchQueries('listExam');
            enqueueSnackbar('Create test success', {variant: 'success'});
            return;
          }
          enqueueSnackbar(`${resultCreate?.message}`, {variant: 'error'});
        }}>
        Submit
      </button>
    </div>
  );
}
