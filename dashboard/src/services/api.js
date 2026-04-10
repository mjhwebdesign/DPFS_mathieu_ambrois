const API_URL = "http://localhost:3000/api";

// productos
export const getProducts = async (page = 1) => {
 const response = await fetch(`${API_URL}/products?page=${page}`);
 if (!response.ok) {
  throw new Error("Error: No se puede acceder a la lista de productos");
 }
 return await response.json();
};

// usuarios
export const getUsers = async () => {
 const response = await fetch(`${API_URL}/users`);
 if (!response.ok) {
  throw new Error("Error: No se puede acceder a la lista de usuarios");
 }
 return await response.json();
};
