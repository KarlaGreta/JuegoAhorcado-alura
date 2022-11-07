const palabras=['casa','libro','alura','oracle']; 
const imagenes=["imgs/ahorcado1.svg","imgs/ahorcado2.svg","imgs/ahorcado3.svg","imgs/ahorcado4.svg","imgs/ahorcado5.svg","imgs/ahorcado6.svg","imgs/ahorcado7.svg"]
const imgactual=document.querySelector("#container-jugar img")



let incorrectas ;
let letrasIncorrectas ;
let letra ;
let input = document.querySelector("#letra-ingresada")
let palabraSecreta
let letrasJuego  /* _ en la pantalla para que adiviven  */
let sinJugar=palabras;  /* array con palabras sin jugar */
let letras_incorrectas=document.querySelector("#letras_incorrectas")




function agregarPalabra(){
    let palabraNueva = document.querySelector('#nueva-palabra');
    let palabra = palabraNueva.value;
    if(palabra.length>=3){
        palabras.push(palabra);
        console.log(palabras);
    }else{
        alert("palabra muy corta");
    }
    palabraNueva.value="";
    
}

function cambiarContainer(numero){
    
    let containerInicio=document.querySelector("#container-inicio")
    
    let containerAgregar=document.querySelector("#container-agregar")
    
    let containerJuego=document.querySelector("#container-jugar")  
    
    containerInicio.style.display="none";
    containerAgregar.style.display="none";
    containerJuego.style.display="none";   

    if (numero==1){
        containerInicio.style.display="flex";
        palabras=['casa','libro','alura','oracle']; 
    }else 
        if(numero==2){
            containerAgregar.style.display="flex"; 
        }
        else { 
            containerJuego.style.display="flex";
            nuevoJuego()
        }
}



function nuevoJuego(){
    
    if ( 0 == sinJugar.length){
        sinJugar=palabras; 
    }
        
    palabraSecreta= sinJugar[Math.floor(Math.random()*sinJugar.length)]
    sinJugar=sinJugar.filter(x => x!=palabraSecreta)
    palabraSecreta=Array.from(palabraSecreta)
    incorrectas = 0;
    letrasIncorrectas = [];
    imgactual .src="imgs/ahorcado0.svg"
    

        crearLetrasVacias(palabraSecreta.length)  
        letrasJuego=document.querySelectorAll("#letras-juego li")
        letras_incorrectas.innerHTML=""
}

document.addEventListener("keypress",(evento)=>{
    if (evento.key=='Enter') leerLetra()
})

function leerLetra(){

    if (incorrectas != 7){
     
        letra = document.querySelector("#letra-ingresada").value
        document.querySelector("#letra-ingresada").value="" 
    
            if ( palabraSecreta.some(x => (x==letra)) ){
                console.log("letra correcta")
                for (i=0;i<palabraSecreta.length;i++){
                    if ( palabraSecreta[i]==letra )
                        letrasJuego[i].innerHTML=letra
                }
                
            }else{
                if (letrasIncorrectas.every(x =>x!=letra)){
                    imgactual.src=imagenes[incorrectas]
                    incorrectas++
                    letrasIncorrectas.push(letra)
                    letras_incorrectas.innerHTML=letrasIncorrectas
                    
                }
            }
        }
    if (incorrectas == 7){
        imgactual.src=imagenes[incorrectas-1]
    }
}

function desistir(){
    for (i=0;i<palabraSecreta.length;i++){
        letrasJuego[i].innerHTML=palabraSecreta[i]
    }
    imgactual.src=imagenes[6]
}





function crearLetrasVacias(numero){
    let texto="";
    
    for (i=0;i<numero;i++){
        texto=texto+"<li>_</li>"
    }
    document.querySelector("#letras-juego").innerHTML= texto   
    
}