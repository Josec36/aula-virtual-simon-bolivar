function login(){

  const rol  = document.getElementById("rol").value;

  const user = document.getElementById("user").value;

  const pass = document.getElementById("pass").value;

  const error = document.getElementById("error");

  error.innerText = "";

  /* ── ESTUDIANTE ── */

  if(
    rol === "estudiante" &&
    user === "alumno" &&
    pass === "1234"
  ){

    sessionStorage.setItem(
      "usuario_nombre",
      "Estudiante"
    );

    window.location.href = "dashboard.html";

  }

  /* ── PROFESOR ── */

  else if(
    rol === "profesor" &&
    user === "profesor" &&
    pass === "admin"
  ){

    sessionStorage.setItem(
      "usuario_nombre",
      "Profesor"
    );

    window.location.href = "profesor.html";

  }

  /* ── ADMINISTRADOR ── */

  else if(
    rol === "admin" &&
    user === "admin" &&
    pass === "root"
  ){

    sessionStorage.setItem(
      "usuario_nombre",
      "Administrador"
    );

    window.location.href = "admin.html";

  }

  /* ── ERROR ── */

  else{

    error.innerText =
    "Usuario o contraseña incorrectos";

  }

}