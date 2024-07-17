import React from 'react'

const NewPost = ({postTitle,setPostTitle,postBody,setPostBody,handleSubmit}) => {
  return (
    <main className='NewPost'>
      <h2>New Post</h2>
      <form onSubmit={handleSubmit} className="newPostForm">
        <label htmlFor='postTitle'>Title</label>
        <input 
          id="postTitle"
          value={postTitle}
          required
          type="text"
          onChange={(e)=>setPostTitle(e.target.value)}
        />
        <label htmlFor='postBody'>Body:</label>
        <input 
          id="postBody"
          value={postBody}
          required
          type="text"
          onChange={(e)=>setPostBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default NewPost