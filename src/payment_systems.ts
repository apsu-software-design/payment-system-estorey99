import readlineSync = require('readline-sync');

export class PaymentSystemExecutor {
    constructor(extract: Function, validate: Function)
    {
        this.extract = extract;
        this.validate = validate;
    }
    private extract: Function;
    private validate: Function;
    public execute(): void {
        var info= new Array<string>();
        
        info= this.extract.apply(this.extract);
        this.validate.apply(this.validate,info);

    }
}
class CreditPayment  {
   private executer!: PaymentSystemExecutor;
    constructor() { }

    private extract: Function = function (): Array<string> {
        var info = new Array<string>();
        console.log('Enter Credit Card Payment Details.');
        let name: string = readlineSync.question('  Name: ');
        info.push(name);
        let creditCardNumber: string = readlineSync.question('  Credit Card Number: ');
        info.push(creditCardNumber);
        let creditCardExpirationDate: string = readlineSync.question('  Credit Card Expiration Date (MM/DD): ');
        info.push(creditCardExpirationDate);
        return info;
    }
    private validate:Function = function(name:string, creditCardNumber:string, creditCardExpirationDate:string){
        let valid = /^[\w.' ]+$/.test(name) && /\d{15,16}/.test(creditCardNumber) && /\d\d\/\d\d/.test(creditCardExpirationDate);

        if (valid) {
            console.log("Your payment information is being encrypted.");

            console.log("The payment is being processed.")
        }
        else {
            console.log('The payment is invalid.');
        }
    }
    build()
    {
        this.executer = new PaymentSystemExecutor(this.extract, this.validate);
    }
    getExecuter() {
        return this.executer;
    }
}
class BankDraftPayment{
    private executer!: PaymentSystemExecutor;
    constructor() {}
    private extract: Function = function (): Array<string> {
        var info = new Array<string>();
        console.log('Enter Bank Account Details.');
        var name: string = readlineSync.question('  Name: ');
       info.push(name);
       let bankRoutingNumber: string = readlineSync.question('  Bank Routing Number: ');
       info.push(bankRoutingNumber);
       let bankAccountNumber: string = readlineSync.question('  Bank Account Number: ');
        info.push(bankAccountNumber);
        return info;
    }
   private validate:Function=function(name: string, bankRoutingNumber: string, bankAccountNumber:string){
    let valid = /^[\w.' ]+$/.test(name) && /\d{9}/.test(bankRoutingNumber) && /\d{6,12}/.test(bankAccountNumber);

    if (valid) {
        console.log("Your payment information is being encrypted.");

        console.log("The payment is being processed.")
    }
    else {
        console.log('The payment is invalid.');
    }
}
    build() {
        this.executer = new PaymentSystemExecutor(this.extract,this.validate);
    }
    getExecuter() {
        return this.executer;
    }
}
class OnlinePayment {
    private executer!: PaymentSystemExecutor;
    constructor() {}
    private extract: Function = function ():Array<string> {
        var info = new Array<string>();
        console.log('Enter Online Payment Details.');
        let email: string = readlineSync.question('  Enter Your Email Address: ');
        info.push(email);
        let paymentPassword: string = readlineSync.question('  Enter Your Payment Password: ');
        info.push(paymentPassword);
        return info;
    }
    private validate:Function= function(email:string, paymentPassword:string){
    let valid = /^[\w@.]+$/.test(email) && /\w+/.test(paymentPassword);

    if (valid) {
        console.log("Your payment information is being encrypted.");

        console.log("The payment is being processed.")
    }
    else {
        console.log('The payment is invalid.');
    }
}
    build() {
        this.executer = new PaymentSystemExecutor(this.extract, this.validate);
    }
    getExecuter() {
        return this.executer;
    }
}
class OfflinePayment  {
    private executer!: PaymentSystemExecutor;
    constructor() {}
    private extract: Function = function (): Array<string> {
        var info = new Array<string>();
        console.log('Enter Offline Payment Details.');
        let name: string = readlineSync.question('  Name: ');
        info.push(name);
        let billingAddress: string = readlineSync.question('  Enter Your Billing Address: ');
        info.push(billingAddress);
        return info;
    }
     private validate: Function = function (name:string, billingAddress:string) {
        let valid = /^[\w.' ]+$/.test(name) && /^[\w.' ]+$/.test(billingAddress);
    
       
    if (valid) {
        console.log("Your payment information is being encrypted.");

        console.log("The payment is being processed.")
    }
    else {
        console.log('The payment is invalid.');
    }
}
    build() {
        this.executer = new PaymentSystemExecutor(this.extract, this.validate);
    }
    getExecuter() {
        return this.executer;
    }
}
export function selectStrat(strat: string): PaymentSystemExecutor|undefined{
    var temp;
    if (strat == "creditcard") {
       temp = new CreditPayment();
        temp.build();}
    else if (strat == "bankdraft") {
        temp = new BankDraftPayment();
        temp.build();}
    else if (strat == "onlinepayment") {
        temp = new OnlinePayment();
        temp.build();}
    else if (strat == "offlinepayment") {
        temp = new OfflinePayment();
        temp.build();}
    return temp?.getExecuter();

}