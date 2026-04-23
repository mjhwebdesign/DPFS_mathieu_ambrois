const API_URL = "http://localhost:3000/api";

const fetchWithAuth = async (url, options = {}) => {
 const res = await fetch(url, {
  credentials: "include",
  ...options,
 });
 // If guest
 if (res.status === 401) {
  alert("Error: Asegurese de ser admin");
  window.location.href = "/";
  throw new Error("NOT_ADMIN");
 }

 return res;
};

// Used to checkAdmin and return 401 if needed (used in create product)
export const checkAdminAccess = async () => {
 await fetchWithAuth(`${API_URL}/products/1/edit`);
};

// productos GET
export const getProducts = async (page = 1) => {
 const res = await fetch(`${API_URL}/products?page=${page}`);
 if (!res.ok) {
  throw new Error("Error: No se puede acceder a la lista de productos");
 }
 return await res.json();
};

export const createProduct = async (formData) => {
 const res = await fetch(`${API_URL}/products`, {
  method: "POST",
  credentials: "include",
  body: formData,
 });

 const data = await res.json();

 if (!res.ok) {
  throw new Error(data.error || "Error creando producto");
 }

 return data;
};

//  producto GET By id
export const getProductById = async (id) => {
 const res = await fetchWithAuth(`${API_URL}/products/${id}`);
 if (!res.ok) throw new Error("Error al obtener producto");
 return await res.json();
};

// Producto Load detail for edit
export const getProductForEdit = async (id) => {
 return await fetchWithAuth(`${API_URL}/products/${id}/edit`);
};
//  producto UPDATE
export const updateProduct = async (id, formData) => {
 const res = await fetchWithAuth(`${API_URL}/products/${id}`, {
  method: "PUT",
  body: formData,
 });

 if (!res.ok) {
  const error = await res.json();
  throw new Error(error.message || "Error actualizando producto");
 }

 return await res.json();
};

// productos DELETE
export const deleteProduct = async (id) => {
 const res = await fetchWithAuth(`${API_URL}/products/${id}`, {
  method: "DELETE",
 });
 if (!res.ok) {
  throw new Error("Error: Asegurese de ser admin");
 }
 return await res.json();
};

// usuarios
export const getUsers = async () => {
 const response = await fetch(`${API_URL}/users`);
 if (!response.ok) {
  throw new Error("Error: No se puede acceder a la lista de usuarios");
 }
 return await response.json();
};
