const texto =
"Formando líderes para el futuro";

let i = 0;

function escribir(){

  if(i < texto.length){

    document.getElementById("typing").innerHTML +=
    texto.charAt(i);

    i++;

    setTimeout(escribir, 70);
  }

}

escribir();