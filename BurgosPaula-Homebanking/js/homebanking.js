//Declaración de variables
var usuarioValido = "Paula";
var usuarioLogueado;
var saldoCuenta = 1000;
var limiteExtraccion = 10000;
var precioAgua = 350;
var precioTelefono = 425;
var precioLuz = 210;
var precioInternet = 570;
var stringAgua = "Agua";
var stringLuz = "Luz";
var stringInternet = "Internet";
var stringTelefono = "Telefono";
var ctaAmiga1 = "1234567";
var ctaAmiga2 = "7654321";
var codigoSeguridad = "1111";
var mensajeValorNumerico = "Ingrese un valor numérico";

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
var load = function () {
    document.getElementById("iniciarSesion").innerHTML = "";
    document.getElementById("cerrarSesion").innerHTML = "Cerrar Sesion";
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}

//crear funciones
var sumarDinero = function (cantidad) {
    saldoCuenta += cantidad;
}

var restarDinero = function (cantidad) {
    saldoCuenta -= cantidad;
}

var hayHondosSuficientes = function (extraer) {
    return (saldoCuenta - extraer) >= 0;
}

var esMontoMultiploDe100 = function (extraer) {
    return (extraer % 100) === 0;
}

var esMontoNoExcedeLimite = function (extraer) {
    return extraer <= limiteExtraccion;
}

var procesarPago = function (precio, nombreServicio) {
    if (hayHondosSuficientes(precio)) {
        var saldoAnterior = saldoCuenta;
        restarDinero(precio);
        actualizarSaldoEnPantalla();
        alert("Has pagado el servicio " + nombreServicio +
            "\nSaldo Anterior: " + saldoAnterior +
            "\nDinero descontado: " + precio +
            "\nSaldo Actual: " + saldoCuenta);
    } else {
        alert("No posee saldo suficiente para pagar este servicio");
    }
}

var cancelado = function (value) {
    return (value == null);
}

var esNumero = function (valor) {
    if (isNaN(valor)) {
        return false;
    }
    return true;
}

var cerrarSesion = function(){
    alert("Cerrando sesion del usuario " + usuarioLogueado);
    resetearValores();  
    document.getElementById("cerrarSesion").innerHTML = "";
    document.getElementById("iniciarSesion").innerHTML = "Iniciar Sesion";
}

var resetearValores = function(){
    usuarioLogueado = "";
    saldoCuenta = "";
    limiteExtraccion = "";
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}



//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
    var stringNuevoLimite = prompt("Ingrese un nuevo límite de extracción: ");
    if (!cancelado(stringNuevoLimite)) {
        var nuevoLimite = parseInt(stringNuevoLimite);
        if (esNumero(nuevoLimite)) {
            limiteExtraccion = nuevoLimite;
            actualizarLimiteEnPantalla();
            alert("Tu nuevo límite de extracción es: " + limiteExtraccion);
        } else {
            alert(mensajeValorNumerico);
        }
    }
}

function extraerDinero() {
    var stringExtraer = prompt("Cantidad de dinero que desea extraer: ");
    if (!cancelado(stringExtraer)) {
        var extraer = parseInt(stringExtraer);
        if (esNumero(extraer)) {
            var saldoAnterior = saldoCuenta;
            if (!hayHondosSuficientes(extraer)) {
                alert("El saldo es insufiente para extraer esa cantidad de dinero");
            } else if (!esMontoNoExcedeLimite(extraer)) {
                alert("La cantidad que desea extraer excede el limite de extracción");
            } else if (!esMontoMultiploDe100(extraer)) {
                alert("Este cajero solo entrega billetes de 100");
            } else {
                restarDinero(extraer);
                actualizarSaldoEnPantalla();
                alert("Has extraido: " + extraer +
                    "\nSaldo Anterior: " + saldoAnterior +
                    "\nSaldo Actual: " + saldoCuenta);
            }
        } else {
            alert(mensajeValorNumerico);
        }
    }
}

function depositarDinero() {
    var stringDeposito = prompt("Cantidad de dinero que desea depositar: ");
    var deposito = parseInt(stringDeposito);
    if (!cancelado(stringDeposito)){
        if (esNumero(deposito)) {
            var saldoAnterior = saldoCuenta;
            sumarDinero(deposito);
            actualizarSaldoEnPantalla();
            alert("Has depositado: " + deposito +
                "\nSaldo Anterior: " + saldoAnterior +
                "\nSaldo Actual: " + saldoCuenta);
        } else {
            alert(mensajeValorNumerico);
        }
    } 
}

function pagarServicio() {
    var servicioSeleccionado = prompt("Indique el numero del servicio que desea pagar: " +
        "\n1 - Agua" +
        "\n2 - Luz" +
        "\n3 - Internet" +
        "\n4 - Telefono");
    if (!cancelado(servicioSeleccionado)) {
        switch (servicioSeleccionado) {
            case "1":
                procesarPago(precioAgua, stringAgua);
                break;
            case "2":
                procesarPago(precioLuz, stringLuz);
                break;
            case "3":
                procesarPago(precioInternet, stringInternet);
                break;
            case "4":
                procesarPago(precioTelefono, stringTelefono);
                break;
            default:
                alert("No existe el servicio seleccionado");
                break;
        }
    }
}

function transferirDinero() {
    var stringTransferir = prompt("Ingrese el monto que desea transferir");
    if (!cancelado(stringTransferir)) {
        var transferir = parseInt(stringTransferir);
        if (esNumero(transferir)) {
            if (hayHondosSuficientes(transferir)) {
                var nroCta = prompt("Ingrese el numero de cuenta al que desea tranferir");
                if (nroCta === ctaAmiga1 || nroCta === ctaAmiga2) {
                    restarDinero(transferir);
                    actualizarSaldoEnPantalla();
                    alert("Se han transferido $" + transferir +
                        "\nCuenta Destino: " + nroCta);
                } else {
                    alert("La cuenta ingresada no es cuenta amiga. Solo puede transferir dinero a cuantas amigas");
                }                
            } else {
                alert("No posee fondos suficientes para transferir ese monto de dinero");
            }
        } else {
            alert(mensajeValorNumerico);
        }
    }
}

function iniciarSesion() {
    var usuario = prompt("Ingrese su usuario");
    if (!cancelado(usuario)){
        if(usuario === usuarioValido){
            var codigo = prompt("Ingrese el código de su cuenta");
            if  (!cancelado(codigo)){        
                if (codigo === codigoSeguridad) {
                    usuarioLogueado = usuario;
                    alert("Bienvenido/a " + usuario + " ya puedes comenzar a realizar operaciones"); 
                    load();                   
                } else {
                    alert("Código incorrecto. Tu dinero ha sido retenido por cuestiones de seguridad");
                    saldoCuenta = 0;                              
                }
            } 
        } else {
            alert("El usuario ingresado no existe");            
        }
    }
}


//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + usuarioLogueado;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}