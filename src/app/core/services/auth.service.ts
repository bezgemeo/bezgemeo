import {Injectable} from '@angular/core';
import firebase from "firebase";
import {environment} from "../../../environments/environment";
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {first, tap} from "rxjs/operators";
import {StorageService} from "./storage.service";
import {IUser} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public markedLoggedIn: boolean = false;
  public markedAdmin: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private storageService: StorageService,
    private router: Router
  ) {
    firebase.initializeApp(environment.firebase);
  }

  public register(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(_value => {
        this.router.navigateByUrl('/home');
      })
      .catch(_error => {
        this.router.navigateByUrl('/login');
      });
  }

  public login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(_value => {
        this.router.navigateByUrl('/home');
      })
      .catch(_err => {
        this.router.navigateByUrl('/login');
      });
    this.checkAdmin(email);
  }

  public logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });

    this.checkUser().unsubscribe();
  }

  public createDbItem(email: string, password: string, age: string, name: string, admin: boolean = false) {
    const users = firebase.database().ref('users');
    const user = users.push();
    user.set({
      username: name,
      email,
      age,
      id: user.key,
      admin
    });
  }

  public isLoggedIn() {
    return this.afAuth.authState.pipe(first());
  }

  public checkUser() {
    return this.isLoggedIn().pipe(
      tap(user => {
        this.markedLoggedIn = !!user;
      })
    ).subscribe();
  }

  public async getAllUsers() {
    const res = await firebase.database().ref('users').get();
    return Object.values(res.val());
  }

  public async checkAdmin(email: string) {
    await this.getAllUsers().then(
      (users) => {
        users.map(user => {
          // @ts-ignore
          if (user.email === email) {
            this.markedAdmin = true;
          }
        })
      }
    )
  }

  public deleteUser(id: string) {
    firebase.database().ref(`users/${id}`).remove();
  }

  public editUser(id: string, email: string, username: string, age: string, admin: boolean) {
    firebase.database().ref(`users/${id}`)
      .update({
      id,
      admin,
      age,
      email,
      username
    });
  }


}
