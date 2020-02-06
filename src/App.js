import React from 'react';
import axios from 'axios';
import './App.scss';

const UnsplashImage = ({ url, key }) => (
  <div className="image-item" key={key}>
    <img src={url} alt="myimage" />
  </div>
);

function App() {
  const [images, setImages] = React.useState([]);
  const [loaded, setIsLoaded] = React.useState(false);

  const fetchImages = (count = 10) => {
    const apiRoot = 'https://api.unsplash.com';
    const accessKey =
      'a22f61e98da4efa25d8860e77a91a596867dd335ecdf7feb12e086943db9565a';

    axios
      .get(`${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`)
      .then(res => {
        setImages([...images, ...res.data]);
        setIsLoaded(true);

        console.log(images);
      });
  };

  React.useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
    <div className="hero is-fullheight is-bold is-info">
      <div className="hero-body">
        <div className="container">
          <div className="header content">
            <h1 className="title is-1">
              React Image Gallery with Infinite Scroll
            </h1>
            <h2 className="subtitle is-6">by atopdev</h2>
          </div>

          <div className="image-grid" style={{ marginTop: '30px' }}>
            {loaded
              ? images.map((image, index) => (
                  <UnsplashImage url={image.urls.regular} key={index} />
                ))
              : ''}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
