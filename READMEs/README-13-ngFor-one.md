# Setting the app for a ngFor optimization

- here we have a OneComponent factorizing one line in the List

This factorization could be an exercise for the reader.

## We are not optimized

At first CD refresh

````
PERF-¤¤ ONE-0 1
PERF-¤¤ ONE-1 1
PERF-¤¤ ONE-2 1
PERF-¤¤ ONE-3 1
````

If we add a new Todo

````
PERF-¤¤ ONE-0 2
PERF-¤¤ ONE-1 2
PERF-¤¤ ONE-2 2
PERF-¤¤ ONE-3 2
PERF-¤¤ ONE-3 1    <<<< the new Todo
````

Question: why do all other OneComponent(s) are refreshed?

- The @Input are not changed, so why?
- Each Todo instance keep the SAME reference, we can't do any better on this side.

