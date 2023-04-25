import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const isAuthorized = useSelector((state) => state.account.isAuthorized);
  return (
    <>
      {isAuthorized === true ? (
        <>{props.children}</>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};

export default ProtectedRoute;
