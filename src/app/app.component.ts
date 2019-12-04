import { Component } from '@angular/core';
import { DatabaseService } from './data-access/database.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from './data-access/entities/user.entity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  users: User[] = [];
  displayedColumns: string[] = ['Id', 'FirstName', 'LastName', 'Age', 'Sex'];

  firstName: string;
  lastName: string;
  age: string;

  constructor(
    private databaseService: DatabaseService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');
    this.getUsers();
  }

  getUsers() {
    this.databaseService.connection
      .then(() => User.find())
      .then(users => {
        this.users = users;
      });
  }

  addUser() {
    const user = new User();

    user.FirstName = this.firstName;
    user.LastName = this.lastName;
    user.Age = +this.age;

    this.databaseService.connection
      .then(() => user.save())
      .then(() => {
        this.getUsers();
      })
      .then(() => {
        this.firstName = '';
        this.lastName = '';
        this.age = '';
      });
  }
}
