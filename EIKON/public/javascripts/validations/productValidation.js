window.addEventListener("load", function () {
 const createForm = document.querySelector("#create-product");
 const editForm = document.querySelector("#edit-product");

 if (createForm) initValidation(createForm, false);
 if (editForm) initValidation(editForm, true);

 function initValidation(form, isEdit) {
  const title = form.querySelector("#productTitle");
  const description = form.querySelector("#productDescription");
  const portada = form.querySelector("#portada");
  const lamina = form.querySelector("#lamina");

  form.addEventListener("submit", function (e) {
   let errors = [];

   // =====================
   // TITLE
   // =====================
   if (validator.isEmpty(title.value.trim())) {
    errors.push({
     field: title,
     msg: "El titulo es obligatorio",
    });
   } else if (!validator.isLength(title.value.trim(), { min: 5 })) {
    errors.push({
     field: title,
     msg: "Debe tener al menos 5 caracteres",
    });
   }

   // =====================
   // DESCRIPTION
   // =====================
   if (!validator.isLength(description.value.trim(), { min: 20 })) {
    errors.push({
     field: description,
     msg: "Debe tener al menos 20 caracteres",
    });
   }

   // =====================
   // IMAGE
   // =====================
   validateImage(portada, errors, isEdit);

   // =====================
   // IMAGE LAMINA
   // =====================
   validateImage(lamina, errors, isEdit);

   // =====================
   // SHOW ERRORS
   // =====================
   if (errors.length > 0) {
    e.preventDefault();

    // Clean error
    form
     .querySelectorAll(".invalid-feedback-front")
     .forEach((el) => el.remove());
    form
     .querySelectorAll(".is-invalid")
     .forEach((el) => el.classList.remove("is-invalid"));

    errors.forEach((error) => {
     error.field.classList.add("is-invalid");

     const div = document.createElement("div");
     div.classList.add("invalid-feedback", "invalid-feedback-front", "d-block");
     div.innerText = error.msg;

     error.field.parentElement.appendChild(div);
    });
   }
  });
 }

 // =====================
 // REUSE FN FOR IMAGE
 // =====================
 function validateImage(input, errors, isEdit) {
  if (!input) return;

  const allowedExtensions = ["jpg", "jpeg", "png", "gif"];

  // CREATE → Mandatory
  if (!isEdit && input.files.length === 0) {
   errors.push({
    field: input,
    msg: "Debe subir una imagen",
   });
   return;
  }

  // If existe, Validate
  if (input.files.length > 0) {
   const fileName = input.files[0].name;
   const extension = fileName.split(".").pop().toLowerCase();

   if (!allowedExtensions.includes(extension)) {
    errors.push({
     field: input,
     msg: "Formatos permitidos: JPG, JPEG, PNG, GIF",
    });
   }
  }
 }
});
