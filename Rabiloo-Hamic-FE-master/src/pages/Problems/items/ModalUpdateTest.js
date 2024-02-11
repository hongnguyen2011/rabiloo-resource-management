import Modal from 'react-modal';
import {useAppLanguage} from '../../../hooks';
function ModalUpdateTest({
  isOpen,
  setIsOpen,
  title,
  description,
  idTest,
  updateTest,
}) {
  const {Strings} = useAppLanguage();
  return (
    <Modal
      className="modalUpdate"
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      contentLabel="My dialog">
      <h2 style={{color: '#253f8e'}}>Update Modal:</h2>
      <div style={{color: '#253f8e'}}>
        <div className="colTitle">
          <p>{Strings.name_test}:</p>
          <p>{Strings.desc_test}:</p>
        </div>
        <div className="colForm">
          <input
            style={{
              border: '1px solid #253f8e',
              color: '#253f8e',
              height: '25px',
            }}
            type="text"
            className="testName"
            defaultValue={title}
          />
          <input
            style={{
              border: '1px solid #253f8e',
              color: '#253f8e',
              height: '25px',
            }}
            type="text"
            className="testDescription"
            defaultValue={description}
          />
        </div>
      </div>
      <button
        style={{
          backgroundColor: '#253f8e',
          color: '#fff',
          cursor: 'pointer',
          float: 'right',
        }}
        onClick={updateTest}>
        {Strings.update_test}
      </button>
    </Modal>
  );
}

export default ModalUpdateTest;
