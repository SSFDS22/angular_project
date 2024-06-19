# USING THE ASYNC PIPE

https://stackoverflow.com/questions/59109448/asyncpipe-initial-value-null-only-if-subscription-is-not-shared

The async pipe could give null as initial value, so we have to adapt the <app-list> component. WE have 2 ways to do
that:

- we can just change the type in the ListComponent from Task[] to Task[]| null => and then adapt the template by adding
  a *ngIf somewhere, and the pipe and the ngOnChanges() method.
- Or you can use a ngif in the CrudContainerComponent template to not display the ListComponent until the tasks array is
  not null.
