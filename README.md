# fl60.js
Very tiny library to make a 60 framelimit.

## How to use

```JavaScript
fl60(frameFn) -> undefined
```
Executed once per program - next executions don't have any effect. Sets frameFn as a callback function that will be executed for each frame - 60 times per second. Starts the loop.

```JavaScript
getFPS() -> number
```
Returns current FPS: a value between 0 and 60. If fl60 was never called returns NaN instead.

## Implementation
fl60 uses setTimeout under the hood.

## getFPS accuracy
getFPS is the most accurate if FPS is near to 60. The further it goes down the longer time it takes to accurately represent the FPS value. To be fixed.
