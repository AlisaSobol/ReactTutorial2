import Nav from './Nav';
import { Link } from "react-router-dom";

const Header = ({title, search, setSearch}) => {
  return (
    <header>
      <h1><Link to="/">{title}</Link></h1> 
      <input 
        className="search"
        type="text"
        placeholder="Search Posts"
        value={search}
        onChange={(e) => setSearch(e.target.value) }
      />
      <Nav search={search} setSearch={setSearch} />
    </header>
  )
}

export default Header
