import { API_ENDPOINT } from "./endPoint";

export const fetchSessionData = async () => {
  const data = await fetch(`${API_ENDPOINT}/profile`, {
    method: "GET",
    credentials: 'include'
  });
  const userData = await data.json();
  return userData;
}



export const registerAccount = async (registerUserName, fullName, registerEmail, registerPassword) => {
  const url = `${API_ENDPOINT}/register`;
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
  console.log(json);
  return json;
}

export const changeUserInfo = async (email,password,fullname,user_id) =>{
  const url = `${API_ENDPOINT}/update-user-info`
  const data = {
    email,
    password,
    fullname,
    user_id
  }
  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const json = await response.json();
  return json;
}

export const accountLogin = async (loginUserName, loginPassword) => {
  const url = `${API_ENDPOINT}/login`;
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
  const url = `${API_ENDPOINT}/products`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

export const addToCart = async (product_id, quantity, user_id) => {
  if (user_id && quantity && product_id) {
    const url = `${API_ENDPOINT}/add-to-cart`;
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
}

// Check only if the user is logged in
export const checkCart = async (product_id, user_id) => {
  const url = `${API_ENDPOINT}/cart-check?product_id=${product_id}&user_id=${user_id}`;
  const response = await fetch(url);
  const json = response.json();
  return json;
}

export const getCartItems = async (user_id) => {
  const url = `${API_ENDPOINT}/cart-items?user_id=${user_id}`;
  const response = await fetch(url);
  const json = response.json();
  return json;
}

export const getCategoryProducts = async (category_name) => {
  const url = `${API_ENDPOINT}/category-products?category_name=${category_name}`;
  const response = await fetch(url);
  const json = response.json();
  return json;
}

export const capitalizeFirstLetter = (word) => {
  const firstLetter = word.charAt(0);
  const firstLetterCap = firstLetter.toUpperCase();
  const remainingLetters = word.slice(1);
  const capitalizedWord = firstLetterCap + remainingLetters;
  return capitalizedWord;
}

export const deleteCartItem = async (user_id, item_id) => {
  const url = `${API_ENDPOINT}/cart-item?user_id=${user_id}&item_id=${item_id}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: 'include'
  });
  if (!response.ok) {
    // Handle response error
    throw new Error('Network response was not ok');
  }
  const json = response.json();
  return json;
}

export const sumTotal = (cartData) =>{
  let total = 0;
  for (const item of cartData) {
    const itemPrice = Number(item.price) * Number(item.quantity);
    total += itemPrice; 
  }
  return total;
}

export const updateItemQuantity = async (user_id,item_id,quantity) =>{
  const url = `${API_ENDPOINT}/cart-quantity`;
  const data = {
    user_id,
    item_id,
    quantity
  }
  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: 'include'
  });
  const json = await response.json();
  return json;
}

export const getAddress = async (user_id) =>{
  const url = `${API_ENDPOINT}/get-address?user_id=${user_id}`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

export const addNewAddress = async (addressObj) =>{
  const url = `${API_ENDPOINT}/add-address`;
  const data = {
    ...addressObj
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
    credentials: 'include'
  });
  const json = await response.json();
  return json;
}

export const createShippingAddress = (addressObj) =>{
  const { address,city,country,provance,postal_code  } = addressObj;
  const textAddress =  address + ' '  + city + ' ' + provance + ', ' + country + ' ' + postal_code;
  return textAddress;
}

export const addNewOrder = async (user_id, shipping_address,cartData) =>{
  const url = `${API_ENDPOINT}/add-new-order`;
  const data = {
    user_id, 
    shipping_address,
    cartData
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
    credentials: 'include'
  });
  const json = await response.json()
  return json;
}

export const getOrders = async (user_id) =>{
  const url = `${API_ENDPOINT}/get-orders?user_id=${user_id}`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
}