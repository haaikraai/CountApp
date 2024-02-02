interface UserDat {
    name: string;
    balance: number;
    lastUpdateDate: Date;
    keywords: string[];
    dailyAllowance: number;
}

export class SampleUser implements UserDat {
    
    name: string = 'lucifer';
    balance: number = 70;
    lastUpdateDate: Date = new Date(Date.now());
    keywords: string[] = ['lucifer', 'satan', 'beelzebub', 'morning star', 'devil'];
    dailyAllowance: number = this.balance/30;

    constructor() {}
}

