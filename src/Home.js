import Feed from './Feed.js'

const Home = ({posts}) => {
  return (
    <main>
      <div className='posts'>
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
