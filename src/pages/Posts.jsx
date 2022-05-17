import React, { useState, useEffect, useRef } from 'react';

import PostFilter from '../components/PostFilter';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

import MyButton from '../components/UI/button/MyButton';
import MyModal from '../components/UI/modal/MyModal';
import Loader from '../components/UI/Loader/Loader';
import Pagination from '../components/UI/pagination/Pagination';
import MySelect from '../components/UI/select/MySelect';

import PostService from '../API/PostService'
import { getPageCount } from '../utils/pages'

import { usePosts } from '../hooks/usePosts';
import { useFetching } from '../hooks/useFetching';
import { useObserver } from '../hooks/useObserver';

import '../styles/App.css';

function Posts() {

  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const lastElement = useRef()

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page)

    setPosts([...posts, ...response.data])
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1)
  })

  useEffect(() => {
    fetchPosts(limit, page)
  }, [limit, page])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
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
      <PostFilter style={{margin: '0 0 20px 0'}}
        filter={filter}
        setFilter={setFilter}
      />
      {/* <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue='Количество постов на странице'
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 25, name: '25'},
          {value: -1, name: 'Показать все'}
        ]}
      /> */}
      {postError &&
        <h2>Произошла ошибка ${postError}</h2>
      }
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Посты про JS'} />
      <div ref={lastElement} style={{height: '20px', background: 'grey'}}></div>
      {isPostsLoading &&
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}><Loader /></div>
      }
      <Pagination
        page={page}
        changePage={changePage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default Posts;
