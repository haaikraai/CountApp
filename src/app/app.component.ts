import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CounterserviceService } from './counterservice.service';
import { CounterviewComponent } from './counterview/counterview.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CounterviewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'CountApp';
  balance = this.counterServ.balance;

  constructor(private counterServ: CounterserviceService) {
  }

  public ngOnInit() {
    // this.balance = this.counterServ.balance;
    // Testing:
    this.balance = 156099;
  }
}