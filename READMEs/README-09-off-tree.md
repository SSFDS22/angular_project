# off tree command

## Implementing the off-tree command

OffTreeCommandContainerComponent is a container component that will be used dispatch commands to the StateService.

Unfortunatly, this component is NOT a child of the CrudContainerComponent and so could not take advantage of the
strategy used in step 06, where we had no StateService and the CrudContainerComponent was keeping the Todo[] data.

With the OffTreeCommandContainerComponent we will have to use the StateService as strategy, and so now the StateService
Pattern is not only a nice pattern but a required pattern.
(Note : in step 08 it was a nice pattern but not required)

## off-tree Commands and synchronizong the data in the CrudContainerComponent/List

When we execute a command from the OffTreeCommandContainerComponent, the data in the CrudContainerComponent/List is not
refreshed.

We must add a call to cd.markForCheck() in the subscription to the StateService.behaviourSubject.



