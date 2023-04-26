import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotPermited from "./NotPermited";

const RoleBaseRouter = (props) => {
  const isAmdinRoute = window.location.pathname.startsWith("/admin");
  const user = useSelector((state) => state.account.user);
  const role = user.role;
  if (isAmdinRoute && role === "ADMIN") {
    return <>{props.children}</>;
  } else {
    return <NotPermited />;
  }
};
const ProtectedRoute = (props) => {
  const isAuthorized = useSelector((state) => state.account.isAuthorized);
  return (
    <>
      {isAuthorized === true ? (
        <RoleBaseRouter>{props.children}</RoleBaseRouter>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};

export default ProtectedRoute;
