/*
O jogador vai ter que levar a Harumi (a personagem do jogo) ate o morango para coletar, quando chegar no morango vai aparecer uma pergunta com as alternativas, caso o jogador acerte a pergunta ganha ele consegue colher o morango, depois de responder a tela vai ter uma movimentação para simular a harumi andando pra frente, indo para a proxima pergunta, quando o jogador terminar de responder todas as perguntas sera verificado se ele foi aprovado ou reprovado (o jogador é considerado aprovado caso acerte pelo menos 50% das perguntas), se o jogador for reprovado ele pode escolher entre voltar ao menu ou tentar novemente, caso escolha a alternativa de tentar novamente ele sera direcionado para a primeira pergunta.
*/

// telas de fundo
var menu, jogo, instru, credito;

// botão de voltar
var seta;

// personagem
var x = 20; 

// tela
var tela = 0;

// pergunta
var pergunta = 1;

// acertos
var pontos = 0;

// alternativa correta
var resp;

// variavel que armazena a porcentagem de acerto
var ap_ou_re;

// variaveis que auxiliam na passagem de tela
var x1 = 0, x2 = 500, axp = 1;

// imagem do personagem
var coelho

// morango
var morango, xm = 390, auxM, morangos = [];

// imagem das perguntas
var caverna, carta, tirinha;

var tempo = 3;

// Carregando as imagens
function preload(){
  menu = loadImage('fundo/menu.png');
  jogo = loadImage('fundo/jogo.png');
  instru = loadImage('fundo/instru.png');
  credito = loadImage('fundo/credito.png');
  seta = loadImage('fundo/voltar.png');
  coelho = loadImage('personagem/coelho.png');
  a_r = loadImage('fundo/fundo_A_R.png');
  caverna = loadImage('perguntas/caverna.jpg');
  carta = loadImage('perguntas/carta.jpg')
  tirinha = loadImage('perguntas/tirinha.png')
  morango = loadImage('personagem/morango.png')
}

// propriedades iniciais
function setup() {
  // definindo o tamanho
  createCanvas(500, 500);
  
  // quantidade de quadros por segundo
  frameRate(40)
  
  for(i = 0; i < 10; i++){
    morangos[i] = morango;
  }
}

// função para o botão de voltar
function voltar(){
  if((mouseX > 220 && mouseX < 220+60) && (mouseY > 437 && mouseY < 437+50)){
    // fica maior quando passa o mouse por cima
    image(seta, 215, 435, 70, 60);
  }
  else{
    // tamanho normal
    image(seta, 220, 437, 60, 50);
  }
}

// morangos na tela
function Morango(tam, y){
  for(i = 0, xM = 25; i < tam; i++, xM += 95){
    if(i < 5){
      image(morangos[i], xM, y, 56, 71)
    }
    else if(i==5){
      xM = 25
      image(morangos[i], xM, y+95, 56, 71)
    }
    else{
      image(morangos[i], xM, y+95, 56, 71)
    }
  }
}

// contagem regressiva do tempo
function contagemRegressiva(){
  if(frameCount%40 == 0){
    tempo--;
  }
}

// exibindo o numero da fase
function numeroFase(){
  // rect do fundo
  noStroke()
  fill('rgba(255, 244, 250, 0.6)')
  rect(0, 0, 500, 500)
  
  fill('#f24464');
  textSize(40);
  stroke('#f2274c')
  strokeWeight(2);
  text('Pergunta de número ' + pergunta, 250, 140); 
  Morango(pergunta, 175)
}

// função para movimentar o coelho
function movimentaCoelho(){
  // andar para a esquerda caso aperte o botão esquerdo
  if (keyIsDown(LEFT_ARROW) && (x > 0)) {
    x -= 5;
  }

  // andar para a direita caso aperte o botão direito
  if (keyIsDown(RIGHT_ARROW) && (x < 285)) {
    x += 5;
  }
}

