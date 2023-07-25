export const fetchSessionData = async () => {
    const data = await fetch('http://localhost:8000/auth/profile',{
      method: "GET",
      credentials: 'include'
    });
    const userData = await data.json();
    return userData;
  }

 

export const registerAccount  = async (registerUserName,fullName,registerEmail,registerPassword) =>{
    const url = 'http://localhost:8000/auth/register';
    const data = {
      username: registerUserName,
      fullName: fullName,
      email: registerEmail,
      password: registerPassword
    }
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const json = await response.json();
    return json;
}

export const accountLogin = async (loginUserName,loginPassword) =>{
    const url = 'http://localhost:8000/auth/login';
    const data = {
      username: loginUserName,
      password: loginPassword
    }
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: 'include'
    });
    const json = await response.json();
    return json;
}

export const fetchProducts = async () =>{
  const url = 'http://localhost:8000/auth/products';
  const response = await fetch(url);
  const json = await response.json();
  console.log(json);
  return json;
}
