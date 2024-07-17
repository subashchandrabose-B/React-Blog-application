import React from 'react'
import Feed from './Feed'
const Home = ({posts,error,loading}) => {
  return (
    <main className='Home'>
         {loading && <p className='statusMsg'>Loading posts.....</p>}
         {error &&  <p className='statusMsg'>{error}</p>}
         {!loading && !error && posts.length ? (<Feed posts={posts}/>):(<p style={{marginTop:"2rem"}}>
          NO POST TO SHOW..</p>) }
    </main>
  )
}

export default Home