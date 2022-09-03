import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
const StudentProtectedRoutes = ({ component: Component, ...rest }) => {
  const { loading, isAuthenticated, student } = useSelector((state) => state.student);
  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Redirect to="/StudentLogin" />;
            }
            
            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default StudentProtectedRoutes;
