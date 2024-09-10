import { User } from "../entity/user/user"

export interface UserGateway {
    save(user: User): Promise<void> /// save database

    fetch(): Promise<User[]> /// get list from database

    fetchByEmail(email: string): Promise<User> // get one user database  

    fetchById(id: string): Promise<User> // get one user database  
}