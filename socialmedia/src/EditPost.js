import { useEffect } from "react";
import { useParams,Link } from "react-router-dom";

const EditPost=({posts,handleEdit,editTitle,editBody,setEditTitle,setEditBody})=>{
    const {id}=useParams();
    const post=posts.find(post=>post.id.toString()===id)
     useEffect(()=>{
        if(post){
            setEditBody(post.body)
            setEditTitle(post.title)
        }
     },[posts,setEditTitle,setEditBody])
     return(
        <main className="NewPost">
            {editTitle && 
              <>
                <h2>Edit post</h2>
                <form className="newPostForm" onSubmit={(e)=>e.preventDefault()}>
                    <label htmlFor="postTitle">Title</label>
                    <input
                      id="postTitle"
                      required
                      type="text"
                      value={editTitle}
                      onChange={(e)=>setEditTitle(e.target.value)}
                    />
                <label htmlFor="postBody">Post:</label>
                <textarea 
                  id="postBody"
                  required
                  type="text"
                  value={editBody}
                  onChange={(e)=>setEditBody(e.target.value)}
                />
                <button type="submit" onClick={()=>handleEdit(post.id)}>Submit</button>
                </form>
              </>
            }
            {!editTitle && 
               <>
                  <h2>post not found</h2>
                  <p>well thats disappointment.</p>
                  <p>
                    <Link to='/'>Visit out homepage</Link>
                  </p>
               </>
            }
        </main>
     )
}
export default EditPost