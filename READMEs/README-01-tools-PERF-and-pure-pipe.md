# ng12-todo-perf exercises

Goal of this step :

- install tools

## Install perf tools and logger

        npm i @gpeel/plog
        npm i @gpeel/my-perf-tools

        npm i @gpeel/plog @gpeel/my-perf-tools

or simpler

    npm add @gpeel/plog

Then you can say yess to perf tools. ANd you'll get the environment.ts file with the settings for plog already
configured. => it's explained below.

### setup in AppModule

In AppModule add the following import :

        PlogModule.forRoot(environment) 

### without more settings (which are required, see next step)

in Console

            ****************************
            YOU DID NOT initialize Plog explicitly =>  Taking the default configuration for Plog
            Taking : node_module/gpeel/plog/src/lib/PLOG_CONFIG_DEFAULT.ts
            If you want something else configure your environment.ts file
            Example in node_module/gpeel/plog/src/lib/PLOG_CONFIG_DEFAULT_PROD.ts comment
            ****************************

### Completing the settings

By telling Plog what you like to log.

Copy the content from node_modules/@gpeel/plog/src/lib/PLOG_CONFIG_DEFAULT.ts

src/environments/environment.prod.ts =>

````typescript
export const environment = {
  production: true,
  plog: {
    error: 'color:red',
    warn: 'color:orange',
  }
};

````

src/environments/environment.ts =>

