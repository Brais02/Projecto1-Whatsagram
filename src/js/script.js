/*Variables referente a Fecha*/
var diaUltimoMensajeEnviado; //Guardara el dia del ultimo mensaje enviado
var mesUltimoMensajeEnviado; //Guardara el mes del ultimo mensaje enviado
var anoUltimoMensajeEnviado; //Guardara el año del ultimo mensaje enviado
var primeraVezFecha = true; //Indica si es la primera vez que se tiene que enviar una fecha a la hora de enviar un mensaje
var hora; //Guarda la hora y minutos del mensaje que se enviara

/*Variables referentes a Mayusculas*/
var mayusculas = 0;

/*Variables referentes al Teclado*/
var emojisActivado = false; //Comprueba si los emojis estan activados
var tecladoEmoji; //Guarda una array de todas las imagenes que tengan la clase emoji
var teclado; //Guarda una array de todas las teclas que tengan la clase tecla


window.onload = function () {
    /*Nada más carge la web nos generara el Teclado y nos lo activara*/
    GenerarTeclado();
    ActivarTeclado();
    TeclasEspeciales();
    ActivarTeclasEspeciales();

    /*Cuando hagan click en emoji nos comprobaran el estado
    de emojisActivado*/
    document.getElementById("emoji").onclick = function () {

        /*Con esto consegimos activar y desactivar los emojis
        cuando hacemos click*/
        if (emojisActivado == false) {
            emojisActivado = true;
        } else {
            emojisActivado = false;
        }

        /*Cuando no esten activados los emojis nos eliminara los emojis del teclado, 
        nos generara el teclado y nos activara el teclado*/
        if (emojisActivado == false) {
            EliminarElemento();
            GenerarTeclado();
            ActivarTeclado(); //Se vuelve a activar el teclado para que vuelva a estar pendiente de si se hace click
            TeclasEspeciales();
            ActivarTeclasEspeciales();

            /*Si los emojis estan activados nos eliminara
            las teclas del teclado y nos mostrara los emojis*/
        } else {
            EliminarElemento();
            GenerarEmoji();
            ActivarEmoji();
        }
    }


    document.getElementById("enviar").onclick = function () {
        var entrada = Entrada();

        //En caso de que se quiera enviar el texto vacio o con espacio no se enviara
        if (entrada.trim() != "") {
            Enviar();
        }
    }
}

//Cuando se le de a intro desde el input de texto se enviara el mensaje
function Intro(evento) {
    var x = evento.code;
    if (x === "Enter") {
        document.getElementById("enviar").click();
    }
}

function ActivarTeclasEspeciales() {

    document.getElementById("mayusculas").onclick = function () {
        mayusculas++;
        if (mayusculas == 3) {
            mayusculas = 0;
        }
    }

    document.getElementById("reset").onclick = function () {
        Reset();
    }

    document.getElementById("espacio").onclick = function () {
        document.getElementById("entrada").value += " ";
    }

    document.getElementById("borrarUltimoCaracter").onclick = function () {
        BorrarUltimoCaracter();
    }

    document.getElementById("borrarPrimerCaracter").onclick = function () {
        BorrarPrimerCaracter();
    }

    document.getElementById("borrarPalabra").onclick = function () {
        BorrarUltimaPalabra();
    }

    document.getElementById("saltoLinea").onclick = function () {
        SaltoLinea();
    }

    document.getElementById("coma").onclick = function () {
        Coma()
    }

    document.getElementById("punto").onclick = function () {
        Punto()
    }
}

function TeclasEspeciales() {
    var especiales = ["mayusculas", "borrarUltimoCaracter", "coma", "espacio", "punto", "reset",
        "borrarPalabra", "borrarPrimerCaracter", "saltoLinea"
    ];

    var salidaTeclado = document.getElementById("teclado"); //Cogemos el punto de la zona teclado
    for (let index = 0; index < especiales.length; index++) {
        var boton = document.createElement("button");

        boton.setAttribute("id", especiales[index]);
        switch (index) {
            case 0:
                boton.innerHTML = "⬆";
                break;
            case 1:
                boton.innerHTML = "←";
                break;
            case 2:
                boton.innerHTML = ",";
                break;
            case 3:
                boton.innerHTML = "";
                break;
            case 4:
                boton.innerHTML = ".";
                break;
            case 5:
                boton.innerHTML = "C";
                break;
            case 6:
                boton.innerHTML = "CE";
                break;
            case 7:
                boton.innerHTML = "→";
                break;
            case 8:
                boton.innerHTML = "↲";
                break;
            default:
                boton.innerHTML = "Tecla";
                break;
        }

        salidaTeclado.appendChild(boton);
    }
}

function Coma() {
    var entrada = Entrada();
    entrada += ",";
    document.getElementById("entrada").value = entrada;
}

function Punto() {
    var entrada = Entrada();
    entrada += ".";
    document.getElementById("entrada").value = entrada;
}

function SaltoLinea() {
    var entrada = Entrada();
    entrada += "<br>";
    document.getElementById("entrada").value = entrada;
}

function Entrada() {
    return document.getElementById("entrada").value;
}

