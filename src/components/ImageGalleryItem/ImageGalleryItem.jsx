import s from './ImageGalleryItem.module.css';
import { FallingLines } from 'react-loader-spinner';
import PropTypes from 'prop-types';

export const Item = ({ images, onClick, Loader }) => {
  return (
    <>
      {images.map(({ id, webformatURL }) => (
        <li onClick={onClick} className={s.item} key={id} id={id}>
          {Loader ? (
            <FallingLines
              color="#4fa94d"
              width="100"
              visible={true}
              ariaLabel="falling-lines-loading"
            />
          ) : (
            <img className={s.image} src={webformatURL} alt="" />
          )}
        </li>
      ))}
    </>
  );
};

Item.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
  Loader: PropTypes.bool.isRequired,
};