````typescript
export const environment = {
  production: true,
  plog: {
    debug: 'color:limegreen;font-weight:bold',
    info: 'color:blue',
    // info: ['color:blue; font-size:1rem;font-weight:bold', 'MY-INFO'],
    // info: 'jj nn, kkkk ht:bold', // with trash it does not crash!
    warn: 'color:orange',
    error: 'color:red; font-size:1rem;',

    // Performance logs
    perf: 'color:darkturquoise',
    perfComponent: ['color:darkturquoise', 'PERF-¤¤'],
    perfCD: ['color:darkturquoise', 'PERF-¤¤¤¤¤¤¤'],
    perfDom: ['color:darkturquoise', 'PERF-¤-¤-¤-¤'],

    // NG hooks
    ngOnChanges: ['color:orange', 'OnChange'],
    ngOnInit: ['color:orange', 'OnInit'],
    ngOnDestroy: ['color:orange', 'OnDestroy'],
    ngDoCheck: ['color:orange', 'DoCheck'],
    ngAfterContentInit: ['color:orange', 'AfterContentInit'],
    ngAfterContentChecked: ['color:orange', 'AfterContentChecked'],
    ngAfterViewInit: ['color:orange', 'AfterViewInit'],
    ngAfterViewChecked: ['color:orange', 'AfterViewChecked'],

    // constructor logs
    create: ['color:green', 'new'],
    createComponent: ['color:green;', 'New-@Comp'],
    createDirective: ['color:green', 'New-@Dir'],
    createService: ['color:green', 'New-Svc'],
    createPipe: ['color:green', 'New-@Pipe'],
    createGuard: ['color:green', 'New-@Guard'],
    createResolver: ['color:green', 'New-@Resolver'],

    // NG types
    resolve: ['color:brown', 'RESOLVE'],
    guard: ['color:sandybrown', 'GUARD'],
    validator: 'color:plum',
    pipe: 'color:brown',
    callback: 'color:violet',

    state: 'color:blueviolet', // Redux style or BehaviorSubject, as you want
    // specific logs for NGXS, Akita
    action: ['color:#8f72cf; font-weight:bold;', '@ACTION'], // to log inside Action method
    select: ['color:plum', '@SELECT'], // to log inside select method
    errorState: ['color:#cf3c04', '@ERROR'], // to log error in Store
    effect: ['color:#8F72CF;font-weight:bold;', '@EFFECT'], // to log inside effect method (even if using @Effet is not advised)
    cache: ['color:blueviolet', 'CACHE'],

    formValueChanges: ['orange', 'FORM-VALUE'],
    formEvent: ['orange', 'FORM-EVENT'],
    streamEvent: ['darkorange', 'STREAM'],
    subscription: ['coral', 'SUBSCRIBED-DATA'],
    unsubscription: ['coral', 'UN-SUBSCRIPTION'],

    // Specific loggers for @gpeel/my-validators
    validationCompute: ['color:orange', '@VALID'], // tracing validators when they compute
    validationErrorMsgRefresh: ['color:orange', '@VALID_PERF'], // tracing refresh of <my-error-msg>
    validationErrorMsgCreation: ['color:orange', '@ERROR_MSG_NEW'], // tracing creation of component <my-error-msg>
    errorMsg: ['color:orange', '@VALID'], // used by <error-msg> deprecated

    // network actions (interceptors)
    network: ['color:blue', 'HTTP'],
    networkRequest: ['color:blue', 'HTTP-Request'],
    networkResponse: ['color:blue', 'HTTP-Response'],
    networkError: ['color:red', 'HTTP-Error'],
    networkCreate: ['color:green', 'NEW-HTTP'],

    httpCall: ['color:springgreen', 'HTTP-CALL'], // http prefix : for service logic
    httpSuccess: ['color:springgreen', 'HTTP-SUCCESS'],
    httpError: ['color:red', 'HTTP-ERROR'],
    httpDebug: ['color:springgreen', 'HTTP-TAP'],

    obsSubscribe: ['color:springgreen', 'OBS-sub'],
    obsSuccess: ['color:springgreen', 'OBS-SUCCESS'],
    obsError: ['color:red', 'OBS-ERROR'],
    obsDebug: ['color:springgreen', 'OBS-DEBUG'],

    // tests
    tu: ['color:blue; font-size:1rem;', 'TU'],
    tuBeforeEach: ['color:slateblue', 'tu-BEFORE-EACH'],
    tuBeforeAll: ['color:slateblue', 'tu-BEFORE-ALL'],
    tuAfterEach: ['color:tomato', 'tu-AFTER-EACH'],
    tuAfterAll: ['color:tomato', 'tu-AFTER-ALL'],
    tuArrange: ['color:blue', 'TU'],
    tuAct: ['color:blueviolet', 'TU'],
    tuAssert: ['color:brown', 'TU'],
    ti: ['color:green', 'TI'],
    te2e: ['color:green', 'e2e'],

    // colors
    pink: ['color:#FF40BD;', '######'], // pink flashy
    red: ['color:red', '######'],
    orange: ['color:orange', '######'],
    green: ['color:springgreen', '######'],
    blue: ['color:cadetblue', '######'],
    lightBlue: ['color:darkturquoise', '######'],
    violet: ['color:blueviolet', '######'],

    // same color-loggers with a prefix 'color' (easier to find with intellisense)
    colorPink: ['color:#FF40BD;', '######'], // pink flashy
    colorRed: 'color:red', // red without the console.error() stacktrace
    colorOrange: ['color:orange', '######'],
    colorGreen: ['color:springgreen', '######'],
    colorBlue: ['color:cadetblue', '######'],
    colorLightBlue: ['color:darkturquoise', '######'],
    colorViolet: ['color:blueviolet', '######']
  }
};

````

### Replace console.log in Pipe(s)

In TodosFilterPipePipe.ts replace and in RemainingMessagePipe.ts replace the console.log with Plog.pipe

````typescript
console.log('Filtering-Pipe computes:' + this.counter++);
````

with

````typescript
 Plog.pipe('Filtering-Pipe computes:' + this.counter++);
````

ALso in AppComponent.ts

````typescript
  constructor()
{
  Plog.action('AppComponent constructor => Plog works!');
}
````

## Correct the bug

Turn the Pipe into an impure Pipe.

````typescript
 @Pipe({
  name: 'taskPipe',
  pure: true   // <<<<< HERE! change to false to solve the bug
})
export class TodosFilterPipePipe implements PipeTransform {
}
````

## Perf Conclusion

We corrected the Pipe's bug,

## Adding Perf Tools to monitor Angular Change-Detection refresh

In AppModule add MyPerfModule:

````typescript
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    PlogModule.forRoot(environment),
    MyPerfModule // <<< HERE !
  ],
````

in app.component.html add on the first line :

````html

<root-refresh-count></root-refresh-count>
````

Now we see that the Pipe computes at each UI interaction for every NG DOM refresh.

Now we see each Angular CD refresh, and the number of times the DOM has been refreshed and been computed by Angular. We
also see that the Pipe computes are linked to NG Change-Detection cycles
