import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CounterserviceService } from './counterservice.service';
import { CounterviewComponent } from './counterview/counterview.component';
import { randomInt } from 'node:crypto';
import { userInfo } from 'node:os';
import { SampleUser } from './user.dat';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CounterviewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'CountApp';
  names = ['lucifer', 'satan', 'beelzebub', 'morning star', 'devil'];
  chosenOne = this.sampleOne(this.names);

  constructor(private counterServ: CounterserviceService) {
    // this.counterServ.currentBalance.subscribe(val => this.balance = val);
  }

  public ngOnInit() {
    // this.balance = this.counterServ.balance;
    // Testing:
    // when app opens, saved balance should be loaded. Then extra values should be added per day from last saved.
    console.log('made app.component');
  }

  /**
   * Returns one random element from the given array of samples.
   * @param samples - The array of samples.
   * @returns The randomly selected sample.
   */
  private sampleOne(samples: any[]): any {
    let rand = Math.random();
    rand = rand * samples.length;
    rand = Math.floor(rand);
    return samples[rand];
  }

  /*
  Fake for now. Should call the storage and get the last saved balance as well as the date saved
  Balance is always 70 for now. Date is up to a week ago though.
  */
  public loadBalance() {
    // gives a random number between 1 and 6 which is the mock days ellapsed since last opened.
    const variation = this.sampleOne([1,2,3,4,5,6,7]);


    // const loadedBalance = this.balance;
    // const lastDays = new Date(Date.now()).getDate() - variation;
    // const nowDate = new Date(Date.now());
    // const daysEllapsed = nowDate.getDate() - lastDays;
    
    // this.balance = loadedBalance + daysEllapsed * SampleUser.prototype.dailyAllowance;

    // return this.balance;
  }

  makeAMess() {
    const coinflip: boolean = Math.random() > 0.5;

    if (coinflip) {
      this.counterServ.balance.next(this.counterServ.balance.value + 666);
      this.chosenOne = this.sampleOne(this.names);
    } else {
      this.counterServ.balance.next(this.counterServ.balance.value - 666);
    }
  }
}