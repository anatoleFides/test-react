import React, { useState, useMemo } from 'react';

import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';

import './styles/App.css';


function App() {

  const [posts, setPosts] = useState([
    { id: 1, title: 'zz Javascript 1', body: 'yy Description' },
    { id: 2, title: 'cc Javascript 2', body: '11 Description' },
    { id: 3, title: '22 Javascript 3', body: 'xx Description' }
  ])
  const [filter, setFilter] = useState({ sort: '', query: '' })

  const sortedPosts = useMemo(() => {
    if (filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
    } else {
      return posts
    }
  }, [filter.sort, posts])

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query))
  }, [filter.query, sortedPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className='App'>
      <PostForm create={createPost} />
      <hr style={{ margin: '15px 0' }} />
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Посты про JS'} />
    </div >

  );
}

export default App;
