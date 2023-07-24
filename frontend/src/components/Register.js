import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Register({ setRegisterUserName, setRegisterEmail, setRegisterPassword,
    registerUserName, registerEmail, registerPassword, registered, register, isLoggedIn }) {
    const navigate = useNavigate();
    
    useEffect(() => {
        console.log(isLoggedIn);
        if (isLoggedIn) {
            navigate("/");
        }
    }, []);
    return (
        <div>
            {registered && <h2 id='register-message'>Registeration is successful.</h2>}
            <form>
                <label htmlFor="username">Username: </label>
                <input type='text' name='username' id='username'
                    onChange={(e) => setRegisterUserName(e.target.value)}
                    value={registerUserName}
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


