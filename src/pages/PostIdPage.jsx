import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostService from '../API/PostService'
import Loader from '../components/UI/Loader/Loader'
import { useFetching } from '../hooks/useFetching'

const PostIdPage = () => {

  const params = useParams()
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id)
    setPost(response.data)
  })
  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPostId(id)
    setComments(response.data)
  })

  useEffect(() => {
    fetchPostById(params.id)
    fetchComments(params.id)
  }, [])

  return (
    <div style={{maxWidth: '800px', margin: '0 auto'}}>
      <h4>Пользователь попал на страницу поста с ID = {params.id}</h4>
      {isLoading
        ? <Loader/>
        : <h1 style={{marginTop: '30px'}}>{post.id}. {post.title}</h1>
      }

      <h3 style={{marginTop: '24px'}}>
        Комментарии
      </h3>
      {isComLoading
        ? <Loader/>
        : <div>
          {comments.map(comm =>
            <div style={{marginTop: '16px'}} key={comm.id}>
              <h5>{comm.email}</h5>
              <div>{comm.body}</div>
            </div>
          )}
        </div>
      }
    </div>
  )
}

export default PostIdPage