import Feed from './Feed.js'

const Home = ({posts, search, setSearch}) => {
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
        { posts.length ? (
          <Feed posts={posts}/>
        ) : (
          <p>There are no posts</p>
        ) }
      </div>
    </main>
  )
}

export default Home
