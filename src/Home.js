import Feed from './Feed.js';
import { useState, useEffect } from 'react';
import { useStoreState } from 'easy-peasy';

const Home = ({fetchError, isLoading}) => {
  const [ search, setSearch ] = useState('');
  const [ searchResults, setSearchResults ] = useState([]);
  const countPosts = useStoreState(state => state.postCount);
  const posts = useStoreState(state => state.posts);

  useEffect(() => {
    const filteredPosts = posts.filter(post => 
      post.body.toLowerCase().includes(search.toLowerCase())  
      || post.title.toLowerCase().includes(search.toLowerCase())  
    );

    setSearchResults(filteredPosts);
  }, [posts, search, setSearchResults]);

  return (
    <main>
      <div className='posts'>
        <h4>There are {countPosts} posts</h4><br />
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
            <Feed posts={searchResults} />
            : <p>There are no posts</p>)
          }
      </div>
    </main>
  )
}

export default Home
