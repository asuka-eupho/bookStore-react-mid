import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Error403 from "../Error/403";

const RoleBase = (props) => {
    const isAdminRoute = window.location.pathname.startsWith("/admin")
    const admin = useSelector(state => state.account.user);
    const adminRole = admin?.role;
    if (isAdminRoute && adminRole === 'ADMIN') {
        return (<>{props.children}</>)
    } else {
        return (<Error403 />)
    }
}
const ProtectedRoute = (props) => {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated)
    return (
        <>
            {isAuthenticated === true ?
                <>
                    <RoleBase>{props.children}</RoleBase>
                </> : <Navigate to="/login" replace />
            }
        </>
    )
}
export default ProtectedRoute;