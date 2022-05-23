export type ColumType = "B" | "I" | "N" | "G" | "O"

export interface BallInterface {
  id: string
  colum: ColumType
  row:number
  value: number
  is_marked: boolean
}

export interface CardInterface {
  id: string
  name: string
  balls: BallsCardV2Interface
}

export interface BallsCardV2Interface {
  B: BallInterface[]
  I: BallInterface[]
  N: BallInterface[]
  G: BallInterface[]
  O: BallInterface[]
}