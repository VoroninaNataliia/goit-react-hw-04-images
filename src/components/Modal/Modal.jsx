import PropTypes from 'prop-types';
import s from './Modal.module.css';

export const Modal = ({ closeModal, largeImage }) => {
  return (
    <div className={s.overlay} onClick={closeModal}>
      <div className={s.modal}>
        <img src={largeImage} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImage: PropTypes.func.isRequired,
};
