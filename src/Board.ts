import { getRandomInt, makeid, newBall } from "./utils";
import { BallInterface, CardInterface, ColumType } from "./types";

export default class Card {
  private id: string;
  private name:string;
  private balls:BallInterface[];

  constructor(card?:CardInterface) {
    if (card) {
      this.id = card.id;
      this.name = card.name;
      this.balls = card.balls;
    } else {
      this.id = makeid(5);
      this.name = "";
      this.balls = [
        ...Card.generateColCard('B'),
        ...Card.generateColCard('I'),
        ...Card.generateColCard('N'),
        ...Card.generateColCard('G'),
        ...Card.generateColCard('O'),
      ];
    }
  }

  getBall(colum:ColumType, row:number):BallInterface|undefined{
    return this.balls.find(
      (element) => element.row === row && element.colum === colum,
    );
  }

  getBallsByColum(colum:ColumType):BallInterface[]{
    return this.balls.filter(b => b.colum===colum)
  }

  getBallsByRow(row:number):BallInterface[]{
    return this.balls.filter(b => b.row === row)
  }

  getBallsByDiagonal(d:0|1):BallInterface[]{
    if(d===0){
      return this.balls.filter(b => {
        if( (b.colum==="B" && b.row===0) || 
            (b.colum==="I" && b.row===1) ||
            (b.colum==="N" && b.row===2) || 
            (b.colum==="G" && b.row===3) ||
            (b.colum==="O" && b.row===4)
          ){
          return true
        } 
      })
    }

    return this.balls.filter(b => {
      if( (b.colum==="O" && b.row===0) || 
          (b.colum==="G" && b.row===1) ||
          (b.colum==="N" && b.row===2) || 
          (b.colum==="I" && b.row===3) ||
          (b.colum==="B" && b.row===4)
        ){
        return true
      } 
    })
    
  }

  getBallById(id:string):BallInterface | undefined {
    return this.balls.find((element) => element.id === id);
  }

  setMarkedBallById(ballId:string):boolean{
    const ball = this.getBallById(ballId)
    if(!ball){
      return false
    }
    ball.is_marked = true
    return true
  }

  setMarkedBall(colum:ColumType, row:number, isMarked=true):boolean{
    const ball = this.getBall(colum, row)
    if(!ball){
      return false
    }
    ball.is_marked = isMarked
    return true
  }

  isCollMarked(colum:ColumType):boolean{
    return this.getBallsByColum(colum).every(b => b.is_marked)
  }

  isRowMarked(row:number):boolean{
    return this.getBallsByRow(row).every(b => b.is_marked)
  }

  isDiagonalMarked(d:0|1):boolean{
    return this.getBallsByDiagonal(d).every(b => b.is_marked)
  }

  isFullMarked():boolean{
    return this.balls.every(b => b.is_marked)
  }

  toObject():CardInterface{
    return {
      id: this.id,
      name: this.name,
      balls: this.balls,
    }
  }

  private static generateColCard(colum:ColumType) {
    const balls:BallInterface[] = [];
    let indexColum=0;
    if (colum === 'B') {
      indexColum = 0;
    }
    if (colum === 'I') {
      indexColum = 1;
    }
    if (colum === 'N') {
      indexColum = 2;
    }
    if (colum === 'G') {
      indexColum = 3;
    }
    if (colum === 'O') {
      indexColum = 4;
    }

    const min = indexColum * 15 + 1;
    const max = (indexColum + 1) * 15;

    for (let position = 0; position < 5; position += 1) {
      const newValue = getRandomInt(min, max);
      if (!Card.valueExistInColum(newValue, balls)) {
        balls.push(
          newBall({
            colum,
            row: position,
            value: newValue,
            is_marked: false
          }),
        );
      } else {
        position -= 1;
      }
    }
    return balls;
  }

  private static valueExistInColum(value:number, balls:BallInterface[] = []) {
    for (let i = 0; i < balls.length; i += 1) {
      if (value === balls[i].value) {
        return true;
      }
    }
    return false;
  }
}