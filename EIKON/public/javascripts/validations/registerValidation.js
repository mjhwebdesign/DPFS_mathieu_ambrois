window.addEventListener("load", function () {
 const form = document.querySelector("#register");
 if (!form) return;

 const firstName = document.querySelector("#name-f");
 const lastName = document.querySelector("#name-l");
 const email = document.querySelector("#email");
 const password = document.querySelector("#passwordRegister");
 const confirmPassword = document.querySelector("#pass2");
 const avatar = document.querySelector("#avatar");

 form.addEventListener("submit", function (e) {
  let errors = [];

  // =====================
  // NAME
  // =====================
  if (validator.isEmpty(firstName.value.trim())) {
   errors.push({ field: firstName, msg: "El nombre es obligatorio" });
  } else if (!validator.isLength(firstName.value.trim(), { min: 2 })) {
   errors.push({ field: firstName, msg: "Debe tener al menos 2 caracteres" });
  }

  // =====================
  // LASTNAME
  // =====================
  if (validator.isEmpty(lastName.value.trim())) {
   errors.push({ field: lastName, msg: "El apellido es obligatorio" });
  } else if (!validator.isLength(lastName.value.trim(), { min: 2 })) {
   errors.push({ field: lastName, msg: "Debe tener al menos 2 caracteres" });
  }

  // =====================
  // EMAIL
  // =====================
  if (validator.isEmpty(email.value.trim())) {
   errors.push({ field: email, msg: "El email es obligatorio" });
  } else if (!validator.isEmail(email.value.trim())) {
   errors.push({ field: email, msg: "Debe ser un email válido" });
  }

  // =====================
  // PASSWORD
  // =====================
  if (validator.isEmpty(password.value)) {
   errors.push({ field: password, msg: "La contraseña es obligatoria" });
  } else if (!validator.isLength(password.value, { min: 8 })) {
   errors.push({ field: password, msg: "Debe tener al menos 8 caracteres" });
  } else {
   // Regex for higher security
   const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

   if (!strongRegex.test(password.value)) {
    errors.push({
     field: password,
     msg: "Debe tener mayúscula, minúscula, número y carácter especial",
    });
   }
  }

  // =====================
  // CONFIRM PASSWORD
  // =====================
  if (password.value !== confirmPassword.value) {
   errors.push({
    field: confirmPassword,
    msg: "Las contraseñas no coinciden",
   });
  }

  // =====================
  // AVATAR
  // =====================
  if (avatar.files.length > 0) {
   const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
   const fileName = avatar.files[0].name;
   const extension = fileName.split(".").pop().toLowerCase();

   if (!allowedExtensions.includes(extension)) {
    errors.push({
     field: avatar,
     msg: "Formato inválido. Solo JPG, JPEG, PNG, GIF, WEBP",
    });
   }
  }

  // =====================
  // SHOW ERRORS
  // =====================
  if (errors.length > 0) {
   e.preventDefault();

   // Cleaning old errors /write new ones
   document
    .querySelectorAll(".invalid-feedback-front")
    .forEach((el) => el.remove());
   document
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
});
