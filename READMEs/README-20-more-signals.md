# More Signals

- a new value arriving in a signal will make the UI consuming it refresh (GOOD) and without immutability pattern.


- the pb is that Pipes need the immutability pattern to work efficiently.

SO 2 SOLUTIONs:

- 1 - we implement the SIgnals with the immutability pattern burden, SAD
- 2 - we don't use Pipes anymore on those streamed data and replace them with a computed() field.

HERE we implement the 2nd solution.

## Implementation

- we add a computed() field for the filtered todos named todosFiltered$: Signal<Todo[]>
- create an instance of TodosFilterPipePipe to use the transform() method
- also create a second computed() to replace this.filterChoice because we need the filtered computed to re-compute when
  the filter gets changed.
- replace the this.filterChoice with this.filterChoice$ : Signal<TODO_FILTER_ENUM>
-

## ANGULAR BUG ?

Sometimes {{ todos$() | remainingMessage}} is not refreshed when the todos$() signal is changed !

- Strange because for toogle ONE we create a new REF each time. and with toogling/untoggling it sometimes works and
  sometimes not.

- The pb is that adding a TODO is NOT IMMUTABLE, so the todos$() signal is not changed, so the Pipe is not refreshed.
