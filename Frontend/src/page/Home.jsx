import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Page d'acceuil</h1>
      <NavLink to="/">Acceuil</NavLink>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/login">Login</NavLink>
    </div>
  );
}
