import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { SearchBar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const MY_KEY = '34195796-6d8ef92c294f12e249c52e8bf';

export const App = () => {
  const [pictures, setPictures] = useState([]);
  const [queryImg, setQueryImg] = useState('');
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [page, setPage] = useState(1);
  const [loadMoreClick, setLoadMoreClick] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isBtnActive, setIsBtnActive] = useState(false);
  const [loader, setLoader] = useState(false);
  const [modalImage, setModalImage] = useState('');

  useEffect(() => {
    const fetchImg = async () => {
      try {
        if (isFormSubmit) {
          const response = await axios.get(
            `?q=${queryImg}&page=1&key=${MY_KEY}&image_type=photo&orientation=horizontal&per_page=12`
          );
          setPictures(response.data.hits);
          setIsFormSubmit(false);
          setIsBtnActive(true);
          setLoader(false);
          setPage(1);

          if (response.data.hits.length < 12) {
            setIsBtnActive(false);
          }
        }

        if (loadMoreClick) {
          const response = await axios.get(
            `?q=${queryImg}&page=${page}&key=${MY_KEY}&image_type=photo&orientation=horizontal&per_page=12`
          );
          setPictures([...pictures, ...response.data.hits]);
          setLoadMoreClick(false);
          setLoader(false);

          if (response.data.hits.length < 12) {
            setIsBtnActive(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchImg();
  }, [isFormSubmit, queryImg, loadMoreClick, page, pictures]);

  useEffect(() => window.removeEventListener('keydown', handleModalClose));

  const handleSubmitClick = e => {
    e.preventDefault();
    const inputValue = e.target.children[1].value;
    setQueryImg(inputValue);
    setIsFormSubmit(true);
    setLoader(true);
  };

  const handleBtnLoadMoreClick = () => {
    setLoadMoreClick(true);
    setPage(page + 1);
    setLoader(true);
  };

  const handleModalOpen = e => {
    setModalOpen(!modalOpen);

    const imgId = e.currentTarget.attributes.id.value;
    const largeImage = setPictures(
      pictures.find(picture => picture.id === +imgId)
    );
    setModalImage(largeImage.largeImageURL);

    window.addEventListener('keydown', handleModalClose);
  };

  const handleModalClose = e => {
    if (e.key === 'Escape') {
      setModalOpen(false);
    }
    window.removeEventListener('keydown', handleModalClose);
  };

  const closeModalWindow = e => {
    if (e.target === e.currentTarget) {
      setModalOpen(false);
    }
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmitClick} />
      <ImageGallery pictures={pictures} onClick={handleModalOpen} />
      {loader && <Loader />}
      {isBtnActive && <Button onClick={handleBtnLoadMoreClick} />}
      {modalOpen && (
        <Modal closeModal={closeModalWindow} largeImage={modalImage} />
      )}
    </div>
  );
};
