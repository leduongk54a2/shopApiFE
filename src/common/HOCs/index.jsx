import React, { useEffect } from "react";
import { connect } from "react-redux";

// This function is the actual HOC
const withAuthCheck = (WrappedComponent) => {
  const AuthCheck = (props) => {
    useEffect(() => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken === null) {
        window.location.replace("/login");
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
