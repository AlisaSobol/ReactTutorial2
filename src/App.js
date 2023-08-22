import Header from './Header';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

function App() {
  const POSTS = [{
    id: 1,
    title: "Post title 1",
    datetime: "July 01, 2021 11:17:36 AM",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },{
    id: 2,
    title: "Post title 2",
    datetime: "July 02, 2021 10:10:35 AM",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },{
    id: 3,
    title: "Post title 3",
    datetime: "July 03, 2021 10:10:35 AM",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }];
  const [ posts, setPosts ] = useState(POSTS);
  const [ search, setSearch ] = useState('');
  const [ searchResults, setSearchResults ] = useState([]);
  const [ postTitle,setPostTitle ] = useState('');
  const [ postBody,setPostBody ] = useState(''); 
  const history = useHistory();

  useEffect(() => {
    const filteredPosts = posts.filter(post => 
      post.body.toLowerCase().includes(search.toLowerCase())  
      || post.title.toLowerCase().includes(search.toLowerCase())  
    );

    setSearchResults(filteredPosts)
  }, [posts, search])

  const handleDelete = (id) => {
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList); 
    history.push('/');
  }

  const handleCreatePost = (e) => {
    e.preventDefault();

    const id = posts.length ? (posts[posts.length -1].id + 1) : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp' );
    const postObj = {
      id,
      title: postTitle,
      datetime,
      body: postBody
    }

    setPosts([...posts, postObj]); 
    setPostTitle('');
    setPostBody('');
    history.push('/');
  }

  return (
    <div className="App">
      <Header title="React JS Blog" search={search} setSearch={setSearch}/>
      <Switch >
        
        <Route exact path="/" >
          <Home posts={searchResults} />
        </Route>

        <Route exact path="/post">
          <NewPost 
            handleCreatePost={handleCreatePost}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />
        </Route>

        <Route path="/post/:id">
          <PostPage posts={posts} handleDelete={handleDelete}/>
        </Route>

        <Route path="/about" component={About} />

        <Route path="*" component={Missing} />

      </Switch>
    </div>
  );
}

export default App;
