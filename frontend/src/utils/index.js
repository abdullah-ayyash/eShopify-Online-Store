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
  else {
    alert('Please login first');
  }


}

// Check only if the user is logged in
export const checkCart = async (product_id, user_id) => {
  const url = `${API_ENDPOINT}/cart-check?product_id=${product_id}&user_id=${user_id}`;
  const response = await fetch(url);
  const json = response.json(response);
  return json;
}

export const getCartItems = async (user_id) => {
  const url = `${API_ENDPOINT}/cart-items?user_id=${user_id}`;
  const response = await fetch(url);
  const json = response.json(response);
  return json;
}

export const getCategoryProducts = async (category_name) => {
  const url = `${API_ENDPOINT}/category-products?category_name=${category_name}`;
  const response = await fetch(url);
  const json = response.json(response);
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
  const json = response.json(response);
  return json;
}
