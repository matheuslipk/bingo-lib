import Card from "./Card";
import { BallInterface, CardInterface, ColumType } from "./types";

export function getRandomInt(min=0, max=75) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const newBall = ({
  colum,
  row,
  value,
  is_marked = false,
}:Omit<BallInterface, "id">):BallInterface => ({
  id: makeid(),
  colum,
  row,
  value,
  is_marked,
});

export function makeid(length = 6) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  for (let i = 0; i < length; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

export function getBall(balls:BallInterface[], colum:ColumType, row:number):BallInterface|undefined{
  return balls.find(
    (element) => element.row === row && element.colum === colum,
  );
}

export function getBallsByColum(balls:BallInterface[], colum:ColumType):BallInterface[]{
  return balls.filter(b => b.colum===colum)
}

export function getBallsByRow(balls:BallInterface[], row:number):BallInterface[]{
  return balls.filter(b => b.row === row)
}

export function getBallsByDiagonal(balls:BallInterface[], d:0|1):BallInterface[]{
  if(d===0){
    return balls.filter(b => {
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

  return balls.filter(b => {
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

export function getBallById(balls:BallInterface[], id:string):BallInterface | undefined {
  return balls.find((element) => element.id === id);
}

export function setMarkedBallById(balls:BallInterface[], ballId:string):boolean{
  const ball = getBallById(balls, ballId)
  if(!ball){
    return false
  }
  ball.is_marked = true
  return true
}

export function setMarkedBall(balls:BallInterface[], colum:ColumType, row:number, isMarked=true):boolean{
  const ball = getBall(balls, colum, row)
  if(!ball){
    return false
  }
  ball.is_marked = isMarked
  return true
}

export function isCollMarked(balls:BallInterface[], colum:ColumType):boolean{
  return getBallsByColum(balls, colum).every(b => b.is_marked)
}

export function isRowMarked(balls:BallInterface[], row:number):boolean{
  return getBallsByRow(balls, row).every(b => b.is_marked)
}

export function isDiagonalMarked(balls:BallInterface[], d:0|1):boolean{
  return getBallsByDiagonal(balls, d).every(b => b.is_marked)
}

export function haveAnyRowMarked(balls:BallInterface[]):boolean{
  if(isRowMarked(balls, 0)) return true
  if(isRowMarked(balls, 1)) return true
  if(isRowMarked(balls, 2)) return true
  if(isRowMarked(balls, 3)) return true
  if(isRowMarked(balls, 4)) return true

  return false
}

export function haveAnyColMarked(balls:BallInterface[]):boolean{
  if(isCollMarked(balls, "B")) return true
  if(isCollMarked(balls, "I")) return true
  if(isCollMarked(balls, "N")) return true
  if(isCollMarked(balls, "G")) return true
  if(isCollMarked(balls, "O")) return true

  return false
}

export function haveAnyDiaginalMarked(balls:BallInterface[]):boolean{
  if(isDiagonalMarked(balls, 0)) return true
  if(isDiagonalMarked(balls, 1)) return true

  return false
}

export function isFullMarked(balls:BallInterface[]):boolean{
  return balls.every(b => b.is_marked)
}

export function getAmountMarked(balls:BallInterface[]){
  return balls.reduce((previos, current) => {
    if(current.is_marked) return previos + 1
    return previos
  }, 0)
}

export function newCard(card?: CardInterface):Card {
  return new Card(card)
}