import { useParams, Link } from "react-router-dom";

const PostPage = ({posts, handleDelete}) => {
  const { id } = useParams();
  const post = posts.find(post => post.id.toString() === id);

  return (
    <main className="post-page">
      <article >
        {post && 
          <>
            <h2>{post.title}</h2>
            <p className="date">{post.datetime}</p>
            <p>{post.body}</p>
            <div>
              <Link className="link" to={`/edit/${post.id}`}>Edit Post</Link>
              <button className="btn danger"  onClick={() => handleDelete(post.id)}>Delete Post</button>
            </div>
          </>
        }
        {!post && 
          <>
            <h2>Post Not Found...</h2>
            <p>Well, that's disappointing back to <Link to="/"> Home page </Link></p>
          </>
        }
      </article>
    </main>
  )
}

export default PostPage
