import { Injectable } from "@angular/core";
import { User } from "../interfaces/user.interface";
import { max } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {

    static dummyUserList: Array<User> = [
        {
            id: 1,
            email: 'djermaaa@gmail.com',
            password: 'testtest',
            birthDate: new Date("1999-03-01 15:00")
        },
        {
            id: 2,
            email: 'itsjohnny@gmail.com',
            password: 'testpass123',
            birthDate: new Date("1999-03-01 15:00")
        },
        {
            id: 3,
            email: 'mims@gmail.com',
            password: 'testpass123',
            birthDate: new Date("1999-07-28 20:00")
        }]

        currentUser: User | null = null;
        isLoggedIn = false;

        constructor (private router: Router){
            const user = localStorage.getItem('currentUser');
            if (user) {
                this.currentUser = JSON.parse(user);
                this.isLoggedIn = true;
            }
        }

        isAuthenticated(): boolean{
            return this.isLoggedIn;
        }

        login(email: string, password: string): boolean {
            const user = AuthService.dummyUserList.find(u => u.email == email && u.password == password);
            if(user){
                this.currentUser = user;
                this.isLoggedIn = true;
                localStorage.setItem('currentUser', JSON.stringify(user));
                return true;
            }
            return false;
        }

        logout(): void{ 
            this.currentUser = null;
            this.isLoggedIn = false;
            localStorage.removeItem('currentUser');
        }



        // * korisnicko ime getUsername
        getUsername(user: User): string{
            return user.email;
        }

        // * id korisnika getUserById
        getUserById(id: number): User | null {
            const foundUser = AuthService.dummyUserList.find(user => user.id == id);
            if(foundUser) {
                this.currentUser = foundUser;
            }
            return foundUser || null;
        }

        // * prikaz korisnika putem mejla
        getUser(userEmail: string): User | undefined {
            const user = AuthService.dummyUserList.find(userToFind => userToFind.email == userEmail);

            if(user) {
                this.currentUser = user;
            }
            return user;
        }

        // * provera lozinke
        isPasswordCorrect(userEmail: string, userPass: string): boolean {
            return AuthService.dummyUserList.some(userToFind => 
                (userToFind.email === userEmail && userToFind.password === userPass));
        }

        //* registruj korisnika
        registerUser(
            email: string,
            password: string,
            birthDate: Date,
            name: string,
            surname: string,
            phoneNumber: string,
            address: string,
            favGenre: string[],
        ): User {

            var maxId: number = 0;
            AuthService.dummyUserList.forEach(user =>
                {
                    if(maxId < user.id){
                        maxId = user.id;
                    }
                });

            var id = ++maxId;
            var user: User = {id, email, password, birthDate, name, surname, phoneNumber, address, favGenre};

            AuthService.dummyUserList.push(user);
            
            localStorage.setItem('currentUser', JSON.stringify(AuthService.dummyUserList));

            this.currentUser = user;

            console.log(user);
            return user;
        }
}