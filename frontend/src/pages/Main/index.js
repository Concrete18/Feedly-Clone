import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

// components
import SideBar from "../../components/SideBar";
import MainContent from "../../components/MainContent";

import './main.css';


function Main() {
  const sessionUser = useSelector((state) => state.session.user);
  
  if (!sessionUser) return <Redirect to="/" />;
  
  return (
    <>
      <div className='main_page_container'>
        <SideBar/>
        <MainContent/>
      </div>
    </>
  );
}

export default Main;