// rect perguntas e alternativas
function rect_perguntas_alternativas(){
  // rect do fundo
  noStroke()
  fill('rgba(255, 244, 250, 0.6)')
  rect(0, 0, 500, 500)
  
  // rect da pergunta
  stroke('#f2274c')
  strokeWeight(2);
  fill('#F1ABB8')
  rect(20, 20, 460, 200, 20)
  
  
  // rect das alternativas
  // A
  fill('#F1ABB8')
  if((mouseX > 20 && mouseX < 20+460) && (mouseY > 270 && mouseY < 270+50)){
    // muda de cor caso o mouse esteja por cima da alternativa
    fill('#f24464')
  }
  rect(20, 270, 460, 50, 20)
  
  // B
  fill('#F1ABB8')
  if((mouseX > 20 && mouseX < 20+460) && (mouseY > 350 && mouseY < 350+50)){
    fill('#f24464')
  }
  rect(20, 350, 460, 50, 20)
  
}

// exibi a pergunta, as alternativas e indica a resposta 
function Perguntas_Respostas(){  
  if(pergunta == 1){
    // primeira pergunta
    noStroke()
    textSize(33)
    fill('rgb(255, 244, 250)')
    text("Qual das ciências abaixo analisa os vestígios materiais deixados por grupos humanos no passado?", 30, 40, 450, 190)
    
    // alternativas
    // A
    textSize(25)
    fill('#f24464')
    if((mouseX > 20 && mouseX < 20+460) && (mouseY > 270 && mouseY < 270+50)){
      // muda de cor caso o mouse esteja por cima da alternativa
      fill('rgb(255, 244, 250)')
    }
    text('ARQUEOLOGIA', 30, 285, 450, 40)
    
    // B
    fill('#f24464')
    if((mouseX > 20 && mouseX < 20+460) && (mouseY > 350 && mouseY < 350+50)){
      // muda de cor caso o mouse esteja por cima da alternativa
      fill('rgb(255, 244, 250)')
    }
    text('ARQUIVÍSTICA', 30, 365, 450, 40)
      
    
    // alternativa correta 
    resp = 'A';
  }
  else if(pergunta == 2){
    noStroke()
    textSize(24)
    fill('rgb(255, 244, 250)')
    text("O calendário mais comum no Ocidente é determinado pelo nascimento de Jesus Cristo. Todos os acontecimentos históricos que ocorreram antes do nascimento de Jesus são identificados com:", 28, 35, 450, 190)
    
    textSize(25)
    fill('#f24464')
    if((mouseX > 20 && mouseX < 20+460) && (mouseY > 270 && mouseY < 270+50)){
      // muda de cor caso o mouse esteja por cima da alternativa
      fill('rgb(255, 244, 250)')
    }
    text('a sigla a.C.', 30, 285, 450, 40)
    
    fill('#f24464')
    if((mouseX > 20 && mouseX < 20+460) && (mouseY > 350 && mouseY < 350+50)){
      // muda de cor caso o mouse esteja por cima da alternativa
      fill('rgb(255, 244, 250)')
    }
    text('a sigla d.C.', 30, 365, 450, 40)
    
    
    resp = 'A';
  }
  else if(pergunta == 3){
    noStroke()
    textSize(35)
    fill('rgb(255, 244, 250)')
    text("Dentre as opções abaixo, qual delas apresenta apenas exemplos de fontes escritas?", 30, 35, 450, 190)
    
    textSize(25)
    fill('#f24464')
    if((mouseX > 20 && mouseX < 20+460) && (mouseY > 270 && mouseY < 270+50)){
      // muda de cor caso o mouse esteja por cima da alternativa
      fill('rgb(255, 244, 250)')
    }
    text('rеvіѕtаѕ, lіvrоѕ е vеѕtіmеntаѕ.', 30, 285, 450, 40)
    
    fill('#f24464')
    if((mouseX > 20 && mouseX < 20+460) && (mouseY > 350 && mouseY < 350+50)){
      // muda de cor caso o mouse esteja por cima da alternativa
      fill('rgb(255, 244, 250)')
    }
    text('dіárіоѕ, јоrnаіѕ е lеіѕ.', 30, 365, 450, 40)
    
    
    resp = 'B';
  }
  else if(pergunta == 4){
    noStroke()
    textSize(20)
    fill('rgb(255, 244, 250)')
    text("Baseado nas informações reveladas pela imagem a seguir, é possível afirmar que os grupos humanos do período retratado:", 30, 35, 450, 190)
    image(caverna, 200, 110, 105, 105)
    
    textSize(16)
    fill('#f24464')
    if((mouseX > 20 && mouseX < 20+460) && (mouseY > 270 && mouseY < 270+50)){
      // muda de cor caso o mouse esteja por cima da alternativa
      fill('rgb(255, 244, 250)')
    }
    text('elaboraram as técnicas responsáveis pela fabricação do fogo.', 30, 285, 450, 40)
    
    fill('#f24464')
    if((mouseX > 20 && mouseX < 20+460) && (mouseY > 350 && mouseY < 350+50)){
      // muda de cor caso o mouse esteja por cima da alternativa
      fill('rgb(255, 244, 250)')
    }
    text('desenvolveram a arte rupestre no interior das cavernas.', 30, 365, 450, 40)
    
    
    resp = 'A';
  }
  else if(pergunta == 5){
    noStroke()
    textSize(18)
    fill('rgb(255, 244, 250)')
    text("Muitas vezes, o trabalho dos cientistas pode ser parecido com o de detetives, que usam pistas deixadas na cena de um crime para descobrir seu culpado. De certa forma, o trabalho do historiador também se aproxima ao do detetive, a exemplo de Sherlock Holmes, famoso personagem do escritor Arthur Conan Doyle. Por que o trabalho do historiador pode ser comparado ao de um detetive?", 30, 35, 450, 190)
    
    textSize(12)
    fill('#f24464')
    if((mouseX > 20 && mouseX < 20+460) && (mouseY > 270 && mouseY < 270+50)){
      // muda de cor caso o mouse esteja por cima da alternativa
      fill('rgb(255, 244, 250)')
    }
    text('Tanto o detetive quanto o historiador são especialistas em desvendar diversos tipos de crimes, ou situações de grande mistério.', 30, 285, 450, 40)
    
    fill('#f24464')
    if((mouseX > 20 && mouseX < 20+460) && (mouseY > 350 && mouseY < 350+50)){
      // muda de cor caso o mouse esteja por cima da alternativa
      fill('rgb(255, 244, 250)')
    }
    text('O historiador, assim como o detetive, precisa investigar, estudar, descobrir as pistas ou documentos, que chamamos de fontes históricas.', 30, 365, 450, 40)
    
    
    resp = 'B';
  }
  else if(pergunta == 6){
    noStroke()
    textSize(18)
    fill('rgb(255, 244, 250)')
    text("A característica necessária que permite que a carta de Pero Vaz de Caminha, escrita em 1º de maio de 1500, seja classificada como uma fonte histórica é:", 30, 35, 450, 190)
    image(carta, 200, 100, 105, 115)
    
    textSize(15)
    fill('#f24464')
    if((mouseX > 20 && mouseX < 20+460) && (mouseY > 270 && mouseY < 270+50)){
      // muda de cor caso o mouse esteja por cima da alternativa
      fill('rgb(255, 244, 250)')
    }
    text('o fato de ser um documento oficial produzido por um representante do rei.', 30, 280, 450, 40)
    
    fill('#f24464')
    if((mouseX > 20 && mouseX < 20+460) && (mouseY > 350 && mouseY < 350+50)){
      // muda de cor caso o mouse esteja por cima da alternativa
      fill('rgb(255, 244, 250)')
    }
    text('sua importância como registro da experiência humana no tempo.', 30, 365, 450, 40)
    
    
    resp = 'B';
  }
  else if(pergunta == 7){
    noStroke()
    textSize(35)
    fill('rgb(255, 244, 250)')
    text("Leia as alternativas e marque aquela que melhor define a História como ciência.", 30, 35, 450, 190)
    
    textSize(18)
    fill('#f24464')
    if((mouseX > 20 && mouseX < 20+460) && (mouseY > 270 && mouseY < 270+50)){
      // muda de cor caso o mouse esteja por cima da alternativa
      fill('rgb(255, 244, 250)')
    }
    text('História é a ciência que estuda os seres vivos e suas relações em sociedade.', 30, 278, 450, 40)
    
    fill('#f24464')
    if((mouseX > 20 && mouseX < 20+460) && (mouseY > 350 && mouseY < 350+50)){
      // muda de cor caso o mouse esteja por cima da alternativa
      fill('rgb(255, 244, 250)')
    }
    text('História é a ciência que estuda a ação dos homens no espaço ao longo do tempo.', 30, 358, 450, 40)
    
    
    resp = 'B';
  }
  else if(pergunta == 8){
    noStroke()
    textSize(42)
    fill('rgb(255, 244, 250)')
    text("Sobre o calendário e sua utilidade, marque a alternativa verdadeira.", 30, 35, 450, 190)
    
    textSize(18)
    fill('#f24464')
    if((mouseX > 20 && mouseX < 20+460) && (mouseY > 270 && mouseY < 270+50)){
      // muda de cor caso o mouse esteja por cima da alternativa
      fill('rgb(255, 244, 250)')
    }
    text('um calendário pode ser elaborado a partir da observação da natureza.', 30, 278, 450, 40)
    
    fill('#f24464')
    if((mouseX > 20 && mouseX < 20+460) && (mouseY > 350 && mouseY < 350+50)){
      // muda de cor caso o mouse esteja por cima da alternativa
      fill('rgb(255, 244, 250)')
    }
    text('o calendário indígena é o principal calendário utilizado no mundo atualmente.', 30, 358, 450, 40)
    
    
    resp = 'A';
  }
  else if(pergunta == 9){
    noStroke()
    textSize(42)
    fill('rgb(255, 244, 250)')
    text("Sobre o calendário e sua utilidade, marque a alternativa Falsa.", 30, 35, 450, 190)
    
    textSize(18)
    fill('#f24464')
    if((mouseX > 20 && mouseX < 20+460) && (mouseY > 270 && mouseY < 270+50)){
      // muda de cor caso o mouse esteja por cima da alternativa
      fill('rgb(255, 244, 250)')
    }
    text('o marco inicial do calendário gregoriano é o nascimento do Papa Gregório XIII.', 30, 278, 450, 40)
    
    fill('#f24464')
    if((mouseX > 20 && mouseX < 20+460) && (mouseY > 350 && mouseY < 350+50)){
      // muda de cor caso o mouse esteja por cima da alternativa
      fill('rgb(255, 244, 250)')
    }
    text('o calendário gregoriano é o mais utilizado como calendário oficial atualmente.', 30, 358, 450, 40)
    
    
    resp = 'A';
  }
  else if(pergunta == 10){
    noStroke()
    textSize(20)
    fill('rgb(255, 244, 250)')
    text("Leia a tirinha do personagem Armandinho e, em seguida, marque a alternativa que explica o motivo da pergunta do personagem.", 30, 35, 450, 190)
    image(tirinha, 100, 110, 300, 105)
    
    textSize(12)
    fill('#f24464')
    if((mouseX > 20 && mouseX < 20+460) && (mouseY > 270 && mouseY < 270+50)){
      // muda de cor caso o mouse esteja por cima da alternativa
      fill('rgb(255, 244, 250)')
    }
    text('Armandinho acredita que a história do descobrimento do Brasil deveria ter tanto a versão dos portugueses como a dos indígenas.', 30, 285, 450, 40)
    
    fill('#f24464')
    if((mouseX > 20 && mouseX < 20+460) && (mouseY > 350 && mouseY < 350+50)){
      // muda de cor caso o mouse esteja por cima da alternativa
      fill('rgb(255, 244, 250)')
    }
    text('Armandinho não entendeu o que foi explicado pelo professor, na sala de aula, sobre o descobrimento do Brasil.', 30, 365, 450, 40)
    
    
    resp = 'A';
  }
}