function BorrarUltimaPalabra() {
    var entrada = Entrada();
    var posicionEspacio = entrada.trim().lastIndexOf(" "); //Elimina los espacios de los lados del texto y devuelve la posicion del ultimo espacio
    entrada = entrada.substring(0, posicionEspacio); //Coge todos los caracteres desde el primero (0) hasta el ultimo espacio eliminando de facto la ultima palabra
    document.getElementById("entrada").value = entrada;
}

function BorrarUltimoCaracter() {
    var entrada = Entrada();
    entrada = entrada.slice(0, -1); //Coge desde el primer caracter (0) hasta el penultimo caracter (-1) eliminando de facto el ultimo caracter
    document.getElementById("entrada").value = entrada;
}

function BorrarPrimerCaracter() {
    var entrada = Entrada();
    entrada = entrada.substring(1); //Coge todos los caracteres del texto empezando por el primero, eliminando de facto el caracter inicial
    document.getElementById("entrada").value = entrada;
}

function Reset() {
    document.getElementById("entrada").value = "";
}

function Letras(letra) {
    if (mayusculas == 1) {
        document.getElementById("entrada").value += letra.toUpperCase();
        mayusculas = 0;
    } else if (mayusculas == 2) {
        document.getElementById("entrada").value += letra.toUpperCase();
    } else {
        document.getElementById("entrada").value += letra.toLowerCase();
    }
}

/*Nos activara el teclado para que cuando hagamos click se envie*/
function ActivarTeclado() {
    /*En caso de que le hagamos click a alguna tecla se nos activara la funcion*/
    for (let index = 0; index < teclado.length; index++) {
        teclado[index].onclick = function () {
            var tecla = this.innerHTML; //Coge el valor que tiene escrito en la etiqueta la variable
            Letras(tecla); //Nos envia ese valor a que se compruebe si va en mayusculas
        }
    }
}

/*Nos activara el teclado para que cuando hagamos click se envie*/
function ActivarEmoji() {
    /*En caso de que le hagamos click a alguna tecla se nos activara la funcion*/
    for (let index = 0; index < tecladoEmoji.length; index++) {
        tecladoEmoji[index].onclick = function () {
            var imagenEmoji = this.outerHTML; //Coge el valor que tiene escrito en la etiqueta la variable
            imagenEmoji = imagenEmoji.replace("emoji", "emojiEnviado") //Remplaza el valor de la clase para que no haya problemas con la array tecladoEmoji
            Enviar(imagenEmoji); //Nos envia la imagen para enviarla con el texto si contiene alguno
        }
    }
}

/*Nos permite eliminar los elementos que esten dentro de nuestro teclado*/
function EliminarElemento() {
    var elementoHijo = document.getElementById("teclado").childElementCount; //Nos coge el numero de elementos que son hijos teclado
    var padre = document.getElementById("teclado"); //Nos coge el elemento padre que sera la seccion del teclado
    for (let index = 0; index < elementoHijo; index++) {
        padre.removeChild(padre.childNodes[0]); //Eliminaremos el primer elemento hijo (el 0) del padre hasta que ya no queden mas hijos
    }
}

//Nos permite generar los botones de letras de la zona de teclado y que tengan una clase llamada teclado
function GenerarTeclado() {

    //La array de todas las teclas nos permite definir cuantas teclas se van a generar
    var abecedario = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ", "z", "x", "c", "v", "b", "n", "m"];
    var salidaTeclado = document.getElementById("teclado"); //Cogemos el punto de la zona teclado
    for (let index = 0; index < abecedario.length; index++) {
        var button = document.createElement("button"); //Creamos el elementos boton para cada tecla
        button.innerHTML = abecedario[index]; //Insertamos en cada boton una letra diferente de nuestro array abecedario
        button.classList.add("tecla"); //Añadimos dentro de cada boton la clase tecla
        salidaTeclado.appendChild(button); //Hacemos que el boton sea un hijo de nuestra zona teclado
    }

    teclado = document.getElementsByClassName("tecla"); //Nos define que todo elemento que tenga la clase tecla se guarda en teclado 
}

//Nos permite generar los emojis en la zona de teclado
function GenerarEmoji() {

    //La array de todas las imagenes que nos permite definir cuantas imagenes se crearan
    var emoji = ["imagenes/sonrisa.png", "imagenes/money.png", "imagenes/zipper.png"];
    var salidaTeclado = document.getElementById("teclado"); //Cogemos el punto de la zona teclado
    for (let index = 0; index < emoji.length; index++) {
        var imagen = document.createElement("img"); //Crearemos el elemento imagen para cada emoji
        imagen.src = emoji[index]; //Meteremos dentro de cada imagen la referencia al emoji
        imagen.classList.add("emoji"); //Añadimos dentro de cada emoji la clase emoji
        salidaTeclado.appendChild(imagen); //Hacemos que la imagen sea un hijo de nuestra zona teclado
    }

    tecladoEmoji = document.getElementsByClassName("emoji"); //Nos define que todo elemento que tenga la clase emoji se guarda en tecladoEmoji 
}

