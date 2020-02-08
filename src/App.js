import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import logo from './logo.svg';
import './App.scss';

function App() {
  const [images, setImages] = useState([]);
  const [loaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1);

  const fetchImages = useCallback(() => {
    axios
      .get(`https://picsum.photos/v2/list?page=${page}&limit=10`)
      .then(res => {
        setImages([
          ...images,
          ...res.data.map(i => ({
            ...i,
            src: `https://picsum.photos/id/${i.id}/300`,
          })),
        ]);
        setPage(page + 1);
        setIsLoaded(true);
      });
  }, [images, page]);

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="hero is-fullheight is-bold is-info">
      <div className="hero-body">
        <div className="container">
          <div className="header content">
            <h1 className="title is-1">
              React Image Gallery with Infinite Scroll
            </h1>
          </div>

          <InfiniteScroll
            dataLength={images.length}
            next={fetchImages}
            hasMore={true}
            loader={<img src={logo} className="App-logo" alt="logo" />}
            className="image-gallery"
          >
            <div className="image-grid" style={{ marginTop: '30px' }}>
              {loaded
                ? images.map(image => (
                    <LazyLoadImage
                      key={image.id}
                      effect="blur"
                      src={image.src}
                      wrapperClassName="image-item"
                    />
                  ))
                : ''}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export default App;
