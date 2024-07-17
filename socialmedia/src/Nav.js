import React from 'react'
import {Link} from 'react-router-dom';
const Nav = ({search,setSearch}) => {
  return (
    <nav className='Nav'>
        <form className='searchForm' onSubmit={(e)=>e.preventDefault()}>
            <label htmlFor="search">Search label</label>
            <input 
              id="search"
              type="text"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />
        </form>
        <ul>
            <li><Link to="/">HOME</Link></li>
            <li><Link to="post">POST</Link></li>
            <li><Link to="about">ABOUT</Link></li>
        </ul>
    </nav>
  )
}

export default Nav