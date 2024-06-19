# Setting the app for a ngFor optimization

- here we have a OneComponent factorizing one line in the List

## We are not optimized

Question: why do all other OneComponent are refreshed? The @Input are not changed, so why? each Todo instance keep the
SAME reference, we can't do any better on this side.

## Add Onpush on OneComponent

With OnPush

At first CD refresh

````
PERF-¤¤ ONE-0 1
PERF-¤¤ ONE-1 1
PERF-¤¤ ONE-2 1
PERF-¤¤ ONE-3 1
````

If we add a new Todo

````
PERF-¤¤ ONE-3 1    <<<< the new Todo
````
