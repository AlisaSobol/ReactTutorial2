
const NewPost = ({
  handleCreatePost, 
  postTitle, 
  setPostTitle, 
  postBody, 
  setPostBody
}) => {
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
