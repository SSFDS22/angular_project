# Split AppComponent solution => use @Input() and @Output() to share data

Using the container/dumbs strategy for CreateComponent and ListComponent

The only gain is sutble : now we can optimize the change detection strategy for the ListComponent.

Which means that the ListComponent will only be refreshed when we want => when the todos array is changed.

How to achieve that ?

- KEY concept: use the immutable pattern for the todos array
- use the OnPush change detection strategy for the ListComponent
- use the @Input() to pass the todos array to the ListComponent
- use the @Output() to emit the data required to carry out the desired modification (for example delete, or update) to
  the CrudContainer
- use the async pipe in the CrudContainer template to subscribe a source of data
-

Note: the toggleAll checkbox is more difficult to keep in sync. Just comment the line for that feature in ts for now.

Note2: for toggleOne you must change the code to not modify the Todo instance directly in the array but instead create a
new Todo instance with the same properties and the opposite completed value. And then create a new array with the new
Todo instance and the other Todo instances.

## Add perf tools

You already have <root-refresh-count></root-refresh-count> on the AppComponent template.

- Now add <refresh-count name="LIST"></refresh-count> on ListComponent template.
- add <refresh-count name="CREATE"></refresh-count> on CreateComponent template.
- add <refresh-count name="CRUD"></refresh-count> on CrudComponent template.
