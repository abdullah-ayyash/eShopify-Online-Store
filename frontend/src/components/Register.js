import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authenticate/AuthContext";


function Register({ setRegisterUserName, setfullName, setRegisterEmail, setRegisterPassword,
    registerUserName, fullName, registerEmail, registerPassword, registered, register, isLoggedIn }) {
    const navigate = useNavigate();

    const { registerMessage } = useAuth()
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, []);
    return (
        <div>
            <h2 id="register-form-heading">Sign Up for a new account</h2>
            {registered && <h2 id='register-message'>Registeration is successful.</h2>}
            <form id="register-form">
                <h3 id="registerMessage">{registerMessage}</h3>
                <label htmlFor="username">Username: </label>
                <input type='text' name='username' id='username'
                    onChange={(e) => setRegisterUserName(e.target.value)}
                    value={registerUserName}
                /><br />

                <label htmlFor="fullname">Full name: </label>
                <input type='text' name='fullname' id='fullname'
                    onChange={(e) => setfullName(e.target.value)}
                    value={fullName}
                /><br />

                <label htmlFor="email">Email: </label>
                <input type='text' name='email' id='email'
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    value={registerEmail}
                /><br />

                <label htmlFor="password">Password: </label>
                <input type='password' name='password' id='password'
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    value={registerPassword}
                /><br />
                <input type='submit' value='Register' onClick={register} />
            </form>
        </div>
    );
}

export default Register;


