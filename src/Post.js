import { Link } from "react-router-dom";

const Post = ({post}) => {
  return (
    <article>
      <h2>
        <Link to={`/post/${post.id}`}>
          {post.title}
        </Link>
      </h2>
      <p className="date">{post.datetime}</p>
      <p>{post.body.length <= 150 ? post.body : `${post.body.slice(0, 150)}...`}</p>

    </article>
  )
}

export default Post