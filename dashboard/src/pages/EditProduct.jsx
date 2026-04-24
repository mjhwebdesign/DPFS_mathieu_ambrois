import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductForEdit, updateProduct } from "../services/api";
import { validateProduct } from "../validations/productsValidationsReact";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function EditProduct() {
 const { id } = useParams();
 const navigate = useNavigate();

 const [loading, setLoading] = useState(true);

 const [form, setForm] = useState({
  productTitle: "",
  productDescription: "",
  productPrice: "",
  productCategory: "",
  office: false,
  home: false,
  professionals: false,
  museum: false,
  architecture: false,
  animal: false,
  vintage: false,
  bauhaus: false,
  maps: false,
  blueprints: false,
 });

 const [errors, setErrors] = useState({});

 const [coverPreview, setCoverPreview] = useState(null);
 const [portadaFileName, setPortadaFileName] = useState("");
 const [secondaryPreview, setSecondaryPreview] = useState(null);
 const [laminaFileName, setLaminaFileName] = useState("");

 const [coverImageFile, setCoverImageFile] = useState(null);
 const [secondaryImageFile, setSecondaryImageFile] = useState(null);

 // 🔹 Cargar producto
 useEffect(() => {
  const loadProduct = async () => {
   try {
    const res = await getProductForEdit(id);
    const data = await res.json();

    setForm({
     productTitle: data.title,
     productDescription: data.description,
     productPrice: data.price,
     productCategory: data.category_id,

     office: data.spaces.includes("office"),
     home: data.spaces.includes("home"),
     professionals: data.spaces.includes("professionals"),
     museum: data.spaces.includes("museum"),

     architecture: data.themes.includes("architecture"),
     animal: data.themes.includes("animal"),
     vintage: data.themes.includes("vintage"),
     bauhaus: data.themes.includes("bauhaus"),
     maps: data.themes.includes("maps"),
     blueprints: data.themes.includes("blueprints"),
    });

    setCoverPreview("http://localhost:3000/" + data.cover_image);
    setPortadaFileName(data.cover_image.split("/").pop());
    setSecondaryPreview("http://localhost:3000/" + data.secundary_image);
    setLaminaFileName(data.cover_image.split("/").pop());

    setLoading(false);
   } catch (err) {
    console.error(err);
   }
  };

  loadProduct();
 }, [id]);

 // cambios inputs texto/select
 const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setForm({
   ...form,
   [name]: type === "checkbox" ? checked : value,
  });
 };

 //  cambio imagen portada
 const handleCoverChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  setCoverImageFile(file);
  setCoverPreview(URL.createObjectURL(file));
  setPortadaFileName(file.name);
 };

 //  cambio imagen secundaria
 const handleSecondaryChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  setSecondaryImageFile(file);
  setSecondaryPreview(URL.createObjectURL(file));
  setLaminaFileName(file.name);
 };

 // submit
 const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validateProduct({
   form,
   portada: coverImageFile,
   lamina: secondaryImageFile,
   isEdit: true,
  });

  setErrors(validationErrors);
  if (Object.keys(validationErrors).length > 0) return;

  try {
   const fd = new FormData();

   Object.keys(form).forEach((key) => {
    fd.append(key, form[key]);
   });

   if (coverImageFile) fd.append("portada", coverImageFile);
   if (secondaryImageFile) fd.append("lamina", secondaryImageFile);

   await updateProduct(id, fd);

   alert("Producto actualizado ✔");
   navigate("/");
  } catch (err) {
   console.error(err);
   alert("Error al actualizar");
  }
 };

 if (loading) return <h2>Cargando producto...</h2>;

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
      <h1 className="glow-white">Editar producto #{id}</h1>
     </Col>
    </Row>

    <Row className="justify-content-center align-content-center">
     <Col md={6}>
      <form onSubmit={handleSubmit}>
       <Row className="create-product-form">
        <Col sm={12} className="form-group">
         <input
          name="productTitle"
          value={form.productTitle}
          className="form-control"
          onChange={handleChange}
          placeholder="Título"
         />
         {errors.productTitle && <p className="error">{errors.productTitle}</p>}
        </Col>
        <Col sm={12} className="form-group">
         <textarea
          name="productDescription"
          value={form.productDescription}
          className="form-control"
          onChange={handleChange}
          placeholder="Descripción"
         />
         {errors.productDescription && (
          <p className="error">{errors.productDescription}</p>
         )}
        </Col>
        <Col sm={12} className="form-group">
         <input
          type="number"
          name="productPrice"
          value={form.productPrice}
          className="form-control"
          onChange={handleChange}
          placeholder="Precio"
         />
         {errors.productPrice && <p className="error">{errors.productPrice}</p>}
        </Col>
        <Col sm={12} className="form-group">
         <select
          name="productCategory"
          value={form.productCategory}
          className="form-control"
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
         <p>Espacios</p>
         {["office", "home", "professionals", "museum"].map((name) => (
          <div key={name} className="form-check form-switch">
           <label className="form-check-label">
            <input
             type="checkbox"
             className="form-check-input"
             name={name}
             checked={form[name]}
             onChange={handleChange}
            />
            {name}
           </label>
          </div>
         ))}
        </Col>
        <Col sm={12} className="product-form-switch">
         <p>Temas</p>
         {[
          "architecture",
          "animal",
          "vintage",
          "bauhaus",
          "maps",
          "blueprints",
         ].map((name) => (
          <div key={name} className="form-check form-switch">
           <label className="form-check-label">
            <input
             type="checkbox"
             name={name}
             className="form-check-input"
             checked={form[name]}
             onChange={handleChange}
            />
            {name}
           </label>
          </div>
         ))}
        </Col>

        <Col sm={12} className="form-group">
         <p>Portada actual</p>
         {coverPreview && <img src={coverPreview} width="120" alt="" />}
         <label htmlFor="portada" className="form-label custom-file-upload">
          Imagen de portada de producto:
         </label>

         <span id="portada-file-name">{portadaFileName}</span>
         <input
          type="file"
          onChange={handleCoverChange}
          name="portada"
          id="portada"
          accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
         />
         {errors.portada && <p className="error">{errors.portada}</p>}
        </Col>

        <Col sm={12} className="form-group">
         <p>Imagen secundaria</p>

         {secondaryPreview && <img src={secondaryPreview} width="120" alt="" />}
         <label htmlFor="lamina" className="form-label custom-file-upload">
          Imagen secundaria de producto:
         </label>

         <span id="lamina-file-name">{laminaFileName}</span>
         <input
          type="file"
          onChange={handleSecondaryChange}
          name="lamina"
          id="lamina"
          accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
         />
         {errors.lamina && <p className="error">{errors.lamina}</p>}
        </Col>

        <Col xs={12} className="form-group">
         <button>Actualizar producto</button>
        </Col>
       </Row>
      </form>
     </Col>
    </Row>
   </Container>
  </>
 );
}
