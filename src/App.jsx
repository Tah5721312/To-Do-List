import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import EditTask from "./pages/Edit-task/Edit-task";
// LEVEL2
import { useContext } from "react";
import ThemeContext from "./context/ThemeContext";
import Signin from './pages/signin/Singin';
import Signup from './pages/Signup';
import Error404 from './pages/Error404';
// import Erroe404 from './pages/Erroe404';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement:<Error404 />,
    // errorElement:<Erroe404 />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },


  {
    path: "/signup",
    element: <Signup />,
  },



  {
    path: "/About",
    element: <About />,
  },


  {
    path: "/Profile",
    element: <Profile />,
  },
  {
    path: "/Edit-task/:stringId",  //Dynamic Link
    element: <EditTask />,
  },
]);

function App() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className={`${theme}`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
