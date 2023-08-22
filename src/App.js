import Header from './Header';
import Home from './Home';
import NewPost from './NewPost';
import EditPost from './EditPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from './api/posts';

function App() {
  const [ posts, setPosts ] = useState([]);
  const [ search, setSearch ] = useState('');
  const [ searchResults, setSearchResults ] = useState([]);
  const [ postTitle, setPostTitle ] = useState('');
  const [ postBody, setPostBody ] = useState(''); 
  const [ editTitle,setEditTitle ] = useState('');
  const [ editBody,setEditBody ] = useState(''); 
  const history = useHistory();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          console.log('Error data:', err.response.data);
          console.log('Error status:', err.response.status);
          console.log('Error headers:', err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    } 

    fetchPosts();
  }, [])

  useEffect(() => {
    const filteredPosts = posts.filter(post => 
      post.body.toLowerCase().includes(search.toLowerCase())  
      || post.title.toLowerCase().includes(search.toLowerCase())  
    );

    setSearchResults(filteredPosts)
  }, [posts, search])

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
    <div className="App">
      <Header title="React JS Blog" />
      <Switch >
        
        <Route exact path="/" >
          <Home posts={searchResults} search={search} setSearch={setSearch} />
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

        <Route exact path="/edit/:id">
          <EditPost 
            posts={posts}
            handleEdit={handleEdit}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editBody={editBody}
            setEditBody={setEditBody}
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
