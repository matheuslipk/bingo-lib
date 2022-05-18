export type ColumType = "B" | "I" | "N" | "G" | "O"

export interface CardInterface {
  id: string
  name: string
  balls: BallInterface[]
}

export interface BallInterface {
  id: string
  card_id: string
  colum: ColumType
  row:number
  value: number
  is_marked: boolean
}