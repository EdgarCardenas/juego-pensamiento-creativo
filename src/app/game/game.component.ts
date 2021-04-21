import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Player } from '../models/player.interface';
import { Question } from '../models/question.interface';
import { QuestionComponent } from '../question/question.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  players: Player[] = [];
  round: number = 1;
  turn: number = 1;
  numberOfPlayers: number = 0;
  questionCounter: number = 0;
  message: string = '';
  messageColor: string = '';
  isGameOver: boolean = false;
  max_question: number = 0;


  CORRECT_ANSWER: string = '¡Bien hecho, sigue así!';
  WRONG_ANSWER: string = '¡A la próxima seguro aciertas!';
  CORRECT_ANSWER_COLOR: string = '#198754';
  WRONG_ANSWER_COLOR: string = '#dc3545';
  MAX_OF_ROUNDS: number = 5;

  winners: number[] = [];

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {

      var numberOfPlayers = params['numberOfPlayers'];
      this.numberOfPlayers = numberOfPlayers;

      for (var i = 0; i < numberOfPlayers; i++) {
        var newPlayer: Player = {
          points: 0
        }

        this.players.push(newPlayer);
      }
    });

    this.shuffleQuestions();

    this.max_question = this.numberOfPlayers * this.MAX_OF_ROUNDS;
  }

  showModal(): void {
    var modalRef = this.modalService.open(QuestionComponent);
    modalRef.componentInstance.currentPlayerNumber = this.turn;
    modalRef.componentInstance.currentQuestionNumber = this.round;
    modalRef.componentInstance.currentQuestion = this.questions[this.questionCounter];

    this.questionCounter++;

    modalRef.result.then(
      (data) => {

        //Actualizar puntajes
        if (data) {
          this.players[this.turn - 1].points++;
          this.message = this.CORRECT_ANSWER;
          this.messageColor = this.CORRECT_ANSWER_COLOR;
        }
        else {
          this.message = this.WRONG_ANSWER;
          this.messageColor = this.WRONG_ANSWER_COLOR;
        }

        //Cambiar turno 
        this.turn++
        

        //Cambiar ronda
        if (this.turn > this.numberOfPlayers) {
          this.turn = 1;
          this.round++;
        }

        //Terminar juego
        this.checkGameOver();
      });
  }

  checkGameOver(): void {
    this.isGameOver = (this.questionCounter == this.max_question);
    
    //Cuales jugadores llegaron a la meta
    if(this.isGameOver){
      var maxPoints = 5;
      do{
      
        this.players.forEach(player => {
          if(player.points == maxPoints){
            this.winners.push(
              this.players.indexOf(player)
            );
          }
        });

        maxPoints--;
      }while(this.winners.length == 0);
    }
  }

  shuffleQuestions() {
    for (var i = this.questions.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = this.questions[i];
      this.questions[i] = this.questions[j];
      this.questions[j] = temp;
    }
  }


  questions: Question[] = [
    {
      "text": "El número de mesas en un salón de clases \nes el doble del número de sillas más 6 \nsi en el salón hay 36 muebles entre mesas y sillas. \n¿Cuántas mesas y sillas hay?",
      "A": "23",
      "B": "42",
      "C": "10",
      "D": "52",
      "answer": "C"
    },
    {
      "text": "Al preguntar a una abuela por sus nietos dice: \n“si al quíntuple de años que tiene se le quita \nel doble de los años que tenía hace dos\n y se le resta 6, tendrás la edad actual \nde mi nieto el menor”. ¿Qué edad tiene el nieto?",
      "A": "5",
      "B": "7",
      "C": "12",
      "D": "1",
      "answer": "D"
    },
    {
      "text": "\"El triple de un número más su tercera parte es 70. \n¿Qué número es?\"",
      "A": "32",
      "B": "21",
      "C": "17",
      "D": "29",
      "answer": "B"
    },
    {
      "text": "Un número excedido en 8 es igual\n  a su doble excedido en 32. ¿Cuál es el número?",
      "A": "44",
      "B": "-16",
      "C": "64",
      "D": "-24",
      "answer": "D"
    },
    {
      "text": "Calcula el numero natural que sumado a\n  su siguiente da 157",
      "A": "78",
      "B": "55",
      "C": "34",
      "D": "99",
      "answer": "A"
    },
    {
      "text": "Calcula dos números impares \n consecutivos tales que la suma es 36.",
      "A": "13 y 15",
      "B": "24 y 27",
      "C": "17 y19",
      "D": "21 y 23",
      "answer": "C"
    },
    {
      "text": "La suma de cinco números pares \n consecutivos es igual a 120 de qué número se trata​",
      "A": "20,22,24,26,28",
      "B": "2,4,6,8,10",
      "C": "10,20,30,40,50",
      "D": "2,8,10,28,22",
      "answer": "A"
    },
    {
      "text": "Un muchacho le dijo a otro. “adivina cuántos años\n tengo si a mi edad actual le restas 2/3 \nde la misma y te quedan 3.",
      "A": "7",
      "B": "8",
      "C": "9",
      "D": "12",
      "answer": "C"
    },
    {
      "text": "A una fiesta de cumpleaños asisten 64 personas \nentre mujeres y hombres si el número \nde mujeres es 7 más que el doble de hombres,\n ¿cuántas mujeres asistieron?",
      "A": "35",
      "B": "64",
      "C": "50",
      "D": "45",
      "answer": "D"
    },
    {
      "text": "El costo de una camisa menos la quinta \nparte de ese costo es igual a $144\n¿cuanto cuesta la camisa?",
      "A": "180",
      "B": "420",
      "C": "210",
      "D": "369",
      "answer": "A"
    },
    {
      "text": "En un tren viajan 480 personas. si tiene 12 vagones cuantas personas viajan en cada vagon ",
      "A": "39",
      "B": "40",
      "C": "42",
      "D": "37",
      "answer": "B"
    },
    {
      "text": "Un padre tiene 47 años y su hijo 11. ¿Cuántos años han de transcurrir para que la edad del padre sea triple que la del hijo?",
      "A": "15",
      "B": "10",
      "C": "7",
      "D": "6",
      "answer": "C"
    },
    {
      "text": "Juan compra 12 dulces por 30 pesos. Si al día siguiente el precio de cada dulce se\r\nincremento a 6 pesos, cuanto se ahorro Juan por dulce al comprarlos con el precio anterior.\r",
      "A": "3",
      "B": "2",
      "C": "3.5",
      "D": "2.5",
      "answer": "C"
    },
    {
      "text": "¿Qué edad tiene Rosa sabiendo que dentro de 56 años tendrá el quíntuplo de su edad actual?",
      "A": "15",
      "B": "13",
      "C": "20",
      "D": "23",
      "answer": "A"
    },
    {
      "text": "En un número de tres dígitos, el dígito de las centenas es el triple de las decenas y el dígito\r\nde las decenas es la mitad del dígito de las unidades. Determina cual es el dígito de las\r\nunidades si la suma de los tres dígitos es 12.\r",
      "A": "2",
      "B": "4",
      "C": "6",
      "D": "8",
      "answer": "B"
    },
    {
      "text": " Se realiza una encuesta a 600 clientes de una cafetería sobre el tipo de café que\nmás le agrada, y los resultados son los siguientes:  Moka16%, Americano20%, Express12%, Capuchino52% .  ¿cuantos clientes toman Express?",
      "A": "72",
      "B": "120",
      "C": "46",
      "D": "80",
      "answer": "A"
    },
    {
      "text": "Un depósito contiene 30 litros de agua si se reparte todo el agua en recipientes de 6 litros cada 1 ¿cuántos recipientes se llenarán de agua?",
      "A": "3",
      "B": "7",
      "C": "5",
      "D": "10",
      "answer": "C"
    },
    {
      "text": "Si el promedio de dos numeros es de 47 y uno de ellos es 24, ¿Cual es el otro numero?",
      "A": "45",
      "B": "50",
      "C": "65",
      "D": "70",
      "answer": "D"
    },
    {
      "text": "En el salón de mi casa tengo dos aulas en la primera y pericos y en la segunda de cotorras sabiendo que en cada jaula tengo el mismo número de pájaros y que en total tengo 10 pájaros ¿cuántos pájaros hay en cada jaula? ",
      "A": "5",
      "B": "6",
      "C": "4",
      "D": "3",
      "answer": "A"
    },
    {
      "text": "Hallar un número de dos cifras sabiendo que la suma de las cifras es 12 y que la primera de ellas es el triple de la segunda.",
      "A": "57",
      "B": "93",
      "C": "84",
      "D": "75",
      "answer": "B"
    },
    {
      "text": "Encontrar dos números cuya suma sea 45 y cuya resta sea 21.\n\n",
      "A": "12 ,33",
      "B": "15.36",
      "C": "11.41",
      "D": "10.33",
      "answer": "A"
    },
    {
      "text": "Un bate y una pelota de beisbol cuestan $1,10.\nEl bate cuesta un dólar más que la pelota.\n¿Cuánto cuesta la pelota?",
      "A": "10 c",
      "B": "90 c",
      "C": "5 c",
      "D": "15 c",
      "answer": "D"
    },
    {
      "text": "Calcula tres números consecutivos cuya suma sea 51.",
      "A": "15,16,17",
      "B": "17,18,19",
      "C": "16,17,18",
      "D": "19,20,21",
      "answer": "C",
      
    },
    {
      "text": "Calcula el número que se triplica al sumarle 26.",
      "A": "16",
      "B": "14",
      "C": "18",
      "D": "20",
      "answer": "A"
    },
    {
      "text": "Si al doble de un número le sumas su mitad resulta 90. ¿Cuál es el número?",
      "A": "38",
      "B": "36",
      "C": "34",
      "D": "40",
      "answer": "B"
    },
    {
      "text": "En un almacen hay 3703 libros, para repartir entre 23 librerias ¿Cuantos libros le tocara a cada una?",
      "A": "160",
      "B": "152",
      "C": "181",
      "D": "161",
      "answer": "D"
    },
    {
      "text": "Si 4 kilos de azucar cuestan 85 pesos ¿cuanto costara 1.5kilos?",
      "A": "31.87",
      "B": "33.50",
      "C": "28.90",
      "D": "30",
      "answer": "A"
    },
    {
      "text": "Supon que cada dia un murcielago come el doble de mosquitos que comio el diaanterior más 1. si comio 4 mosquitos hoy, ¿Cuantos comera dentro de 3 dias?",
      "A": "38",
      "B": "27",
      "C": "50",
      "D": "41",
      "answer": "D"
    },
    {
      "text": "En un almacen hay 262 sacos de papas. Cada saco pesa 83 kg. si se vende la mitad de los sacos ¿cuantos kg de papas quedaron sin vender?",
      "A": "10000",
      "B": "9830",
      "C": "10873",
      "D": "9833",
      "answer": "C"
    },
    {
      "text": "Si una vaca come 7kg de hierba al dia ¿cuantas vacas se podra alimentar con 231kg de hierba?",
      "A": "33",
      "B": "43",
      "C": "23",
      "D": "45",
      "answer": "A"
    },
    {
      "text": "Tres hermanos se reparten $1300. El mayor recibe doble que el mediano y este el cuádruple que el pequeño. ¿Cuánto recibe el pequeño?",
      "A": "$800",
      "B": "$400",
      "C": "$200",
      "D": "$100 ",
      "answer": "D"
    },
    {
      "text": "Un padre tiene 47 años y su hijo 11. ¿Cuántos años han de transcurrir para que la edad del padre sea triple que la del hijo?",
      "A": "11",
      "B": "7",
      "C": "14",
      "D": "33",
      "answer": "B"
    },
    {
      "text": "En un rectángulo la base mide 18 cm más que la altura y el perímetro mide 76 cm. ¿Cuánto mide la base del rectángulo?",
      "A": "10 cm",
      "B": "28 cm",
      "C": "18 cm",
      "D": "40 cm",
      "answer": "B"
    },
    {
      "text": "El número de mesas en un salón de clase es el doble del número de sillas más 6 si en el salón hay 36 muebles entre mesas y sillas.  ¿Cuántas sillas hay?",
      "A": "26",
      "B": "36",
      "C": "10",
      "D": "3",
      "answer": "C"
    },
    {
      "text": "“si al quíntuple de años que tiene se le quita el doble de los años que tenía hace dos años menos 6, tendrás la edad actual de mi hijo”",
      "A": "1",
      "B": "6",
      "C": "2",
      "D": "4",
      "answer": "A"
    },
    {
      "text": "Un paseador de perros pasea por la tarde 4 más que a la mañana, y a la noche el triple que en el resto del día. En total son 160 perros, ¿cuántos pasea por la tarde?",
      "A": "18",
      "B": "24",
      "C": "160",
      "D": "22",
      "answer": "D"
    },
    {
      "text": "El dueño de un restaurante Español mezcla vino de 0,8 € el litro con vino\r\nde 3,5€ el litro. Si se han obtenido 300 litros de mezcla y quiere\r\nvenderlo a 2,6 € el litro, ¿cuántos litros se han utilizado del vino más caro?",
      "A": "150",
      "B": "200",
      "C": "100",
      "D": "250",
      "answer": "B"
    }
  ]
}
