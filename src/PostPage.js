import { useParams, Link, useHistory } from "react-router-dom";
import { useContext } from 'react';
import DataContext from './context/DataContext';
import api from './api/posts';

const PostPage = () => {
  const { posts, setPosts }= useContext(DataContext);
  const { id } = useParams();
  const history = useHistory();

  const post = posts.find(post => post.id.toString() === id);

  const handleDelete = async (id) => {
    const postsList = posts.filter(post => post.id !== id);

    try {
      const response = await api.delete(`/posts/${id}`);

      setPosts(postsList); 
      history.push('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
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
