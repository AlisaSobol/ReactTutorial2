import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const EditPost = ({
  posts, 
  handleEdit, 
  editBody, 
  setEditBody, 
  editTitle, 
  setEditTitle
}) => {
  const { id } = useParams();
  const post= posts.find(post => post.id.toString() === id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }

  }, [post, setEditTitle, setEditBody])

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