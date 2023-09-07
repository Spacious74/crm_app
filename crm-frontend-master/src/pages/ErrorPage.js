import { NavLink} from "react-router-dom";
import { Button } from "react-bootstrap";
import errorImage from '../assets/error.jpg';

const ErrorPage = () => {
    return (
      <div className="container">
        <div>
          <h2>404</h2>
          <h3>UH OH! You're lost.</h3>
          <p>
            The page you are looking for does not exist. How you got here is a
            mystery. But you can click the button below to go back to the
            homepage.
          </p>
          <img src={errorImage} alt="Error" /> {/* Add the image element with the src attribute set to the errorImage variable */}
          <NavLink to="/">
            <Button>Go Back to Home</Button>
          </NavLink>
        </div>
      </div>
    );
  };
  
  export default ErrorPage;