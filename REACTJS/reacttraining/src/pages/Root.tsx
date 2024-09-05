import { Link, Outlet } from "react-router-dom";
import { rootContainer, rootContent, rootLink, rootNav, rootUl } from './styles';

const Root = () => {
  return(
    <div style={rootContainer}>
      <nav style={rootNav}>
        <ul style={rootUl}>
          <li>
            <Link to="/" style={rootLink}>List Post</Link>
          </li>
        </ul>
      </nav>
      <main style={rootContent}>
        <Outlet />
      </main>
    </div>
  )
};
export default Root;
