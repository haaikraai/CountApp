import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterserviceService {

  private monthly = 14000;
  private _balance = 0;
  private dailyAllowance = this.monthly/30; 
  private lastUpdateDate = new Date();
  
  public increment = 100;
  public decrement = 100;

  constructor() { 
    const nowDate = new Date(Date.now());
    this.lastUpdateDate.setFullYear(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate()-2);
    this.balance = this._balance;
  }

  public testBalance(value: number): number {
    const alteration = (Math.random() - 0.5) * 10;
    return new Date(value).getDate() - alteration;
  }

  public get balance() {
    this.updateBalance(Date.now());
    return this._balance;
  }

  public set balance(v: number) {
    this._balance += v;
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

    this.balance = this.balance + this.dailyAllowance * newDays;
  }
}