// verifica se o foi aprovado ou reprovado
function Ap_ou_Re(){
  background(a_r)
  
  fill('rgba(255, 244, 250, 0.6)')
  rect(0, 0, 500, 500)
  
  // calculando porcetagem de acerto
  ap_ou_re = ((pergunta-1)*50)/100
  
  fill('#f2274c')
  textStyle(BOLD)
  textAlign(CENTER);
  textSize(38)
  
  // se a pessoa acerta 50% ou mais das pergunta é aprovado
  if( pontos >= ap_ou_re ){
    text('VOCÊ FOI APROVADO(A)!\nCOM '+((pontos*100/(pergunta-1)).toFixed(0))+'% DE ACERTO', 250, 240)
  }
  // senão é reprovado
  else{
    textSize(35)
    text('VOCÊ FOI REPROVADO(A)!\nCOM '+((pontos*100/(pergunta-1)).toFixed(0))+'% DE ACERTO', 250, 190)
    
    stroke('#f2274c') // #f24464
    strokeWeight(3);
    fill('#F1ABB8')
    rect(20, 270, 460, 50, 20)
    
    textSize(40)
    fill('#f24464')
    noStroke()
    text('TENTE NOVAMENTE', 250, 310)
    
    // verifica se o mouse esta em cima do botão de tente novamente
    if((mouseX > 20 && mouseX < 20+460) && (mouseY > 270 && mouseY < 270+50)){
      
      stroke('#f2274c')
      strokeWeight(3);
      fill('#f24464')
      rect(20, 270, 460, 50, 20)
    
      fill('rgb(255, 244, 250)')
      noStroke()
      text('TENTE NOVAMENTE', 250, 310)
      
    }
  }  
  
  // chamando a função voltar
  voltar()
}

