import { useParams, Link, useHistory } from "react-router-dom";
import { useStoreActions, useStoreState } from 'easy-peasy';

const PostPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const deletePost = useStoreActions(actions => actions.deletePost);
  const getPostById = useStoreState(state => state.getPostById);
  const post = getPostById(id);

  const handleDelete = id => {
    deletePost(id);
    history.push('/')
  }

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
