

function Login({setLoginUserName, setLoginPassword, login, isLoggedIn,loginUserName, loginPassword}) {
    if(!isLoggedIn){
        return (
            <div>
                <form>
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
    return (
        isLoggedIn && <h2>This is a persistant login session</h2>
    )

}

export default Login;
