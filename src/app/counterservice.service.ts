import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterserviceService {
  monthly = 14000;
  _balance = 0;
  dailyAllowance = this.monthly/30; 
  lastUpdateDate = new Date();
  
  // private balanceCounter!: Observable<number>;
  private balance = new Subject<number>();;
  public currentBalance = this.balance.asObservable().subscribe(v => this._balance = v);
  

  public increment = 100;
  public decrement = 100;

  constructor() { 
    const nowDate = new Date(Date.now());
    this.lastUpdateDate.setFullYear(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate()-2);
  }

  ngOnInit(): void {
    // this.currentBalance.subscribe(v => this.balance = v);
    this.setBalance(0);

    setInterval(() => {
      this._balance -= 15;
      alert('15 seconds passed');
    }, 15000);
  }

  // public testBalance(value: number): number {
  //   const alteration = (Math.random() - 0.5) * 10;
  //   return new Date(value).getDate() - alteration;
  // }

  // public get balance() {
  //   this.updateBalance(Date.now());
  //   return this._balance;
  // }

  // public set balance(v: number) {
  //   this._balance += v;/ }

  // public get balanceCounter(v: number) {
  //   this.balanceSubject.next(v);
  // }

  public getBalanceObservable(): Observable<number> {
    return this.balance.asObservable();
  }

  public getBalanceValue(): number {
    return this._balance;
  }

  public setBalance(v: number) {
    this._balance = v;
    this.balance.next(v);
  }

  /*
  recieves a value to change the balance by
  the number is received as positive or negative already
  */
  public changeBalanceBy(v: number) {
    this._balance = this._balance + v;
    this.balance.next(this._balance);
  }

  

  private updateBalance(today: number) {
    const todayDate = new Date(today);
    const oldDate = this.lastUpdateDate.valueOf();
    let newDays = 0;
    if (oldDate != today) {
      // verify in the same month
      if (todayDate.getMonth() == this.lastUpdateDate.getMonth()) {
        newDays = (new Date(today).getDate() - new Date(oldDate).getDate());
        this.lastUpdateDate.setTime(today);
        
      }
      else {
        console.log('ERROR: No compensation for different months. Call it lazy call it a todo. meh\nNah should be fixed. But it is wrong');
        newDays = new Date(today - oldDate).getDate();
      }
    }
    
    // const newBalance = this.balance. + this.dailyAllowance * newDays;
    // this.currentBalance.next(newBalance);
  }
}
