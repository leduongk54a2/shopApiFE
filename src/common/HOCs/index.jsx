import React, { useEffect } from "react";
import { connect } from "react-redux";
import ROUTES from "../../routes/routes";
import { useNavigate } from "react-router-dom";

// This function is the actual HOC
const withAuthCheck = (WrappedComponent, roles) => {
  const AuthCheck = (props) => {
    const history = useNavigate();
    useEffect(() => {
      const accessToken = localStorage.getItem("accessToken");
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (accessToken === null) {
        window.location.replace("/login");
      }
      if (!roles.includes(userInfo.role)) {
        history(ROUTES.PAGE403);
      }
      window.addEventListener("storage", () => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken === null) {
          window.location.replace("/login");
        }
      });
    }, []);

    // Render the original component with the props passed down
    return <WrappedComponent {...props} />;
  };

  /**
   * mapStateToProps
   * @returns
   */
  const mapStateToProps = (state) => {
    return { loading: state.app.loading };
  };
  return connect(mapStateToProps)(React.memo(AuthCheck));
};

export default withAuthCheck;
