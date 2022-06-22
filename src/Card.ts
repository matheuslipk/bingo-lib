import { getRandomInt, makeid, newBall } from "./utils";
import { BallInterface, BallsCardV2Interface, CardInterface, ColumType } from "./types";

export default class Card {
  private id: string;
  private name:string;
  private balls: BallsCardV2Interface

  constructor(card?:CardInterface) {
    if (card) {
      this.id = card.id;
      this.name = card.name;
      this.balls = card.balls;
    } else {
      this.id = makeid(5);
      this.name = "";
      this.balls = {
        B: Card.generateColCard("B"),
        I: Card.generateColCard("I"),
        N: Card.generateColCard("N"),
        G: Card.generateColCard("G"),
        O: Card.generateColCard("O")
      }
    }
  }

  clear(){
    this.getAllBalls().B.map(b => b.is_marked = false)
    this.getAllBalls().I.map(b => b.is_marked = false)
    this.getAllBalls().N.map(b => b.is_marked = false)
    this.getAllBalls().G.map(b => b.is_marked = false)
    this.getAllBalls().O.map(b => b.is_marked = false)
  }


  getAllBalls(){
    return this.balls
  }

  getBall(colum:ColumType, row:number):BallInterface|undefined{
    return this.getAllBalls()[colum].find(
      (element) => element.row === row,
    );
  }

  getBallsByColum(colum:ColumType):BallInterface[]{
    return this.getAllBalls()[colum]
  }

  getBallsByRow(row:number):BallInterface[]{
    return [
      this.getAllBalls().B.find(b=>b.row===row) as BallInterface,
      this.getAllBalls().I.find(b=>b.row===row) as BallInterface,
      this.getAllBalls().N.find(b=>b.row===row) as BallInterface,
      this.getAllBalls().G.find(b=>b.row===row) as BallInterface,
      this.getAllBalls().O.find(b=>b.row===row) as BallInterface,
    ]
  }

  getBallsByDiagonal(d:0|1):BallInterface[]{
    const balls = this.getAllBalls()
    if(d===0){
      return [
        balls.B.find(b=>b.row===0) as BallInterface,
        balls.I.find(b=>b.row===1) as BallInterface,
        balls.N.find(b=>b.row===2) as BallInterface,
        balls.G.find(b=>b.row===3) as BallInterface,
        balls.O.find(b=>b.row===4) as BallInterface,
      ]
    }

    return [
      balls.B.find(b=>b.row===4) as BallInterface,
      balls.I.find(b=>b.row===3) as BallInterface,
      balls.N.find(b=>b.row===2) as BallInterface,
      balls.G.find(b=>b.row===1) as BallInterface,
      balls.O.find(b=>b.row===0) as BallInterface,
    ]
    
  }

  setMarkedBall(colum:ColumType, row:number, isMarked=true):boolean{
    const ball = this.getBall(colum, row)
    if(!ball){
      return false
    }
    ball.is_marked = isMarked
    return true
  }

  isCollMarked(colum:ColumType, ignoreBallCenter=false):boolean{
    if(ignoreBallCenter){
      return this.getBallsByColum(colum).every((b, i) => {
        if(i===2) return true

        return b.is_marked
      })
    }
    return this.getBallsByColum(colum).every(b => b.is_marked)
  }

  isRowMarked(row:number, ignoreBallCenter=false):boolean{
    if(ignoreBallCenter){
      return this.getBallsByRow(row).every((b, i) => {
        if(i===2) return true

        return b.is_marked
      })
    }
    return this.getBallsByRow(row).every(b => b.is_marked)
  }

  isDiagonalMarked(d:0|1):boolean{
    return this.getBallsByDiagonal(d).every(b => b.is_marked)
  }

  haveAnyRowMarked(ignoreBallCenter=false):boolean{
    if(this.isRowMarked(0)) return true
    if(this.isRowMarked(1)) return true
    if(this.isRowMarked(2, ignoreBallCenter)) return true
    if(this.isRowMarked(3)) return true
    if(this.isRowMarked(4)) return true

    return false
  }

  haveAnyColMarked(ignoreBallCenter=false):boolean{
    if(this.isCollMarked("B")) return true
    if(this.isCollMarked("I")) return true
    if(this.isCollMarked("N", ignoreBallCenter)) return true
    if(this.isCollMarked("G")) return true
    if(this.isCollMarked("O")) return true

    return false
  }

  haveAnyDiaginalMarked():boolean{
    if(this.isDiagonalMarked(0)) return true
    if(this.isDiagonalMarked(1)) return true

    return false
  }

  isFullMarked(ignoreBallCenter = false):boolean{
    return (
      this.isCollMarked("B", ignoreBallCenter) &&
      this.isCollMarked("I", ignoreBallCenter) &&
      this.isCollMarked("N", ignoreBallCenter) &&
      this.isCollMarked("G", ignoreBallCenter) &&
      this.isCollMarked("O", ignoreBallCenter)
    )
  }

  getBallsArray(){
    const balls = this.getAllBalls()
    return [
      ...balls.B,
      ...balls.I,
      ...balls.N,
      ...balls.G,
      ...balls.O,
    ]
  }

  getAmountMarked(){
    return this.getBallsArray().reduce((previos, current) => {
      if(current.is_marked) return previos + 1
      return previos
    }, 0)
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