var mayuscula = false;
var mayusculaSiempre = false;
var primeraVezFecha = 0;
var diaUltimoMensajeEnviado;
var mesUltimoMensajeEnviado;
var anoUltimoMensajeEnviado;

function Reset() {
    document.getElementById("entrada").value = "";
}

function Entrada() {
    return document.getElementById("entrada").value;
}

function LetraA() {
    if (mayuscula == true) {
        document.getElementById("entrada").value += "A";
        mayuscula = false;
    } else if (mayusculaSiempre == true) {
        document.getElementById("entrada").value += "A";
    } else {
        document.getElementById("entrada").value += "a";
    }
}

function LetraB() {
    if (mayuscula == true) {
        document.getElementById("entrada").value += "B";
        mayuscula = false;
    } else if (mayusculaSiempre == true) {
        document.getElementById("entrada").value += "B";
    } else {
        document.getElementById("entrada").value += "b";
    }
}

/*Enviara los datos que queremos que aparezcan como mensajes*/
function Enviar() {
    var enviarfecha = Fecha();
    var salida = document.getElementById("salida");

    /*Si lo que envia fecha no es null va a enviar el mensaje de fecha
    en caso contrario va a saltar para continuar con el codigo de enviar texto*/
    if (enviarfecha != null) {
        /*Crearemos un elemento y a ese elemento le insertaremos
        nuestra fecha y le diremos que meta como hijo de nuestra salida
        el elemento con la informacion*/
        var node = document.createElement("p");
        node.innerHTML = "<b>" + enviarfecha + "</b>";
        salida.appendChild(node);
    }

    /*Recogemos los valores de entrada, creamos un elemento
    metemos los valores de entrada en el elemento y colgamos como hijo
    de la salida el elemento con los datos y entonce dejamos en vacio entrada*/
    var entrada = document.getElementById("entrada").value;
    var p = document.createElement("p");
    p.innerHTML = entrada;
    salida.appendChild(p);
    document.getElementById("entrada").value = "";
}

/*Devolvera la fecha actual o null*/
function Fecha() {

    /*Creamos una array de meses, cogemos la fecha actual, de ella
    cogemos el dia y el mes y lo guardamos en resultado*/
    var meses = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    var fecha = new Date();
    var dia = fecha.getDate();
    var ano = fecha.getFullYear();

    /*Se añade un +1 a mes porque empieza a contar por 0*/
    var mes = fecha.getMonth() + 1;
    var resultado = dia + " " + meses[mes] + " " + ano;

    /*Si es la primera vez que se ejecuta fecha me pondra la fecha del ultimo mensaje enviado y
    se asegurara de que no vuelva a pasar pasando de 0 a 1 y devolvera el resultado*/
    if (primeraVezFecha == 0) {
        diaUltimoMensajeEnviado = dia;
        mesUltimoMensajeEnviado = mes;
        anoUltimoMensajeEnviado = ano;
        primeraVezFecha++;
        return resultado;
    } else {
        var comprobarDia = ComprobarDia(dia);
        var comprobarMes = ComprobarMes(mes);
        var comprobarAno = ComprobarAno(ano);

        /*En caso de que la fecha sea diferente me enviara el resultado de fecha*/
        if (comprobarDia == false || comprobarMes == false || comprobarAno == false) {
            return resultado;
        } else {
            return null; //Devuelve null porque al ser el mismo dia no tiene que aparecer el mensaje de la fecha
        }
    }
}

/*Comprobara si el dia en el que queremos enviar el mensaje
es el mismo que el dia del anterior mensaje enviado*/
function ComprobarDia(mensaje) {

    /*En caso de que la fecha sea diferente me cambia la fecha por la de este que sera
    el ultimo mensaje*/
    if (diaUltimoMensajeEnviado != mensaje) {
        diaUltimoMensajeEnviado = mensaje;
        return false; //Me devuelve false porque no es el mismo dia
    } else {
        return true; //Me devuelve true porque si es el mismo dia
    }
}

/*Comprobara si el mes en el que queremos enviar el mensaje
es el mismo que el mes del anterior mensaje enviado*/
function ComprobarMes(mensaje) {

    /*En caso de que la fecha sea diferente me cambia la fecha por la de este que sera
    el ultimo mensaje*/
    if (mesUltimoMensajeEnviado != mensaje) {
        mesUltimoMensajeEnviado = mensaje;
        return false; //Me devuelve false porque no es el mismo mes
    } else {
        return true; //Me devuelve true porque si es el mismo mes
    }
}

/*Comprobara si el año en el que queremos enviar el mensaje
es el mismo que el año del anterior mensaje enviado*/
function ComprobarAno(mensaje) {

    /*En caso de que la fecha sea diferente me cambia la fecha por la de este que sera
    el ultimo mensaje*/
    if (anoUltimoMensajeEnviado != mensaje) {
        anoUltimoMensajeEnviado = mensaje;
        return false; //Me devuelve false porque no es el mismo año
    } else {
        return true; //Me devuelve true porque si es el mismo año
    }
}

function Espacio() {
    document.getElementById("entrada").value += " ";
}

function Mayuscula() {
    if (mayusculaSiempre == true) {
        mayusculaSiempre = false;
    } else {
        mayuscula = true;
    }
}

function Mayusculas() {
    mayusculaSiempre = true;
}
