import { IUsers } from "../../users/types/IUsers";

export type IOrders = {
    id: string
    comment: string
    active: boolean
    userId?: string
    user?: IUsers
}