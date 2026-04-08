window.addEventListener("load", function () {
 const form = document.querySelector("#login");

 if (!form) return; // seguridad si no existe

 const email = document.querySelector("#email-login");
 const password = document.querySelector("#password-login");

 form.addEventListener("submit", function (e) {
  let errors = [];

  // =====================
  // Email
  // =====================
  if (validator.isEmpty(email.value.trim())) {
   errors.push({
    field: email,
    msg: "El email es obligatorio",
   });
  } else if (!validator.isEmail(email.value.trim())) {
   errors.push({
    field: email,
    msg: "Debe ser un email válido",
   });
  }

  // =====================
  // PASSWORD
  // =====================
  if (validator.isEmpty(password.value)) {
   errors.push({
    field: password,
    msg: "La contraseña es obligatoria",
   });
  }

  // =====================
  // ERRORS
  // =====================
  if (errors.length > 0) {
   e.preventDefault();

   // Clean errors ( front only)
   document
    .querySelectorAll(".invalid-feedback-front")
    .forEach((el) => el.remove());

   document
    .querySelectorAll("#login .is-invalid")
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
