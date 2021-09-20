import { IResolvers } from "@graphql-tools/utils";
import { IContext } from "../..";
import { IUsers } from "../types/IUsers";

async function getUsers(_root: any, _args: any, {usersAPI}: IContext ) {
    return await usersAPI.getMany()
}

async function getUser(_root: any, {id}: {id: string}, {usersAPI}: IContext ) {
    return await usersAPI.getOne(id)
}

async function addUser(_root: any, {user}: {user: Omit<IUsers, 'id'>}, {usersAPI}: IContext ) {
    return await usersAPI.add(user)
}

export const usersResolvers: IResolvers = {
    Query:{
        users: getUsers,
        user: getUser
    },

    Mutation: {
        addUser
    }
}

