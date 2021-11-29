import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

// store
import { login } from "../../store/session";
// components
import LoginFormModal from "../../components/LoginFormModal";
import SignupFormModal from "../../components/SignupFormModal";

function SplashPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const createDemoUser = async () => {
    
    const username = 'Doug_DemoDome'
    const password = 'password'
    return username, password
  }

  const demoLogin = async () => {
    const username = 'Doug_DemoDome'
    const password = 'password'
    return dispatch(
      login({credential: username, password: password})
    )
  }

  if (sessionUser) return <Redirect to="/collection" />;

  return (
    <>
      <div className='splash_nav'>
        <img src={process.env.PUBLIC_URL + "/assets/Feedler_Logo.png"} alt="website logo" />
        <LoginFormModal/>
        <SignupFormModal/>
        <button onClick={() => demoLogin()}>Demo User</button>
      </div>
      <div className='splash container'>
        <div>Description</div>
        <img src="" alt="screenshot of full page in use." />
        <p>Organize all your trusted sources in one place</p>
        <img src="" alt="cropped view of feeds and sources side bar" />
      </div>
      <div className='footer'></div>
    </>
  );
}

export default SplashPage;
