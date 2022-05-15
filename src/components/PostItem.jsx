import React from "react";

import MyButton from './UI/button/MyButton';

const PostItem = (props) => {

  return (
    <div className="App">
      <div className='post'>
        <div className='post__content'>
          <strong>{props.post.id}. {props.post.title}</strong>
          <div className='post__text'>
            {props.post.body}
          </div>
        </div>
        <div className='post__btns'>
          <MyButton onClick={() => props.remove(props.post)}>
            Удалить
          </MyButton>
        </div>
      </div>
    </div >
  )
}

export default PostItem