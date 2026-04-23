import { useState } from "react";
import { updateProduct } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function EditProductForm({ product }) {
 const navigate = useNavigate();

 // precargar valores actuales
 const [form, setForm] = useState({
  productTitle: product.title,
  productDescription: product.description,
  productPrice: product.price,
  productCategory: product.category_id,
 });

 const [portada, setPortada] = useState(null);
 const [lamina, setLamina] = useState(null);

 // checkboxes precargados
 const initialSpaces = product.spaces.map((s) => s.space);
 const initialThemes = product.themes.map((t) => t.theme);

 const [spaces, setSpaces] = useState(initialSpaces);
 const [themes, setThemes] = useState(initialThemes);

 const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
 };

 const toggleCheckbox = (value, list, setList) => {
  if (list.includes(value)) setList(list.filter((v) => v !== value));
  else setList([...list, value]);
 };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();

  // campos base
  Object.entries(form).forEach(([key, value]) => data.append(key, value));

  // checkboxes spaces/themes → igual que express
  spaces.forEach((s) => data.append(s, true));
  themes.forEach((t) => data.append(t, true));

  if (portada) data.append("portada", portada);
  if (lamina) data.append("lamina", lamina);

  try {
   await updateProduct(product.product_id, data);
   alert("Producto actualizado!");
   navigate("/");
  } catch (err) {
   alert(err.message);
  }
 };

 return (
  <form onSubmit={handleSubmit}>
   <input
    name="productTitle"
    value={form.productTitle}
    onChange={handleChange}
   />
   <textarea
    name="productDescription"
    value={form.productDescription}
    onChange={handleChange}
   />
   <input
    type="number"
    name="productPrice"
    value={form.productPrice}
    onChange={handleChange}
   />

   <select
    name="productCategory"
    value={form.productCategory}
    onChange={handleChange}
   >
    <option value="1">Poster</option>
    <option value="2">Photo</option>
    <option value="3">Postcard</option>
   </select>

   {/* SPACES */}
   <h3>Spaces</h3>
   {["office", "home", "professionals", "museum"].map((space) => (
    <label key={space}>
     <input
      type="checkbox"
      checked={spaces.includes(space)}
      onChange={() => toggleCheckbox(space, spaces, setSpaces)}
     />
     {space}
    </label>
   ))}

   {/* THEMES */}
   <h3>Themes</h3>
   {["architecture", "animal", "vintage", "bauhaus", "maps", "blueprints"].map(
    (theme) => (
     <label key={theme}>
      <input
       type="checkbox"
       checked={themes.includes(theme)}
       onChange={() => toggleCheckbox(theme, themes, setThemes)}
      />
      {theme}
     </label>
    ),
   )}

   <h3>Imágenes (opcional)</h3>
   <input type="file" onChange={(e) => setPortada(e.target.files[0])} />
   <input type="file" onChange={(e) => setLamina(e.target.files[0])} />

   <button type="submit">Actualizar producto</button>
  </form>
 );
}
