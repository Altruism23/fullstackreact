import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../redux/user";

export default function Navbar() {
  const user = useSelector((state) => state?.user?.value);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("token")
    dispatch(setUser(null))
    navigate("/")
  }
  return (
    <div className="flex justify-between p-10 w-full h-32">
      <Link to={"/"} className="text-cyan-900 text-4xl">
        TWEETY
      </Link>
      {user && <button onClick={logout}>Logout</button>}
      {!user && (
        <div className="flex space-x-20">
          <Link to={"/login"} className="text-cyan-900 text-lg">
            LOGIN
          </Link>
          <Link to={"/register"} className="text-cyan-900 text-lg">
            REGISTER
          </Link>
        </div>
      )}
    </div>
  );
}
