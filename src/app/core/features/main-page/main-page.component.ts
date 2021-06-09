import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {IUser} from "../../interfaces/user";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  public usersList: unknown[] = [];
  public hasActions: boolean = false;
  public displayedColumns: string[] = ['name', 'age', 'email', 'actions'];

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.setDisplayedColumns();
  }

  public setDisplayedColumns() {
    this.hasActions = this.authService.markedAdmin;
  }

  public getUsers():void {
    this.authService.getAllUsers()
      .then((res) => this.usersList = res);
  }

  public deleteUser(data: IUser): void {
    if (!data.admin){
      this.authService.deleteUser(data.id);
      this.getUsers();
    }
  }

  public editUser(data: IUser): void {
    if (!data.admin){
      this.authService.editUser(data.id, data.email, data.username, data.age, data.admin);
      this.getUsers();
    }
  }

}