// função para a passagem de fase do fundo
function passagem_fase_fundo(){
  image(jogo, x1, 0, 500, 500)
  image(jogo, x2, 0, 500, 500)
  
  if(x1 > -500){
    x1 -= 5
    // caso erre o morango n é colhido
    if(auxM == 2){
      xm -=5
    }
  }
  if(x2 > 0){
    x2 -= 5
  }
}

// função para a passagem de fase do personagem
function passagem_fase_coelho(){ 
  if( x > 2.8 ){
    x -= 2.8
  }
}

// verifica o clique nas alternativas
function clique_respostas(){
  if((mouseX > 20 && mouseX < 20+460) && (mouseY > 270 && mouseY < 270+50)){
    // se clicar na alternativa A e ela for a correta ganha mais um ponto
    if(resp == 'A'){
      pontos++
      auxM = 1;
    }
    // se clicar na alternativa A e ela for a errada auxM que é uma variavel auxlixar para o morango recebe 2 para identificar o erro e o morango n ser colhido
    else{
      auxM = 2;
    }
    // vai para a proxima pergunta
    pergunta++;
    
    // tira o x de 285 para sair do if das perguntas
    x--
    tempo = 3
  }
  
  if((mouseX > 20 && mouseX < 20+460) && (mouseY > 350 && mouseY < 350+50)){
    if(resp == 'B'){
      pontos++
      auxM = 1;
    }
    else{
      auxM = 2;
    }
    pergunta++
    x--
    tempo = 3
  }
  
}

