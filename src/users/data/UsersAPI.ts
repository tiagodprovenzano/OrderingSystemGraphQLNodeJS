import { FirebaseDB } from "../../service/firebase/FirebaseDB";
import { IUsers } from "../types/IUsers";
import allUsers from "./users.json";
import DataLoader from "dataloader";
export class UsersAPI extends FirebaseDB<IUsers> {
    constructor(){
        super('users')
    }

    getMany = async () => {
        return allUsers
    }

    
    private batchGetOne = async (idList: any) => {
        let users = [];
        
        console.log('idlist antes', idList);
        for (const id of idList) {
            users.push(allUsers.find(user => user.id === id))
        }
        console.log('users despois', users);
        
        return users
    }

    getOneDataLoader = new DataLoader(this.batchGetOne)

    getOne = async (id: string) => {
        console.log('id de usuário buscado', id)
        return allUsers.find(user => user.id === id)|| null
    }
}