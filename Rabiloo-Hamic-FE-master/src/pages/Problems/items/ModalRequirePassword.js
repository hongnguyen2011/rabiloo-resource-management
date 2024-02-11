import Modal from 'react-modal';

function ModalRequirePassword({isOpen, setIsOpen}) {
  return (
    <Modal
      className="modalPassword"
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      contentLabel="My dialog">
      <h2>Nhập password:</h2>
      <input type="text" />
      <button
        onClick={() => {
          // navigate(`/content-test?idTest=${idTest}`);
        }}>
        Submit
      </button>
    </Modal>
  );
}

export default ModalRequirePassword;
