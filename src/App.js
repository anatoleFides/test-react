import React, { useState, useEffect } from 'react';

import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';

import MyButton from './components/UI/button/MyButton';
import MyModal from './components/UI/modal/MyModal';
import Loader from './components/UI/Loader/Loader';

import PostService from './API/PostService'

import { usePosts } from './hooks/usePosts';
import { useFetching } from './hooks/useFetching';

import './styles/App.css';

function App() {

  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll()
    setPosts(response.data)
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className='App'>
      <MyButton
        style={{ margin: '24px 0' }}
        onClick={() => setModal(true)}
      >
        Создать пользователя
      </MyButton>
      <MyModal
        visible={modal}
        setVisible={setModal}
      >
        <PostForm create={createPost} />
      </MyModal>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      {postError &&
        <h2>Произошла ошибка ${postError}</h2>
      }
      {isPostsLoading
        ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}><Loader /></div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Посты про JS'} />
      }

    </div >

  );
}

export default App;
