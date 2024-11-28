import { useAuth } from "../use-auth-client";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { AuthProvider } from "../use-auth-client";

export default function Login() {
    const { isAuthenticated, identity, principal } = useAuth();
    console.log("Login Page");
    return (
        <>
        <AuthProvider>
        {isAuthenticated ? <LoggedIn /> : <LoggedOut />}
        <Footer/>
        </AuthProvider>
        </>
    );
}
