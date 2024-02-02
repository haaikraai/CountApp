# Notes for self

## On RxJs/Observables

**Observables**
    Observables are wrappers around streams of data. Observer watches and excecutes code when one of 3 things: value changes, error occurs, observable ends emiting values. 
    The corresponding methods respectively are:
        `next`, `error`, and `complete`
    and the observer
        `subscribe` s to the observable.

    This data can be *anything*. A text stream, an http request, an event.

Can get rxjs from CDN. Then create observable from button click (there are a lot available on rxjs site):

`Rx.Observable.fromEvent(button, 'click').subscribe((value) => console.log(value.clientX));`   //clientX is mouse horizontal position

The subscribe method takes an observer. It can accept an object as well such like:
```ts
var observer {
    next: function(value) {
        console.log(value);
    },
    error: function(err) {
        console.log(err)
    },
    complete: function(complete) {
        console.log(complete)
    }
}

Observable.fromEvent(..).subscribe(observer)
``` 
*(Last two functions will never happen for a button)*

## My little observable

From rxjs Observable.create method. It accepts as argument a function that will receive the observable as a parameter.
```ts
var observer = {
next: function(value) {
console.log(value);
},
..and error and complete sometimes

Rx.Observable.create(function(obs) {obs.next('A value')})
.subscribe(observer);
```
Can call the `next` method her cause we know observables has such a method. If `error` or `completed` is encountered, the observable destroys itself and quits emmiting values.

As per this example: an observable does not **have** to be asynchronous.
But if you insist, through in a setTimeOut somewhere.

Can add button click inside Observable create method:
```ts
Rx.Observable.create(function(obs) {
    button.onclick = function(event) {
        obs.next(event);
    }
}).subscribe(observer)
```

Always unsubscribe to any subscribtion you don't need no more!
Easy to do my just saving your subscriptions:
```ts
const subscription = Rx.Observable....subscribe(..)
```

## Subjects

It is like an event emmiter. Observers still subscribe to subjects, but they own their own next method. They can force the change in values!
```ts
let subject = new Rx.Subject();

subject.subscribe({
    next: function() {},
    error: function() {},
    complete: function() {},
})  
```
OOooohhh: subjects can subscribe to many plans. The subject.next() emits multiple streams of new values.

Don't have to to subject everything, only when needed. My code sure af do not need it lol.

All in all I do believe it is like an observable, but programmer has control of when it emmits shit

## Behavioursubjects

Because subjects don't have initial values.
Use like normal variable that 
Defining is easy, takes an initial argument:
```ts
var clickEmmitted = new Rx.BehaviourSubject('not clicked');
var 
```

# Fireship on BehaviourSubjects
1. Create private var that stores the value as behaviour subject (in the service)
    ```ts
    private messageSource = new BehaviourSubject<string>('empty');
    ```
2. Create public observable where other components can subscribe to:
    ```ts
    public currentMessage = messageSource.asObservable();
    ```
3. Create public method to change the value by calling next:
    ```ts
    public updateMessage(newMessage:string ) {
        this.currentMessage.next(newMessage)
    }
    ```
4. ALL components that want to use, inject service and subscribe to observable with value equal to private msg
    ```ts
    message: string;

    ngOnInit() {
        this.appService.currentMessage.subscribe(msg => thie.message = msg);

        // can also update from any component
        this.appService.updateMessage('new vallueeee');
    }
    ```