# Going Mutable

Now that everything reacts to Signals we can go Mutable.

This means that for the ACTION methods modifying the data in the StateService we can now use the mutable pattern IF WE
WANT.

Nothing is required

CAVEAT: doing SO YOU MUST use signal() in the Template to refresh the UI. OR in computed fields. Otherwise the UI will
not be refreshed.

This is especially true for OnPush components. If the @Input do not change of reference, the component will not be
refreshed on that criteria.

In our case ListComponent is an OnPush component, which receives a Signal for todos as @Input.

=> so the refresh of a Component is triggered by the use in the template of Signals execution.

=> EFFECTs just are executed but do NOT refresh their linked Components

SEE DEMO on this branch : 23-effect-not-enough

QUESTION: Don't know why in the constructor my effect code is only executed once ? And same code in ngOnInit is executed
OK each time the component is refreshed.

## so here the TodosStateWithSignalsService is using MUTABLE Strategy

And all stil work fine! 
