import Header from "./Header";
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div className="App">
      <Header title="React JS Blog"/>
      <Outlet />
    </div>
  );
};

export default Layout;
