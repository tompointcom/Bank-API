import argentBankLogo from "../../assets/img/argentBankLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import type { RootState } from "../../store/store";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const profile = useSelector((state: RootState) => state.auth.profile); // Assumes profile is stored under auth slice

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {token ? (
          <>
            <Link className="main-nav-item" to="#">
              <i className="fa fa-user-circle"></i>
              {profile?.firstName || ""}
            </Link>
            <button
              className="main-nav-item"
              onClick={handleLogout}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <i className="fa fa-sign-out"></i>
              Sign Out
            </button>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;