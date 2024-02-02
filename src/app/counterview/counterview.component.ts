import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CounterserviceService } from '../counterservice.service';
import { AsyncPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-counterview',
  standalone: true,
  imports: [DatePipe, AsyncPipe],
  providers: [],
  inputs: [],
  templateUrl: './counterview.component.html',
  styleUrl: './counterview.component.scss'
})
export class CounterviewComponent implements OnChanges {


  _balance = 0;
  @Input()
    set balance(v: number) {
      this._balance = v;
      this.counterServ.setBalance(v);
    }
    get balance(): number {
      return this._balance;
    }

  // @Input() balance: number = this.counterServ.getBalanceValue();;
  // aname!: string;

  currentDate = new BehaviorSubject<Date>(new Date(Date.now()));
  // balance = 50;
  // @Input('balance') balance: number = 0
  // public get() {
  //   return this.balance;
  // }
  
  // public set(v : number) {
  //   this.balance = v;
  // }

  constructor(private counterServ: CounterserviceService) {
  }

  public ngOnInit() {
    console.log('in oninit');
    this.balance = this.counterServ.getBalanceValue();
    // this.counterServ.currentBalance.subscribe(v => this.balance = v);
    
  }

  public ngOnChanges(changes: SimpleChanges) {
    console.log('in onchanges');
    console.log(changes);
    for (let prop in changes) {
      console.log(prop);
      if (prop === 'balance') {
        console.log('balance changed');
        console.log(changes[prop].previousValue + ' -> ' + changes[prop].currentValue);
        console.log('First change? ' + changes[prop].firstChange);
      }
    }
  }

  public updateBalance() {
    this.balance = this.counterServ.getBalanceValue();
    // this.balance = this.counterServ.testBalance(1701309100835);
  }

  public saveMoney() {
    this.balance += this.counterServ.increment;
    this.counterServ.changeBalanceBy(this.counterServ.increment);
    console.log(this.counterServ.getBalanceValue());
    // this.updateBalance();
  }

  public spendMoney() {
    this.balance -= this.counterServ.decrement;
    const changing = - this.counterServ.decrement;
    console.log('changing: ' + changing);
    this.counterServ.changeBalanceBy(- this.counterServ.decrement);
    console.log(this.counterServ.getBalanceValue());
    console.log('with const');
    this.counterServ.changeBalanceBy(changing);
    console.log(this.counterServ.getBalanceValue());
    // this.updateBalance();
  }

  public addDay() {
    let newDate = new Date(this.currentDate.getValue());
    newDate.setDate(newDate.getDate() + 1);
    this.currentDate.next(newDate);
    // this.currentDate.next(new Date().setDate(this.currentDate.getValue().getDate() + 1));
    this.updateBalance();
  }

  public subtractDay() {
    let newDate = new Date(this.currentDate.getValue());
    newDate.setDate(newDate.getDate() - 1);
    this.currentDate.next(newDate);
    this.updateBalance();

    // this.currentDate.next(new Date(this.currentDate.getValue()). - 1));
  }
}
