import React, { useEffect, useLayoutEffect } from "react";
import { connect, useDispatch } from "react-redux";
import ROUTES from "../../../routes/routes";
import { useNavigate } from "react-router-dom";
import { getAllProduct } from "../../../redux/actions/product";
import { getAllCategory } from "../../../redux/actions/category";
import HeaderUser from "../../../view/UserView/Header";
import UserFooter from "../../../view/UserView/Footer";
import "./index.less";
import { getAllSupplier } from "../../../redux/actions/supplier";

// This function is the actual HOC
const withViewLayout = (WrappedComponent) => {
  const ViewLayout = (props) => {
    const dispatch = useDispatch();
    useLayoutEffect(() => {
      const fetchProduct = dispatch(getAllProduct());
      const fetchCategory = dispatch(getAllCategory());
      const fetchSupplier = dispatch(getAllSupplier());

      Promise.all([fetchProduct, fetchCategory, fetchSupplier]);
    }, []);

    // Render the original component with the props passed down
    return (
      <div>
        <HeaderUser />
        <div className="content-wrapper max-h-screen overflow-y-auto">
          <WrappedComponent {...props} />;
          <UserFooter />
        </div>
      </div>
    );
  };

  /**
   * mapStateToProps
   * @returns
   */
  const mapStateToProps = (state) => {
    return { loading: state.app.loading };
  };
  return connect(mapStateToProps)(React.memo(ViewLayout));
};

export default withViewLayout;
