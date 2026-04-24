import { useState, useEffect } from "react";
import { createProduct } from "../services/api";
import { useNavigate } from "react-router-dom";
import { validateProduct } from "../validations/productsValidationsReact";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function CreateProduct() {
 const navigate = useNavigate();

 const [form, setForm] = useState({
  productTitle: "",
  productDescription: "",
  productPrice: "",
  productCategory: "",
 });

 const [errors, setErrors] = useState({});
 const [portada, setPortada] = useState(null);
 const [portadaFileName, setPortadaFileName] = useState(
  "Ninguna imagen seleccionada",
 );
 const handlePortadaChange = (e) => {
  const file = e.target.files[0];
  setPortada(file);
  setPortadaFileName(file ? file.name : "Ninguna imagen seleccionada");
 };
 const [lamina, setLamina] = useState(null);
 const [laminaFileName, setLaminaFileName] = useState(
  "Ninguna imagen seleccionada",
 );
 const handleLaminaChange = (e) => {
  const file = e.target.files[0];
  setLamina(file);
  setLaminaFileName(file ? file.name : "Ninguna imagen seleccionada");
 };

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

  // enviar checkboxes mismo formato que en Express
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

   <Container>
    <Row>
     <Col className="text-center mb-3">
      <h1 className="glow-white">Crear Producto</h1>
     </Col>
    </Row>
    <Row className="justify-content-center align-content-center">
     <Col md={6}>
      <form onSubmit={handleSubmit}>
       <Row className="create-product-form">
        <Col sm={12} className="form-group">
         <input
          name="productTitle"
          placeholder="Título"
          className="form-control"
          onChange={handleChange}
         />
         {errors.productTitle && <p className="error">{errors.productTitle}</p>}
        </Col>
        <Col sm={12} className="form-group">
         <textarea
          name="productDescription"
          placeholder="Descripción"
          className="form-control"
          onChange={handleChange}
         />
         {errors.productDescription && (
          <p className="error">{errors.productDescription}</p>
         )}
        </Col>
        <Col sm={12} className="form-group">
         <input
          name="productPrice"
          type="number"
          className="form-control"
          placeholder="Precio ARS $"
          onChange={handleChange}
         />
         {errors.productPrice && <p className="error">{errors.productPrice}</p>}
        </Col>
        <Col sm={12} className="form-group">
         <select
          name="productCategory"
          className="form-control"
          value={form.productCategory}
          onChange={handleChange}
         >
          <option value="">Categoría</option>
          <option value="1">Poster</option>
          <option value="2">Photo</option>
          <option value="3">Postcard</option>
         </select>
         {errors.productCategory && (
          <p className="error">{errors.productCategory}</p>
         )}
        </Col>
        <Col sm={12} className="product-form-switch">
         <p>Themes</p>

         {themesList.map((t) => (
          <div key={t} className="form-check form-switch">
           <label className="form-check-label">
            <input
             type="checkbox"
             className="form-check-input"
             onChange={() => handleCheckbox(t, themes, setThemes)}
            />
            {t}
           </label>
          </div>
         ))}
        </Col>
        <Col sm={12} className="product-form-switch">
         <p>Spaces</p>

         {spacesList.map((s) => (
          <div key={s} className="form-check form-switch">
           <label className="form-check-label">
            <input
             type="checkbox"
             className="form-check-input"
             onChange={() => handleCheckbox(s, spaces, setSpaces)}
            />
            {s}
           </label>
          </div>
         ))}
        </Col>

        <Col sm={12} className="form-group">
         <p>Portada</p>

         <label htmlFor="portada" className="form-label custom-file-upload">
          Imagen de portada de producto:
         </label>
         <span id="portada-file-name">{portadaFileName}</span>

         <input
          type="file"
          onChange={handlePortadaChange}
          className="form-control product-images"
          name="portada"
          id="portada"
          accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
         />
         {errors.portada && <p className="error">{errors.portada}</p>}
        </Col>

        <Col sm={12} className="form-group">
         <p>Imagen secundaria</p>
         <label htmlFor="lamina" className="form-label custom-file-upload">
          Imagen de lamina del producto:
         </label>
         <span id="lamina-file-name">{laminaFileName}</span>
         <input
          type="file"
          onChange={handleLaminaChange}
          className="form-control product-images "
          name="lamina"
          id="lamina"
          accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
         />
         {errors.lamina && <p className="error">{errors.lamina}</p>}
        </Col>

        <Col xs={12} className="form-group">
         <button type="submit" className="w-100 btn btn-sm eikon-btn">
          Crear
         </button>
        </Col>
       </Row>
      </form>
     </Col>
    </Row>
   </Container>
  </>
 );
}

export default CreateProduct;
