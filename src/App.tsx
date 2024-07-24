import logo from './logo.svg';
import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
  useRoutes,
  BrowserRouter,
  RouteObject
} from "react-router-dom";
import './App.css';
import routes from './router'
const AppRoutes = () => {
  const myroutes = useRoutes(routes as RouteObject[])
  return myroutes
}
function App() {
  return (
      <div> {/* 确保 div 标签正确闭合 */}
        {AppRoutes()}
      </div>


  );
}

export default App;
