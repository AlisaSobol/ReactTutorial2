import Feed from './Feed.js';
import { useContext, useState, useEffect } from 'react';
import DataContext from './context/DataContext';

const Home = ({}) => {
  const { fetchError, isLoading, posts } = useContext(DataContext);
  const [ search, setSearch ] = useState('');
  const [ searchResults, setSearchResults ] = useState([]);

  useEffect(() => {
    const filteredPosts = posts.filter(post => 
      post.body.toLowerCase().includes(search.toLowerCase())  
      || post.title.toLowerCase().includes(search.toLowerCase())  
    );

    setSearchResults(filteredPosts);
  }, [posts, search]);

  return (
    <main>
      <div className='posts'>
        <input 
          className="search"
          type="text"
          placeholder="Search Posts"
          value={search}
          onChange={(e) => setSearch(e.target.value) }
        />
          {isLoading && <p className="statusMsg">Loading posts...</p>}  
          {!isLoading && fetchError && <p className="statusMsg">{fetchError}</p>}
          {!isLoading && !fetchError && (searchResults.length ? 
            <Feed posts={searchResults}/>
            : <p>There are no posts</p>)
          }
      </div>
    </main>
  )
}

export default Home
