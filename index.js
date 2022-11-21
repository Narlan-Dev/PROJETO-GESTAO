const textField = document.querySelectorAll('.textfield')
var problemas = []

class User{
    constructor(valorGasto, cliques, pageV, CPM,  CTR){
        this.valorGasto = valorGasto
        this.CTR = CTR
        this.cliques = cliques
        this.pageV = pageV
        this.CPM = CPM
    }

    getvalorGasto(){return this.valorGasto}
    getCTR(){return this.CTR}
    getCliques(){return this.cliques}
    getPageV(){return this.pageV}
    getCPM(){return this.CPM}
}
function start(){
    var botaoGargalo = document.querySelector('.btn')
    exception()
    botaoGargalo.addEventListener('click', () =>{handleResolverGargalo()})
}

function handleResolverGargalo(){
    var user = new User(textField[0].value, textField[1].value, textField[2].value, textField[3].value, textField[4].value)
    var mostrarDicas = document.querySelector("#card-itens-lista")
    mostrarDicas.innerHTML = ""
    /*var inputValorGasto = document.querySelector("#input-valor-gasto").value
    var inputCTR = document.querySelector("#ctr").value
    var inputCliques = document.querySelector("#input-cliques").value
    var inputPageV = document.querySelector("#input-pag-visu").value
    var inputCPM = document.querySelector("#cpm").value*/

    gargalo(inputValorGasto, inputCliques, inputPageV, inputCTR, inputCPM);

    //criando a lista de problemas
    for(var i = 0; i < problemas.length; i++){
        console.log(problemas[i])
        var dicas = document.createElement("li")
        dicas.innerHTML = problemas[i];
        mostrarDicas.appendChild(dicas)
    }

    //limpando o array de problemas
    for(var i = 0; i <= problemas.length; i++){
        console.log("elemento exvluido " + problemas.pop())
    }
   
}

function gargalo(valorGasto, cliques, pageView, ctr, cpm){
    var existeProblema = false
    var texto
    if(valorGasto < 25){
        texto = "O orçamento está baixo. Aumente para pelo menos 25 reais. Para conseguir dinheiro, teste estes sites: 99freela, GetNinjas e Workana."
        problemas.push(texto)
        existeProblema = true
    }
    
    var x = 100*pageView/cliques
    if(x < 60){
        texto = "Melhore o carregamento da página. Vc está perdendo " + (100 - x) + "% do seu tráfego. Pra uma anlálise mais concreta use o site GTMetrix."
        problemas.push(texto)
        existeProblema = true
    }

    if(ctr < 2){
        texto = "Um CTR abaixo de 2% é péssimo para o seu negócio. Melhore o criativo, deixando-o mais chamativo, com promessas mais fortes (cuidado com os bloqueios no FaceBook)."
        problemas.push(texto)
        existeProblema = true
    }
    
    if(cpm > 15){
        texto = "Um CPM acima de R$15 é considerado alto. Melhore o criativo e gere mais engajamento no anúncio. Evite super segmentar seu público."
        problemas.push(texto)
        existeProblema = true
    }
    if(!existeProblema){
        texto = "Suas métricas estão ótimas"
        return texto
    }
    return problemas
}

function exception(){
    for(let i = 0; i < textField.length; i++){
        textField[i].addEventListener("keypress", function(e){
            const keyCode = (e.keyCode ? e.keyCode : e.wich)
            if(!(keyCode > 47 && keyCode < 58)){
                e.preventDefault()
            }
        })
    }
}

start()