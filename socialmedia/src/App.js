import NewPost from "./NewPost";
//import PostPage from "./PostPage";
import About from "./About";
import Nav from "./Nav";
import Header from "./Header";
import Missing from "./Missing";
import Footer from "./Footer";
import Home from "./Home";
import PostPage from './PostPage'
import { useEffect, useState} from "react";
import {format} from 'date-fns';
import {Routes,Route,useNavigate} from 'react-router-dom';
import api from './api/posts';
import EditPost from './EditPost';
function App() {
  const [postTitle,setPostTitle]=useState('');
  const [postBody,setPostBody]=useState('')
  const [search,setSearch]=useState('');
  const navigate=useNavigate();
  const [searchResult,setsearchResult]=useState([]);
  const [posts,setPosts]=useState([])
  const [editTitle,setEditTitle]=useState('')
  const [editBody,setEditBody]=useState('')
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');
  useEffect(()=>{
    setLoading(true)
    const fetchItems=async()=>{
      try{
        const response=await api.get('/items')
        setPosts(response.data);
      }
      catch(err){
         if(err.response){
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers);
         }
         else{
          console.log(`Error:${err.meaasge}`)
         }
         setError(err.response);
      }
      finally{
        setTimeout(()=>setLoading(false),2000);
      }
  }
  fetchItems()
  },[])
  useEffect(()=>{
    const filteredResults=posts.filter((post)=>(post.body ? post.body.toLowerCase().includes(search.toLowerCase()):("").includes(search.toLowerCase()))
    || (post.title ?(post.title).toLowerCase().includes(search.toLowerCase()):("").includes(search.toLowerCase())))
    setsearchResult(filteredResults.reverse());
  },[search,posts])
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const id=posts.length ? ((parseInt(posts[posts.length-1].id))+1).toString():'1';
    const datetime=format(new Date(),'MMMM dd,yyyy pp');
    const newPost={id,title:postTitle,datetime,body:postBody}
    try{
      const response= await api.post('/items',newPost)
      const allPosts=[...posts,response.data];
      setPosts(allPosts)
      setPostBody('')
      setPostTitle('')
      navigate('/')
    }catch(err){
      if(err.response){
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers);
       }
       else{
        console.log(`Error:${err.meaasge}`)
       }
    }
  }
  const handleDelete=async(id)=>{
    try{
      await api.delete(`/items/${id}`)
      const postList=posts.filter(post=>post.id!==id);
      setPosts(postList)
      navigate('/')
    }catch(err){
      if(err.response){
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers);
       }
       else{
        console.log(`Error:${err.meaasge}`)
       }
    }
  }
  const handleEdit=async(id)=>{
    const datetime=format(new Date(),'MMMM dd,yyyy pp');
    const updatedPost={id,title:editTitle,datetime,body:editBody}
    try{
      const response= await api.put(`/items/${id}`, updatedPost)
      setPosts(posts.map(post => post.id===id ? {...response.data} : post))
      setEditBody('')
      setEditTitle('')
      navigate('/')
    }catch(err){
      if(err.response){
        console.log(err.response.data)
        console.log(err.response.status)
        console.log(err.response.headers);
       }
       else{
        console.log(`Error:${err.meaasge}`)
       }
    }
  }
  return (
    <div className="App">
       <Header title="Post-Media"/>
       <Nav
         search={search}
         setSearch={setSearch}
       />
       <Routes> 
          <Route path="/" element={<Home 
          posts={searchResult}
          loading={loading}
          error={error}
          />}/>
          <Route path="post" element={<NewPost
          postTitle={postTitle}
          setPostBody={setPostBody}
          postBody={postBody}
          setPostTitle={setPostTitle}
          handleSubmit={handleSubmit}
          />} />
          <Route path="post/:id" element={<PostPage posts={posts} handleDelete={handleDelete}/>} />
          <Route  path="/edit/:id" element={<EditPost
          posts={posts}
          handleEdit={handleEdit}
          editBody={editBody}
          editTitle={editTitle}
          setEditBody={setEditBody}
          setEditTitle={setEditTitle}
          />}/>
           <Route path="about" element={<About/>} />
          <Route path="*" element={<Missing/>} />
       </Routes>
       <Footer/>
    </div>
  );
}

export default App;
