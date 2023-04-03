import { Component } from 'react';
import axios from 'axios';
import { SearchBar } from './Searchbar/Searchbar';
import { Gallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { LoadMoreBtn } from './Button/Button';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const MY_KEY = '34195796-6d8ef92c294f12e249c52e8bf';

export class App extends Component {
  state = {
    images: [],
    modalImg: {},
    search: '',
    isLoad: false,
    clickOnLoadMore: false,
    ModalOpen: false,
    submited: false,
    PerPage: 12,
    Page: 1,
  };

  async componentDidUpdate(__, prevState) {
    if (this.state.submited && prevState.submited !== this.state.submited)
      try {
        this.setState({ isLoad: true });
        const promise = await axios.get(
          `?key=${MY_KEY}&per_page=12&page=${this.state.Page}&q=${this.state.search}`
        );
        const data = promise.data;
        this.setState({ images: data.hits });
        this.setState({ isLoad: false });
        this.setState({ submited: false });
        return;
      } catch (error) {
        return alert('Something wrong');
      }
    else if (
      this.state.Page > 1 &&
      !this.state.submited &&
      !this.state.isLoad &&
      prevState.Page !== this.state.Page
    ) {
      try {
        this.setState({ isLoad: true });
        const promise = await axios.get(
          `?key=${MY_KEY}&per_page=12&page=${this.state.Page}&q=${this.state.search}`
        );
        const data = promise.data;
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
        }));
        this.setState({ isLoad: false });
      } catch (error) {
        alert('Something wrong');
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleReadInput = e => {
    this.setState({ search: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ Page: 1 });
    this.setState({ submited: true });
    this.setState({ clickOnLoadMore: true });
  };

  handleClickImg = e => {
    if (e.currentTarget.nodeName === 'LI' || e.target.nodeName === 'DIV') {
      this.setState(state => ({ ModalOpen: !state.ModalOpen }));
      const imageId = e.currentTarget.id;
      const image = this.state.images.find(
        image => image.id === Number(imageId)
      );
      this.setState({ modalImg: { ...image } });
      window.addEventListener('keydown', this.handleKeyDown);
    }
  };
  handleKeyDown = e => {
    if (e.keyCode === 27) {
      this.setState({ ModalOpen: false });
    }
  };
  handleLoadMore = async () => {
    this.setState(prev => ({ Page: prev.Page + 1 }));
  };
  render() {
    const { isLoad } = this.state;
    const { largeImageURL } = this.state.modalImg;

    return (
      <>
        <SearchBar
          onSubmit={this.handleSubmit}
          onChange={this.handleReadInput}
        />
        <Gallery
          images={this.state.images}
          onClick={this.handleClickImg}
          Loader={isLoad}
        />

        {this.state.clickOnLoadMore ? (
          <LoadMoreBtn onClick={this.handleLoadMore} />
        ) : (
          ''
        )}

        {this.state.ModalOpen ? (
          <Modal Image={largeImageURL} onClick={this.handleClickImg} />
        ) : (
          ''
        )}
      </>
    );
  }
}