/*Enviara los datos que queremos que aparezcan como mensajes*/
function Enviar(imagen) {
    var enviarfecha = Fecha();
    var salida = document.getElementById("salida");
    var entrada = document.getElementById("entrada").value;
    var p = document.createElement("p");

    /*Si lo que envia fecha no es null va a enviar el mensaje de fecha
    en caso contrario va a saltar para continuar con el codigo de enviar texto*/
    if (enviarfecha != null) {
        /*Crearemos un elemento y a ese elemento le insertaremos
        nuestra fecha y le diremos que meta como hijo de nuestra salida
        el elemento con la informacion*/
        var nodo = document.createElement("p"); //Necesitamos crear un nuevo elemento para asegurarnos que no se sobrescriba con el mensaje
        nodo.innerHTML = "<b>" + enviarfecha + "</b>";
        nodo.classList.add("fecha");
        salida.appendChild(nodo);
    }

    //Si lo los emojis estan activados y se envia clicando en el emoji nos enviara el emoji y el texto que tengamos
    if (emojisActivado == true) {
        //En caso de que no se envie una imagen hara lo mismo que en el caso de que los emojis esten desactivados
        if (imagen != null) {
            p.innerHTML = entrada + " " + imagen + " " + hora;
            p.classList.add("mensaje");
            salida.appendChild(p);
            Reset(); //Llamamos a Reset para que nos limpie el input
        } else {
            p.innerHTML = entrada + " " + hora;
            p.classList.add("mensaje");
            salida.appendChild(p);
            Reset(); //Llamamos a Reset para que nos limpie el input
        }
    } else {
        /*Recogemos los valores de entrada, creamos un elemento
        metemos los valores de entrada en el elemento y colgamos como hijo
        de la salida el elemento con los datos y entonce dejamos en vacio entrada*/
        p.innerHTML = entrada + " " + hora;
        p.classList.add("mensaje");
        salida.appendChild(p);
        Reset(); //Llamamos a Reset para que nos limpie el input
    }
    salida.lastChild.scrollIntoView(false);
}

/*Devolvera la fecha actual o null*/
function Fecha() {

    /*Creamos una array de meses, cogemos la fecha actual, de ella
    cogemos el dia y el mes y lo guardamos en resultado*/
    var meses = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    var fecha = new Date(); //Coge la fecha actual
    var dia = fecha.getDate(); //Selecciona el dia del mes de la fecha actual
    var ano = fecha.getFullYear(); //Selecciona el año de la fecha actual
    var mes = fecha.getMonth() + 1; //Selecciona el mes y empieza a contar por 0 por eso se pone +1
    var resultado = dia + " " + meses[mes] + " " + ano; //Creamos el mensaje que se enviara y cambiamos el numero del mes por el nombre del mes
    var minutos = String(fecha.getMinutes()).padStart(2, "0"); //Coge los minutos de la fecha y lo convierte en un string y entonces obliga a que el string tenga 2 caracteres y si no se cumple pone un 0
    var horas = String(fecha.getHours()).padStart(2, "0"); //Coge hora de la fecha y lo convierte en un string y entonces obliga a que el string tenga 2 caracteres y si no se cumple pone un 0

    hora = "<b class=\"hora\">" + horas + ":" + minutos + "</b>"; //Pone una etiqueta con la clase hora y dentro metemos la hora y los minutos.

    /*Si es la primera vez que se ejecuta fecha me pondra la fecha del ultimo mensaje enviado y
    se asegurara de que no vuelva a pasar pasando de true a false y devolvera el resultado*/
    if (primeraVezFecha == true) {
        diaUltimoMensajeEnviado = dia; //Pone el dia del la primera vez que enviamos un mensaje
        mesUltimoMensajeEnviado = mes; //Pone el mes del la primera vez que enviamos un mensaje
        anoUltimoMensajeEnviado = ano; //Pone el año del la primera vez que enviamos un mensaje
        primeraVezFecha = false; //Cambia para que no vuelva a pasar por aqui 
        return resultado;
    } else {
        var comprobarFecha = ComprobarFecha(dia, mes, ano);

        /*En caso de que la fecha sea diferente me enviara el resultado de fecha*/
        if (comprobarFecha == false) {
            return resultado;
        } else {
            return null; //Devuelve null porque al ser el mismo dia no tiene que aparecer el mensaje de la fecha
        }
    }
}

/*Comprobara si la fecha (dia, mes y año) en el que queremos enviar el mensaje
es el mismo que la fecha del anterior mensaje enviado*/
function ComprobarFecha(dia, mes, ano) {

    /*En caso de que la fecha sea diferente me cambia la fecha por la de este que sera
    el ultimo mensaje, tanto en dia, mes y año*/
    if (diaUltimoMensajeEnviado != dia || mesUltimoMensajeEnviado != mes || anoUltimoMensajeEnviado != ano) {
        diaUltimoMensajeEnviado = dia;
        mesUltimoMensajeEnviado = mes;
        anoUltimoMensajeEnviado = ano;
        return false; //Me devuelve false porque no es la misma fecha 
    } else {
        return true; //Me devuelve true porque si es la misma fecha
    }
}
