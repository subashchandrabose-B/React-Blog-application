import React from 'react'
import { useParams,Link } from 'react-router-dom'

const PostPage = ({posts,handleDelete}) => {
  const {id}=useParams()
  const post=posts.find(post=>(post.id).toString()===id);
  return (
    <main className="PostPage">
      <article className="post">
        {post && 
         <>
           <h2>{post.title}</h2>
           <p className='postDate'>{post.datetime}</p>
           <p className="postBody">{post.body}</p>
           <button onClick={()=>{handleDelete(post.id)}}>Delete</button>
           <Link to={`/edit/${post.id}`} ><button className='editButton'>
            EDIT</button></Link>
         </>
        }
        {!post &&
          <>
            <h2>Page not found</h2>
            <p>Well Go to the home page</p>
          </>
        }
      </article>
    </main>
  )
}

export default PostPage