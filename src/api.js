import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import uuidv4 from 'uuid/v4';

const mock = new MockAdapter(axios, { delayResponse: 1500 });

mock.onGet('/images').reply(_ => {
  const images = [];
  for (let i = 0; i < 10; i++) {
    images.push({
      url: `https://picsum.photos/300?${new Date()}`,
      id: uuidv4(),
    });
  }
  return [200, images];
});

mock.onAny().passThrough();
