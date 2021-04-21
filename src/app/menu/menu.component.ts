import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public numberOfPlayers = 1;
  public validNumberOfPlayers = true;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  validateNumberOfPlayers(): void{
    this.validNumberOfPlayers = (this.numberOfPlayers < 9 && this.numberOfPlayers > 0);
  }

  onStartClick(): void{
    this.startGame();
  }

  async startGame(): Promise<void>{
    await this.router.navigate(
      ['game'],
      {
        queryParams: {numberOfPlayers: this.numberOfPlayers}
      }
      );
  }
}