// função para os cliques do mouse
function mouseClicked(){
  // se estiver na tela de menu
  if(tela == 0){
    // parametros para o botão de jogar
    if((mouseX > 324 && mouseX < 487) && (mouseY > 437 && mouseY < 485)){
      tela = 1;
    }
    
    // parametros para o botão de instruçoes
    if((mouseX > 9 && mouseX < 173) && (mouseY > 437 && mouseY < 485)){
      tela = 2;
    }
    
    // parametros para o botão de creditos
    if((mouseX > 0 && mouseX < 261) && (mouseY > 0 && mouseY < 57)){
      tela = 3;
    }
  }
  
  // se estiver na tela das intruções, creditos ou do jogo
  else if((tela == 2 || tela == 3)){
    // parametros para o botão de voltar
    if((mouseX > 220 && mouseX < 220+60) && (mouseY > 437 && mouseY < 437+50)){
      tela = 0;
    }
  }
  
  // tela do jogo
  else if(tela == 1){
    // estiver no morango
    if(x == 285){
      clique_respostas();
    }
    // se estiver no ap ou re
    else if(pergunta > 3){
      // volta pra o menu, reseta os pontos, a auxiliar para passagem de fase, volta para a primeira pergunta e coloca o x do personagem no valor inicial 
      if((mouseX > 220 && mouseX < 220+60) && (mouseY > 437 && mouseY < 437+50)){
        tela = 0;
        pontos = 0;
        pergunta = 1;
        axp = 1;
        x=20
      }
      
      // botão de tentar novamente, reseta os pontos e volta para a primeira pergunta
      // botão de tentar novamente, reseta os pontos, a auxiliar para passagem de fase, volta para a primeira pergunta e coloca o x do personagem no valor inicial 
      if(pontos < ap_ou_re){
        if((mouseX > 20 && mouseX < 20+460) && (mouseY > 270 && mouseY < 270+50)){
          tela = 1;
          pontos = 0;
          pergunta = 1;
          axp = 1;
          x=20
        }
      }
    }
  }
}

