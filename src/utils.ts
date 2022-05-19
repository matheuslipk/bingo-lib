import { BallInterface } from "./types";

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