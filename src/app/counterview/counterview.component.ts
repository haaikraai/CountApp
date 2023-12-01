import { Component } from '@angular/core';
import { CounterserviceService } from '../counterservice.service';
import { AsyncPipe } from '@angular/common';
import { Input } from '@angular/core';

@Component({
  selector: 'app-counterview',
  standalone: true,
  imports: [],
  templateUrl: './counterview.component.html',
  styleUrl: './counterview.component.scss'
})
export class CounterviewComponent {

  
  @Input('balance') balance: number = 0
  public get() {
    return this.balance;
  }
  
  public set(v : number) {
    this.balance = v;
  }

  constructor(private counterServ: CounterserviceService) {
  }

  public ngOnInit() {
    console.log('in oninit');
    this.balance = this.counterServ.testBalance(1701309100835); 
  }

  public updateBalance() {
    this.balance = this.counterServ.testBalance(this.balance);
    // this.balance = this.counterServ.testBalance(1701309100835);
  }

  public saveMoney() {
    this.counterServ.balance += this.counterServ.increment;
    this.updateBalance();

  }

  public spendMoney() {
    this.counterServ.balance -= this.counterServ.decrement;
    this.updateBalance();
  }

}
