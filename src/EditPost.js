import { useEffect, useContext, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import DataContext from './context/DataContext';
import api from './api/posts';
import { format } from 'date-fns';

const EditPost = () => {
  const { posts, setPosts } = useContext(DataContext);
  const [ editTitle,setEditTitle ] = useState('');
  const [ editBody,setEditBody ] = useState(''); 
  const history = useHistory();

  const { id } = useParams();
  const post= posts.find(post => post.id.toString() === id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }

  }, [post, setEditTitle, setEditBody]);

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp' );
    const postObj = {
      id,
      title: editTitle,
      datetime,
      body: editBody
    }

    try {
      const response = await api.put(`/posts/${id}`, postObj)

      setPosts(posts.map(post => post.id === id ? {...response.data} : post))
      setEditBody('');
      setEditTitle('');

      history.push('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  return (
    <main className="new-post-page"> 
      <h2>Edit Post</h2>
      <form className="new-post-form" onSubmit={(e) => e.preventDefault()} >
        {editTitle  && 
          <>
            <div>
              <label>
                <p>Title:</p>
                <input
                  type="text"
                  name="title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
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
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                  required 
                ></textarea>
              </label>
            </div>
            <button 
              className="btn success"
              onClick={() => handleEdit(post.id)}
            >Save Edit Post</button>
          </>
        }
        {!editTitle  && <p>There is no post to edit</p>}
        
      </form>
    </main>
  )
}

export default EditPost