//Imágenes de los billetes en un arreglo asociativo.
var imagenes = [];
imagenes["1"] = "./img/monopoly1.png";
imagenes["5"] = "./img/monopoly5.png";
imagenes["10"] = "./img/monopoly10.png";
imagenes["20"] = "./img/monopoly20.png";
imagenes["50"] = "./img/monopoly50.png";
imagenes["100"] = "./img/monopoly100.png";
imagenes["500"] = "./img/monopoly500.png";

//Clase billete en la cual definimos los billetes, su valor, cantidad y su imagen correspondiente.
class Billete{
    constructor(valor, cantidad){
        this.valor = valor;
        this.cantidad = cantidad;
        this.imagen = new Image();
        this.imagen.src = imagenes[this.valor.toString()];
    }
}

//Definimos la caja de billetes con la cantidad de dinero inicial con la que cuenta.
var cajaBilletes = [];
var entregado = [];
cajaBilletes.push(new Billete(500, 100));
cajaBilletes.push(new Billete(100, 100));
cajaBilletes.push(new Billete(50, 100));
cajaBilletes.push(new Billete(20, 100));
cajaBilletes.push(new Billete(10, 100));
cajaBilletes.push(new Billete(5, 100));
cajaBilletes.push(new Billete(1, 100));

//Función para actualizar la caja de billetes con los billetes entregados.
function actualizaCaja(){
    for(var bi of entregado){
        for (var cb of cajaBilletes){
            if (bi.valor == cb.valor){
                cb.cantidad -= bi.cantidad;
            }
        }
    }
}

//Función para imprimir los billetes al final de la caja.
function imprimeBilletes(){
    var x = 0;
    var y = 0;
    for (var bi of entregado){
        var i = 0;
        while(i < bi.cantidad){
            cajaEntrega.drawImage(bi.imagen, x, y);
            x += 15;
            console.log(x+","+y);
            i++;
        }
        y += 50;
        x = 0;
    }
}



//Variables auxiliares para la siguiente función.
var div = 0;
var papeles = 0;

//Función que lee la cantidad que requiere el usuario y le entrega el dinero si está disponible en la caja.
function entregarDinero(){
    var t = document.getElementById("dinero");
    dinero = parseInt(t.value);
    entregado = [];
    var total = dinero;
    for(var bi of cajaBilletes){
        if(dinero > 0){
            div = Math.floor(dinero / bi.valor);
            if(div > bi.cantidad){
                papeles = bi.cantidad;
            }else{
                papeles = div;
            }
            if(papeles != 0){
                entregado.push(new Billete((bi.valor),papeles));
                dinero -= (bi.valor * papeles);
            }
        }
    }
    if(dinero > 0 && dinero%5 != 0){
        mod = dinero%5;
        r.innerHTML = "Lo siento, no contamos con billetes de denominación menor a 10. <br>"
    }else if(dinero > 0){
        r.innerHTML = "Soy un cajero pobre, no tengo tanto dinero :( <br>";
    }else{
        r.innerHTML = "";
        ce.innerHTML = ""
        r.innerHTML +="Has retirado $" + total + ".00mx <br> Encontraras tu dinero al final de la caja. <br> Gracias por utilizar nuestros servicios <br> Vuelva pronto y tenga un muy buen día. <br>";
        imprimeBilletes();
        actualizaCaja();
    }
}

// Traemos los elementos necesarios de nuestro HTML.
// El botón 'Extraer' y su respectiva caja de texto con el dinero indicado a extraer.
var r = document.getElementById("pantalla-resultado");
var ce = document.getElementById("caja-entrega");
var cajaEntrega = ce.getContext("2d");
var b = document.getElementById("extraer");
b.addEventListener("click", entregarDinero);
r.innerHTML += "Bienvenido a nuestro banco. <br> Por favor indica el monto que deseas retirar";
