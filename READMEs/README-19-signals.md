# Signals

Code the migration of the TodoStateService from using the BehaviorSubject to using the Signal class.

The use of signal will be limited to the CrudConainerComponent which will call the () on the signal to pass the value to
its children.

In fact only the ListComponent does have an @Input of todos in our app.
