import { Link } from "react-router-dom";

const Nav = () => {
    return (
        
          <ul className="Nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/articles">Articles</Link>
            </li>
            <li>User</li>
          </ul>
    
      );
    };

export default Nav