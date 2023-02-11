let output = window.document.querySelector(`p.output`)
let outputAction = window.document.querySelector(`p.output-action`)
let initBTN = window.document.querySelector(`input#init`)
let rollDiceBTN = window.document.querySelector(`input#rollDice`)
let restartBTN = window.document.querySelector('input.restart')
let players = []
const safariTableLength = 35
let index = -1

const emojis = {
    q1: '&#x1F3C1;', 
    q6: '&#x1F993;', 
    q10: '&#128018;', 
    q13: '&#x1F992;', 
    q17: '&#x1F981;', 
    q24: '&#x1F40D;', 
    q31: '&#x1F40A;', 
    q35: '&#x1F699'}


restartBTN.style.display = 'none'
rollDiceBTN.style.display = 'none'

function getPlayers() {
    let qtd = Number(window.prompt(`Quantidade de jogadores: `))
    for(let i = 0; i < qtd; i++){
        let name = window.prompt(`Nome do jogador ${i + 1}: `)
        let color =window.prompt(`Cor (em ingles) do jogador ${i + 1}: `)
        let player = {'playerName': name, 'playerColor': color,'playerPosition': 1, 'elegibleToPlay': true}
        players.push(player)        
    }
    setPlayersAtTable()
}

initBTN.addEventListener(`click`, function(){
    index = 0
    players = []
    getPlayers()
    output.innerHTML = `[${players[index].playerName}] role o dado para começar o jogo!`
    rollDiceBTN.style.display = 'inline'
    restartBTN.style.display = 'inline'
    initBTN.style.display = 'none'
})


rollDiceBTN.addEventListener(`click`, function() {
    outputAction.innerHTML = ``
    //Requisito casa 10 - uma rodada sem jogar
    if(players[index].elegibleToPlay === false){
        outputAction.innerHTML = `[${players[index].playerName}] passou a vez.`
        output.innerHTML = `Vez de: [${players[index].playerName}]`
        players[index].elegibleToPlay = true
        changeTurn()
        console.log(`index: ${index}`);
    }  
    
    

    let diceNum = Math.floor(Math.random() * 6 + 1)
    console.log(`Posicao sorteada: ${diceNum}`);
    
    players[index].playerPosition += diceNum
    //Requisito casa 10
    if(players[index].playerPosition === 10){
        players[index].elegibleToPlay = false
        console.log(`[${players[index].playerName}] ficará uma rodada sem jogar`);
        outputAction.innerHTML = `[${players[index].playerName}] ficará uma rodada sem jogar`
    } 

    let position = players[index].playerPosition


    if(position === 6){
        players[index].playerPosition = 11
        outputAction.innerHTML = `[${players[index].playerName}] é um jogador de sorte, a zebra o levou para a casa 11.<br>`
    }
    if(position === 13){
        players[index].playerPosition = 15
        outputAction.innerHTML = `[${players[index].playerName}] foi buscar primeiros socorros para a girafa e avançou até a casa 15.<br>`
    }
    if (position > 35) {
        players[index].playerPosition -= diceNum 
        outputAction.innerHTML = `[${players[index].playerName}] passou a vez, pois a pontuação ultrapassa 35 pontos.<br>`
        changeTurn()
    }
    if (position === 17) {
        outputAction.innerHTML = `[${players[index].playerName}] O gigante leão veio te ajudar, dado foi sorteado mais uma vez.<br>`
        diceNum = Math.floor(Math.random() * 6 + 1)
        players[index].playerPosition += diceNum
        console.log(`Posicao sorteada: ${diceNum}`);
    
    players[index].playerPosition += diceNum
    }
    if (position === 24) {
        outputAction.innerHTML =`[${players[index].playerName}] Tem uma cobra no meio do caminho, vc retornou a casa 12.<br>`
        players[index].playerPosition = 12

    }
    if(position === 31){
        outputAction.innerHTML = `[${players[index].playerName}] o jacaré está com fome, vc retornou a casa 16.<br>`
        players[index].playerPosition = 16

    }
    if (position === 35) {
        outputAction.innerHTML = `[${players[index].playerName}] Ganhou o jogo.<br>`
        output.innerHTML = ''
        rollDiceBTN.style.display = 'none'
        setPlayersAtTable()
    } else {
        let name = players[index].playerName
    
        let lastPosition = position - diceNum;
        let currPosition = position
        console.log(`[${name}] saiu da casa ${lastPosition} para a casa ${currPosition}`);
        setPlayersAtTable()
        changeTurn()

        console.log(`Vez do jogador: ${players[index].playerName}`);
        output.innerHTML = `[${name}] saiu da casa [${lastPosition}] para a casa [${currPosition}]<br><br> Vez do jogador [${players[index].playerName}]`
    }

})


function changeTurn() {
    index < players.length - 1 ? index += 1 : index = 0
}

function setPlayersAtTable() {
    for(let i = 1; i <= safariTableLength; i++){
        window.document.getElementById(`q`+ i).innerHTML = i
    }

    for(let e in emojis){
        window.document.getElementById(e).innerHTML = emojis[e]
    }   

    for(let p in players){
        let position = players[p].playerPosition
        let name = players[p].playerName
        let color = players[p].playerColor
        window.document.getElementById(`q`+ position).innerHTML += `
                                                                    <p 
                                                                    style="background: ${color}; 
                                                                    display: inline;
                                                                    border-radius: 3px;
                                                                    font-size: 1vw;">
                                                                    [${name}]
                                                                    </p> `
    }
}