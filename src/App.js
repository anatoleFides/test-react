import React, { useState } from 'react';

import PostList from './components/PostList';

import './styles/App.css';


function App() {

  const [posts, setPosts] = useState([
    { id: 1, title: 'Javascript 1', body: 'Description' },
    { id: 2, title: 'Javascript 2', body: 'Description' },
    { id: 3, title: 'Javascript 3', body: 'Description' }
  ])

  const [posts2, setPosts2] = useState([
    { id: 1, title: 'Pyhton 1', body: 'Description' },
    { id: 2, title: 'Pyhton 2', body: 'Description' },
    { id: 3, title: 'Pyhton 3', body: 'Description' }
  ])

  return (
    <div className='App'>
      <PostList posts={posts} title={'Посты про JS'} />
      <PostList posts={posts2} title={'Посты про Pyhton'} />

    </div >

  );
}

export default App;
