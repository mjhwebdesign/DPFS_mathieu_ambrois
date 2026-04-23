import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductForEdit, updateProduct } from "../services/api";
import { validateProduct } from "../validations/productsValidationsReact";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

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
 const [secondaryPreview, setSecondaryPreview] = useState(null);

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
    setSecondaryPreview("http://localhost:3000/" + data.secundary_image);

    setLoading(false);
   } catch (err) {
    console.error(err);
   }
  };

  loadProduct();
 }, [id]);

 // 🔹 cambios inputs texto/select
 const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setForm({
   ...form,
   [name]: type === "checkbox" ? checked : value,
  });
 };

 // 🔹 cambio imagen portada
 const handleCoverChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  setCoverImageFile(file);
  setCoverPreview(URL.createObjectURL(file));
 };

 // 🔹 cambio imagen secundaria
 const handleSecondaryChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  setSecondaryImageFile(file);
  setSecondaryPreview(URL.createObjectURL(file));
 };

 // 🔹 submit
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

   <div className="container">
    <h1>Editar producto #{id}</h1>

    <form onSubmit={handleSubmit}>
     <input
      name="productTitle"
      value={form.productTitle}
      onChange={handleChange}
      placeholder="Título"
     />
     {errors.productTitle && <p className="error">{errors.productTitle}</p>}

     <textarea
      name="productDescription"
      value={form.productDescription}
      onChange={handleChange}
      placeholder="Descripción"
     />
     {errors.productDescription && (
      <p className="error">{errors.productDescription}</p>
     )}

     <input
      type="number"
      name="productPrice"
      value={form.productPrice}
      onChange={handleChange}
      placeholder="Precio"
     />
     {errors.productPrice && <p className="error">{errors.productPrice}</p>}

     <select
      name="productCategory"
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

     <h3>Espacios</h3>
     {["office", "home", "professionals", "museum"].map((name) => (
      <label key={name}>
       <input
        type="checkbox"
        name={name}
        checked={form[name]}
        onChange={handleChange}
       />
       {name}
      </label>
     ))}

     <h3>Temas</h3>
     {[
      "architecture",
      "animal",
      "vintage",
      "bauhaus",
      "maps",
      "blueprints",
     ].map((name) => (
      <label key={name}>
       <input
        type="checkbox"
        name={name}
        checked={form[name]}
        onChange={handleChange}
       />
       {name}
      </label>
     ))}

     <h3>Portada actual</h3>
     {coverPreview && <img src={coverPreview} width="120" alt="" />}
     <input type="file" onChange={handleCoverChange} />
     {errors.portada && <p className="error">{errors.portada}</p>}

     <h3>Imagen secundaria</h3>
     {secondaryPreview && <img src={secondaryPreview} width="120" alt="" />}
     <input type="file" onChange={handleSecondaryChange} />
     {errors.lamina && <p className="error">{errors.lamina}</p>}

     <button>Actualizar producto</button>
    </form>
   </div>
  </>
 );
}
