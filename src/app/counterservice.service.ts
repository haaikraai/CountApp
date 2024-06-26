// import { FetchBackend, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class CounterserviceService {
  monthly = 14000;
  private startingBalance = 270;
  dailyAllowance = this.monthly/30; 
  lastUpdateDate = new Date();
  

  // private balanceCounter!: Observable<number>;
  public balance = new BehaviorSubject<number>(this.startingBalance);
  
  // asObservable().subscribe(v => this._balance = v);
  

  public increment = 100;
  public decrement = 100;

  constructor() { 
    console.log('Creating the service');
    // const nowDate = new Date(Date.now());
    // this.lastUpdateDate.setFullYear(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate()-2);
    // this.beSpiteful();
    // this.loadJsonData();
  }

  private async beSpiteful() {
    console.log('taking money for tardiness');
    setInterval(() => {
      this.balance.next(this.balance.value - 15);
      console.log('30 seconds passed, time is money');
      console.log(this.balance.value);
    }, 30000);
  }

  async loadJsonData() {
    // load the data from ./assets/user.json using angular httpclient later
    // for now use fetc
    let loadedData;
    const getJsonResp = await fetch('./assets/user.json');
    const jsonData = await getJsonResp.json();
    // jsonData.subscribe(data => loadedData = data)
    console.log('DATA BEEN LOADED AS SUCH:');
    console.log(loadedData);
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


  /*
  recieves a value to change the balance by
  the number is received as positive or negative already
  */
  

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
