import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../authenticate/AuthContext";

function Login({setLoginUserName, setLoginPassword, login, isLoggedIn,loginUserName, loginPassword}) {

    const navigate = useNavigate();
    const { loginMessage } = useAuth();
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/profile");
        }
    }, []);


    if(!isLoggedIn){
        return (
            <div>
                <h2 id="login-form-heading">Sign in to your account</h2>
                <form id="login-form">
                    <h3 id="loginMessage">{loginMessage}</h3>
                    <label htmlFor="login-username">Username: </label>
                    <input type='text' name='username' id='login-username'
                        onChange={(e) => setLoginUserName(e.target.value)}
                        value={loginUserName}
                    /><br />
    
                    <label htmlFor="login-password">Password: </label>
                    <input type='password' name='password' id='login-password'
                        onChange={(e) => setLoginPassword(e.target.value)}
                        value={loginPassword}
                    /><br />
                    <input type='submit' value='login' onClick={login} />
                </form>
    
                
            </div>
        );
    }


}

export default Login;
