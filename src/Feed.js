import PostPreview from "./PostPreview";

const Feed = ({posts}) => {
  return (
    <>
      {posts.map(post => (
        <PostPreview key={post.id } post={post} />
      ))}
    </>
  )
}

export default Feed