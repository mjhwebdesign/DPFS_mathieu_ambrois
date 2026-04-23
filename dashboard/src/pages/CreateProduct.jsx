import { useState, useEffect } from "react";
import { createProduct, checkAdminAccess } from "../services/api";
import { useNavigate } from "react-router-dom";
import { validateProduct } from "../validations/productsValidationsReact";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function CreateProduct() {
 const navigate = useNavigate();
 // check if admin first
 useEffect(() => {
  checkAdminAccess();
 }, []);

 const [form, setForm] = useState({
  productTitle: "",
  productDescription: "",
  productPrice: "",
  productCategory: "",
 });

 const [errors, setErrors] = useState({});

 const [portada, setPortada] = useState(null);
 const [lamina, setLamina] = useState(null);

 const [themes, setThemes] = useState([]);
 const [spaces, setSpaces] = useState([]);

 const themesList = [
  "architecture",
  "animal",
  "vintage",
  "bauhaus",
  "maps",
  "blueprints",
 ];
 const spacesList = ["office", "home", "professionals", "museum"];

 const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
 };

 const handleCheckbox = (value, list, setList) => {
  if (list.includes(value)) {
   setList(list.filter((v) => v !== value));
  } else {
   setList([...list, value]);
  }
 };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validateProduct({
   form,
   portada,
   lamina,
   isEdit: false, // => it´s create
  });

  setErrors(validationErrors);
  if (Object.keys(validationErrors).length > 0) return;

  const formData = new FormData();

  Object.keys(form).forEach((key) => formData.append(key, form[key]));
  formData.append("portada", portada);
  formData.append("lamina", lamina);

  // 🔥 CLAVE: enviar checkboxes igual que Express
  themes.forEach((t) => formData.append(t, "on"));
  spaces.forEach((s) => formData.append(s, "on"));

  try {
   await createProduct(formData);
   alert("Producto creado");
   navigate("/");
  } catch (error) {
   alert(error.message);
  }
 };

 return (
  <>
   <Navbar>
    <Container fluid>
     <Navbar.Brand
      href="http://localhost:3000/"
      target="_blank"
      className="logo-eikon"
     >
      EIK<span className="iso">[Ө]</span>N
     </Navbar.Brand>{" "}
     DASHBOARD
    </Container>
   </Navbar>

   <div>
    <h2>Crear Producto</h2>

    <form onSubmit={handleSubmit}>
     <input name="productTitle" placeholder="Título" onChange={handleChange} />
     {errors.productTitle && <p className="error">{errors.productTitle}</p>}
     <textarea
      name="productDescription"
      placeholder="Descripción"
      onChange={handleChange}
     />
     {errors.productDescription && (
      <p className="error">{errors.productDescription}</p>
     )}
     <input name="productPrice" type="number" onChange={handleChange} />
     {errors.productPrice && <p className="error">{errors.productPrice}</p>}
     <input
      name="productCategory"
      placeholder="Category ID"
      onChange={handleChange}
     />
     {errors.productCategory && (
      <p className="error">{errors.productCategory}</p>
     )}

     <h3>Themes</h3>
     {themesList.map((t) => (
      <label key={t}>
       <input
        type="checkbox"
        onChange={() => handleCheckbox(t, themes, setThemes)}
       />
       {t}
      </label>
     ))}

     <h3>Spaces</h3>
     {spacesList.map((s) => (
      <label key={s}>
       <input
        type="checkbox"
        onChange={() => handleCheckbox(s, spaces, setSpaces)}
       />
       {s}
      </label>
     ))}

     <p>Portada</p>
     <input type="file" onChange={(e) => setPortada(e.target.files[0])} />
     {errors.portada && <p className="error">{errors.portada}</p>}

     <p>Imagen secundaria</p>
     <input type="file" onChange={(e) => setLamina(e.target.files[0])} />
     {errors.lamina && <p className="error">{errors.lamina}</p>}

     <button type="submit">Crear</button>
    </form>
   </div>
  </>
 );
}

export default CreateProduct;
