# Split AppComponent solution => use @Input() and @Output() to share data

Using the container/dumbs strategy for CreateComponent and ListComponent

The only gain is sutble : now we can optimize the change detection strategy for the ListComponent.

Which means that the ListComponent will only be refreshed when we want => when the todos array is changed.

How to achieve that ?

- KEY concept: use the immutable pattern for the todos array
- use the OnPush change detection strategy for the ListComponent
- use the @Input() to pass the todos array to the ListComponent
- use the @Output() to emit the new todos array from the ListComponent to the AppComponent
- use the async pipe in the AppComponent template to subscribe to the @Output() of the ListComponent
- 
    


