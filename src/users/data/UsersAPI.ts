import { FirebaseDB } from "../../service/firebase/FirebaseDB";
import { IUsers } from "../types/IUsers";

export class UsersAPI extends FirebaseDB<IUsers> {
    constructor(){
        super('users')
    }
}