const inputs = document.querySelectorAll('.input')
var titles = document.querySelectorAll('.title')
var problemas = []
let fristDot = false;

//Class of objects
class RequiredFildeException {
    constructor() {
        this.name = "RequiredFildeException"
    }
}
class User{
    constructor(valorGasto, cliques, pageV, cPM,  cTR , vendas){
        this.valorGasto = valorGasto
        this.cTR = cTR
        this.cliques = cliques
        this.pageV = pageV
        this.cPM = cPM
        this.vendas = vendas
    }
}

//Main
function start(){
    var botaoGargalo = document.querySelector('.btn')
    
    //Selection on inputs
    for(let i = 0; i < inputs.length; i++){
        if((i == 1)||(i == 2)||(i == 5)){
            restrictionCaracter(inputs[i], false)
        }else{
            restrictionCaracter(inputs[i], true)
        }
    }

    changeColorOnClick(inputs, titles)
    botaoGargalo.addEventListener('click', () =>{
        try {
            originalColor(titles)
            testEmptyField()
            handleResolverGargalo()
        } catch (e) {
            changeColorError(inputs, titles)
        }
    })
}

//Functionality
function handleResolverGargalo(){
    var mostrarDicas = document.querySelector("#card-itens-lista")
    mostrarDicas.innerHTML = ""

    gargalo(new User(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value, inputs[5].value));

    //criando a lista de problemas
    for(var i = 0; i < problemas.length; i++){
        var dicas = document.createElement("li")
        dicas.innerHTML = problemas[i];
        mostrarDicas.appendChild(dicas)
    }

    //limpando o array de problemas
    clearProblemsVector()
   
}

//limpador do array de problemas
function clearProblemsVector(){
    while(problemas.length){
        problemas.pop()
    }
}

//checando se o usuário é burro o suficiente pra colocar coisas sem sentido
function CheckLogicErrorFrom(user){
    var dicas = document.querySelector("#card-itens-lista")
    dicas.style.color = 'red';

    if(user.pageV > user.cliques){
        clearProblemsVector()
        texto = "O Page View não pode ser maior do que a quantidade de cliques, verifique as informações inseridas e tente novamente."
        problemas.push(texto)
    }
    else if(user.valorGasto == 0){
        clearProblemsVector()
        texto = "Se vc n gastou nada, como pode querer ganhar algo vagabundo?"
        problemas.push(texto)
    }
    else{
        dicas.style.color = 'white'
    } 
}

function gargalo(user){
    var texto = ""
    var score = 100  //criar sistema de score
    var x = 100*user.pageV/user.cliques
   
    if(user.valorGasto < 25){
        texto = "O orçamento está baixo. Aumente para pelo menos 25 reais. Para conseguir dinheiro, teste estes sites: 99freela, GetNinjas e Workana."
        problemas.push(texto)

    }
    if(x < 60){
        texto = "Melhore o carregamento da página. Vc está perdendo " + (100 - x) + "% do seu tráfego. Pra uma anlálise mais concreta use o site GTMetrix."
        problemas.push(texto)

    }
    if(user.cTR < 2){
        texto = "Um CTR abaixo de 2% é péssimo para o seu negócio. Melhore o criativo, deixando-o mais chamativo, com promessas mais fortes (cuidado com os bloqueios no FaceBook)."
        problemas.push(texto)

    }
    if(user.cPM > 15){
        texto = "Um CPM acima de R$15 é considerado alto. Melhore o criativo e gere mais engajamento no anúncio. Evite super segmentar seu público."
        problemas.push(texto)

    }
    if(user.vendas > 5){
        texto = "Parabéns! Você está vendendo. Continue assim."
        problemas.push(texto)
    }
    if(user.cliques/user.vendas > 200){
        texto = "A média do e-commerce brasileiro é 200 cliques para uma venda. Você está abaixo da média!"
        problemas.push(texto)
    }
    if(problemas.length == 0){
        problemas.push("Suas métricas estão ótimas!")
    }

    CheckLogicErrorFrom(user)
}

//Restrictions
function restrictionCaracter(element, decision){
    if(decision === true){
        element.addEventListener("keypress", function(e){
            const keyCode = (e.keyCode ? e.keyCode : e.wich)
            if(element.value == ""){
                //Only number
                if(!(keyCode > 47 && keyCode < 58)){
                    e.preventDefault()
                }
            }else{
                //Private "e", "-" e "+"
                if((keyCode == 101)||(keyCode == 43)||(keyCode == 45)){
                    e.preventDefault()
                }
            }
        })
    }else{
        element.addEventListener("keypress", function(e){
            const keyCode = (e.keyCode ? e.keyCode : e.wich)
            //Only number
            if(!(keyCode > 47 && keyCode < 58)){
                e.preventDefault()
            }
        })
    }
}
function testEmptyField(){
    for(let i = 0; i < inputs.length; i++){
        if(inputs[i].value == ""){
            throw new RequiredFildeException()
        }
    }
}

//Change colors
function changeColorError(onError, onChange){
    for(let i = 0; i < onError.length; i++){
        if(onError[i].value == ""){
            onChange[i].style.color = 'red'
        }
    }
}
function originalColor(elements){
    for(let i = 0; i < elements.length; i++){
        elements[i].style.color = 'white'
    }
}
function changeColorOnClick(onClick, onChange){
    for(let i = 0; i < onClick.length; i++){
        onClick[i].addEventListener('click', () =>{
            onChange[i].style.color = 'white'
        })
    }
}

start()