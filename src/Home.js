import Feed from './Feed.js'

const Home = ({posts, search, setSearch, fetchError, isLoading}) => {
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
          {!isLoading && !fetchError && (posts.length ? 
            <Feed posts={posts}/>
            : <p>There are no posts</p>)
          }
      </div>
    </main>
  )
}

export default Home
