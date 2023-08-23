import Nav from './Nav';
import { Link } from "react-router-dom";
import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';
 
const Header = ({title, width}) => {


  return (
    <header>
      <h1>
        {width < 768 ? <FaMobileAlt /> 
          : width < 992 ? <FaTabletAlt />
          : <FaLaptop />
        }
        <Link to="/">{title}</Link>
      </h1> 
      <Nav />
    </header>
  )
}

export default Header
