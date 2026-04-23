import validator from "validator";

const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp"];

/* =========================
   IMAGE VALIDATION
========================= */
const validateImage = (file, fieldName, errors, isEdit) => {
 // En CREATE → obligatoria
 if (!isEdit && !file) {
  errors[fieldName] = "Debe subir una imagen";
  return;
 }

 // If file exists, then validate extension
 if (file) {
  const extension = file.name.split(".").pop().toLowerCase();

  if (!allowedExtensions.includes(extension)) {
   errors[fieldName] = "Formatos permitidos: JPG, JPEG, PNG, GIF, WEBP";
  }
 }
};

/* =========================
   MAIN PRODUCT VALIDATION
========================= */
export const validateProduct = ({ form, portada, lamina, isEdit = false }) => {
 const errors = {};

 // TITLE
 if (validator.isEmpty(form.productTitle?.trim() || "")) {
  errors.productTitle = "El titulo es obligatorio";
 } else if (!validator.isLength(form.productTitle.trim(), { min: 5 })) {
  errors.productTitle = "Debe tener al menos 5 caracteres";
 }

 // DESCRIPTION
 if (!validator.isLength(form.productDescription?.trim() || "", { min: 20 })) {
  errors.productDescription = "Debe tener al menos 20 caracteres";
 }

 // PRICE
 if (!form.productPrice || Number(form.productPrice) <= 0) {
  errors.productPrice = "Debe ser mayor a 0";
 }

 // CATEGORY
 if (!form.productCategory) {
  errors.productCategory = "Seleccione una categoría";
 }

 // IMAGES
 validateImage(portada, "portada", errors, isEdit);
 validateImage(lamina, "lamina", errors, isEdit);

 return errors;
};
