import Header from './Header';
import Home from './Home';
import NewPost from './NewPost';
import EditPost from './EditPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { Route, Switch } from 'react-router-dom';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <div className="App">
      <Header title="React JS Blog"/>

      <DataProvider>
        <Switch >
          
          <Route exact path="/" component={Home} />

          <Route exact path="/post" component={NewPost} />

          <Route exact path="/edit/:id" component={EditPost} />

          <Route path="/post/:id" component={PostPage} />

          <Route path="/about" component={About} />

          <Route path="*" component={Missing} />

        </Switch>
      </DataProvider>
    </div>
  );
}

export default App;
