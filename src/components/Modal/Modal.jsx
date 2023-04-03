import PropTypes from 'prop-types';
import s from './Modal.module.css';


export const Modal = ({ Image, onClick }) => {
  return (
    <>
      <div onClick={onClick} className={s.overlay}>
        <div className={s.modal}>
          <img src={Image} alt="" />
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};
