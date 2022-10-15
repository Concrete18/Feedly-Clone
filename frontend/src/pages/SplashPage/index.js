import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

// store
import { login } from "../../store/session";
// components
import LoginFormModal from "../../components/LoginFormModal";
import SignupFormModal from "../../components/SignupFormModal";

import "./splash.css";

function SplashPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  // const createDemoUser = async () => {

  //   const username = 'Doug_DemoDome'
  //   const password = 'password'
  //   return username, password
  // }

  const demoLogin = async () => {
    const username = "Doug_DemoDome";
    const password = "password";
    return dispatch(login({ credential: username, password: password }));
  };

  if (sessionUser) return <Redirect to="/collection" />;

  // TODO add more into middle of splash page so one part is not so narrow

  return (
    <>
      <div className="splash_nav">
        <img
          className="splash_logo"
          src={process.env.PUBLIC_URL + "/assets/Feedler_Logo.png"}
          alt="website logo"
        />
        <div className="nav_right">
          <LoginFormModal />
          <button className="login_button" onClick={() => demoLogin()}>
            Demo User
          </button>
          <SignupFormModal />
        </div>
      </div>
      <div className="splash_container">
        <div className="splash_desc">
          Follow all of the websites that you enjoy without having to visit each
          one
        </div>
        <p className="splash_text">
          Organize all your trusted sources in one place
        </p>
        <img
          className="feed_image"
          src={process.env.PUBLIC_URL + "/assets/Feeds.png"}
          alt="screenshot of feeds"
        />
        <p className="splash_text">Enjoy a grid view of all of your articles</p>
        <img
          className="articles_image"
          src={process.env.PUBLIC_URL + "/assets/Articles.png"}
          alt="Screenshot of articles"
        />
      </div>
      <div className="footer">
        <a
          href="https://github.com/Concrete18"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="about_logo"
            src={process.env.PUBLIC_URL + "/assets/Github_logo.png"}
            alt="github logo"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/michaelericson1/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="about_logo"
            src={process.env.PUBLIC_URL + "/assets/LinkedIn_logo.png"}
            alt="linked in logo"
          />
        </a>
      </div>
    </>
  );
}

export default SplashPage;
