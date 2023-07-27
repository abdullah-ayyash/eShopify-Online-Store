export const fetchSessionData = async () => {
  const data = await fetch('http://localhost:8000/auth/profile', {
    method: "GET",
    credentials: 'include'
  });
  const userData = await data.json();
  return userData;
}



export const registerAccount = async (registerUserName, fullName, registerEmail, registerPassword) => {
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

export const accountLogin = async (loginUserName, loginPassword) => {
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

export const fetchProducts = async () => {
  const url = 'http://localhost:8000/auth/products';
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

export const addToCart = async (product_id, quantity, user_id) => {
  if(user_id && quantity && product_id){
    const url = 'http://localhost:8000/auth/add-to-cart';
    const data = {
      product_id,
      quantity,
      user_id
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
  else{
    alert('Please login first');
  }


}

// Check only if the user is logged in
export const checkCart = async (product_id, user_id) =>{
  const url = `http://localhost:8000/auth/cart-check?product_id=${product_id}&user_id=${user_id}`;
  const response = await fetch(url);
  const json = response.json(response);
  return json;
}

export const getCartItems = async (user_id) =>{
  const url = `http://localhost:8000/auth/cart-items?user_id=${user_id}`;
  const response = await fetch(url);
  const json = response.json(response);
  return json;
}

export const getCategoryProducts = async (category_name) =>{
  const url = `http://localhost:8000/auth/category-products?category_name=${category_name}`;
  const response = await fetch(url);
  const json = response.json(response);
  return json;
}
// Create a page for each category and have above function connected to them.