// função do jogo
function Jogo(){
  background(jogo);
  
  // se perguntas for menor ou igual a 3 (total de perguntas no momento)
  if(pergunta <= 10){
    
    // se o auxiliar para passagem de fase for menor que a pergunta
    if(axp < pergunta){
      // chama a função de passagem de fase do fundo 
      passagem_fase_fundo()
      // e a função de passagem de fase com a movimentação do coelho 
      passagem_fase_coelho()
    }
    else{
      // colid com o morango
      image(morango, xm, 385, 71, 90)
      // chamando a função para o coelho andar se n estiver ocorrendo a passagem de fase
      movimentaCoelho()
      }
    // se o x do coelho ficar menor q 3 durante a passagem de fundo 
    if(x < 3){
      //Morango()
      // x recebe 0
      x = 0
      // auxiliar para passagem de fase atualiza seu valor para o valor da pergunta
      axp = pergunta;
      // variaveis que auxiliam na passagem de tela recebem seu valor inicial
      x1 = 0;
      x2 = 500;
      xm = 390
    }
    if(auxM == 2){
      image(morango, xm, 385, 71, 90)
    }
    // personagem
    image(coelho, x, 294, 163, 182);
    
    // se o coelho estiver no morango
    if(x == 285 ){
      if(tempo > 0){
        numeroFase()
        contagemRegressiva()
      }
      else{
        // chamando a função com as caixas das alternatinas e da pergunta
        rect_perguntas_alternativas()
      
        // chamando a função das perguntas e resposta
        Perguntas_Respostas()
      }
    }
    else{
      // tela com a quantidade de morangos colhidos
      fill('#f24464');
      textStyle(NORMAL);
      textAlign(CENTER);
      textSize(40);
      stroke('#f2274c')
      strokeWeight(2);
      text('Morangos colhidos', 250, 80);
      Morango(pontos, 105)
      
    }
    
  } 
  // se tiver acabado as perguntas
  else{
    // chama a função que verifica se foi aprovado ou reprovado
    Ap_ou_Re()
  }
}

// função das telas
function telas(){
  // tela do menu
  if(tela == 0){
    background(menu);
    noStroke();
    textAlign(CENTER);
    textStyle(BOLD);
    fill('rgb(242, 39, 76)')
    rect(28, 342, 444, 54, 12)
    fill('rgb(255, 230, 230)');
    textSize(30);
    text("MORANGOS NO MEU JARDIM", 250, 380);
     
  }
  
  // tela do jogo
  if(tela == 1){
    Jogo()
  }
  
  // tela de instruções
  if(tela == 2){
    background(instru);
    
    // chamando a função do botão de voltar
    voltar()
  }
  
  // tela dos creditos
  if(tela == 3){
    background(credito);
    
    // chamando a função do botão de voltar
    voltar()
  }
   
}

// função que desenha o jogo
function draw() {
  // chamando a função das telas
  telas();
  //posicaoDoMouse()
}

function posicaoDoMouse(){
  strokeWeight(0);
  stroke(0);
  fill(0);
  textSize(25);
  textStyle(NORMAL);
  text("x: "+mouseX+", y: "+mouseY, 80, 400)
}
