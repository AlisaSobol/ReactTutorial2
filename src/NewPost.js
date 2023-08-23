import { useContext, useState } from 'react';
import DataContext from './context/DataContext';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import api from './api/posts';

const NewPost = () => {
  const { posts, setPosts } = useContext(DataContext);
  const [ postTitle, setPostTitle ] = useState('')
  const [ postBody, setPostBody ] = useState(''); 
  const history = useHistory();

  const handleCreatePost = async (e) => {
    e.preventDefault();

    const id = posts.length ? (posts[posts.length -1].id + 1) : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp' );
    const postObj = {
      id,
      title: postTitle,
      datetime,
      body: postBody
    }

    try {
      const response = await api.post('/posts', postObj)

      setPosts([...posts, response.data]); 
      setPostTitle('');
      setPostBody('');

      history.push('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  return (
    <main className="new-post-page"> 
      <h2>New Post</h2>
      <form className="new-post-form" onSubmit={handleCreatePost}>
        <div>
          <label>
            <p>Title:</p>
            <input
              type="text"
              name="title"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              required 
            />
          </label>
        </div>
        <div>
          <label>
            <p>Post text:</p>
            <textarea 
              name="text"
              rows="10"
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)}
              required 
            ></textarea>
          </label>
        </div>
        <button className="btn success" type="submit">Create Post</button>
      </form>
    </main>
  )
}

export default NewPost
