import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../services/storage.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  public logout(): void {
    this.authService.logout();
  }

}
