# Adding tools to change the reference of the Todo instances on each change

## Optimzed for same reference

So far, with same ref (with the help of OnPush) => ok, no recreation of OneComponent and even NO REFRESH OF ANY
ONECOMPONENT Just reordering in the DOM.

## Changing the reference artificially to see a new challenge !

The specific button "SameRefs"/"NewRefs" will change the reference of the Todo instances depending on its value.

````
  reorder() {
    this.todos.sort((t1: Todo, t2: Todo) => 0.5 - Math.random());
    this.setTodos([...this.todos]);
    Plog.state('TODOs:', this.todos);
  }
  
  private setTodos(tasks: Todo[]) {
    this.todos = tasks;
    if (this.changeReference) {
      this.todos = [...this.todos.map(t => ({...t}))]; // all Todos references are changed, simulating backend roundtrip
    }
    setTimeout(() => this.todos$.next(this.todos), 2000);
  }   

````

So now we have new refs if we want to. Let's test it

## Test it !

With NewRefs => we have a new challenge

- all OneComponent are recreated all the time
- and all OneComponent are refreshed for their first time On a new reorder => same again!

But all instances are the same data, but only in different instances. We have to tell ANgular how to deal with this. And
more precisely how to keep track of the instances. We know that the instances are the same, but Angular does not. And we
know it because their id is the same.

## add trackBy to solve the new pb

trackBy is a method that will be called by Angular to know how to track the instances of the ngFor directive.

````
  trackByTask(index: number, task: Task) {
    return task.id;
  }
````

And use this method in the ngFor directive

````
  *ngFor="let todo of (todos | todosFilterPipe:filterChoice); trackBy: trackByTask"
````

## Test it !

## Result

Angular keeps the SAME components, BUT they are still refreshed because even with OnPush Angular can not tell if the
inside data is the same or not. For an OnPush component if the reference has changed => the component will be refreshed.
There is no direct way to tell Angular.

So in the end Angular now keep the same instance of OneComponent, but it is still refreshed when its instance have
changed reference. And changing reference when you have a server round-trip is always the case even if the data is the
same.


