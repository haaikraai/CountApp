import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { CounterserviceService } from '../counterservice.service';
import { AsyncPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';


@Component({
  selector: 'app-counterview',
  standalone: true,
  imports: [DatePipe, AsyncPipe],
  providers: [],
  inputs: [],
  templateUrl: './counterview.component.html',
  styleUrl: './counterview.component.scss'
})
export class CounterviewComponent implements OnChanges, OnDestroy {

  public subscription: Subscription;
  public subscriptions: Subscription[] = [];
  
  balance: number = this.counterServ.balance.value;
  // @Input() balance: number = this.counterServ.getBalanceValue();;
  // aname!: string;

  // currentDate = new BehaviorSubject<Date>(new Date(Date.now()));
  // balance = 50;
  // @Input('balance') balance: number = 0
  // public get() {
  //   return this.balance;
  // }
  
  // public set(v : number) {
  //   this.balance = v;
  // }

  constructor(private counterServ: CounterserviceService) {
    this.subscription = this.counterServ.balance.subscribe((newValue) => {
      this.balance = newValue;
    });
  }

  public ngOnInit() {
    console.log('in oninit  for counterViEW comp');
    
    console.log(this.subscription);

    // this.subscriptions.push(this.counterServ.balance.subscribe((value) => {
    //   this.balance = value;
    // }))
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

  public ngOnDestroy(): void {
      this.subscription?.unsubscribe();
  }

  public updateBalance() {
    console.log('clikced me');
  }

  public saveMoney() {
    const newBalance = this.balance + this.counterServ.increment;
    this.counterServ.balance.next(newBalance);
    console.log(this.balance);
    // this.updateBalance();
  }

  public spendMoney() {
    const newBalance = this.balance - this.counterServ.decrement;
    this.counterServ.balance.next(newBalance);
    console.log('taking moneys');
    console.log(this.balance);
    console.log('with const');
    // this.updateBalance();
  }

  public addDay() {
    // let newDate = new Date(this.currentDate.getValue());
    // newDate.setDate(newDate.getDate() + 1);
    // this.currentDate.next(newDate);
    // // this.currentDate.next(new Date().setDate(this.currentDate.getValue().getDate() + 1));
    this.updateBalance();
  }

  public subtractDay() {
    // let newDate = new Date(this.currentDate.getValue());
    // newDate.setDate(newDate.getDate() - 1);
    // this.currentDate.next(newDate);
    // this.updateBalance();

    // this.currentDate.next(new Date(this.currentDate.getValue()). - 1));
  }
}
