[![github actions][actions-image]][actions-url]

# Node-System-Stats

**Note:** You can find documentation for all of the types and functions [here](https://joniii11.github.io/node-system-stats/).

**Note:** This module only relies on the `os` module, so it should be compatible on all OS's where Node.js runs.

**Note:** This package is a TS-rewrite of the old package [cpu-stat](https://github.com/jub3i/node-cpu-stat). Also it comes with 1 more function to measure the ram usage. More functions will be added later.

## Installing
```bash
npm install node-system-stats
```

## Examples on how to use it
To measure the cpu Usage in percent, you can use this function below. Parameter Description can be found [here](https://joniii11.github.io/node-system-stats/functions/usagePercent.html)

By default you can use it like that:
```js
// TypeScript: import { usagePercent } from "node-system-stats
const { usagePercent } = require("node-system-stats")

cpuStat.usagePercent(function(err, percent, seconds) {
    if (err) {
      return console.log(err);
    }

    // the percentage cpu usage over all cores
    console.log(percent);

    // the approximate number of seconds the sample was taken over
    console.log(seconds);
});
```

Get the cpu usage percent for core 0 over a sample period of 2000ms:
```js
// TypeScript: import { usagePercent } from "node-system-stats"
const { usagePercent } = require("node-system-stats");

try {
    usagePercent(function(percent, seconds) {
    console.log(percent); // Output: 0.65
    console.log(percent); // Output: 1 
}, { // You don't need to include this if you don't want to change some things
    coreIndex: 0 // Standart is -1 to measure the average on all cores. 
    sampleMs: 2000 // Standart is 1000ms (1s)
});
} catch (err) {
    console.log(err); // Errors can occur if you set the parameter coreIndex higher then your amount of cores.
};
```

To get all of the cores, you can use this function below. View [here](https://joniii11.github.io/node-system-stats/functions/totalCores.html) for more description.

```js
// TypeScript: import { totalCores } from "node-system-stats"
const { totalCores } = require("node-system-stats");

console.log(totalCores()); // Output: 8 
                           
// Note: Threads count as cores too! So if you want to only get the "real" cores use the code snippet below:
console.log(totalCores()) / 2; // Output: 4
```

If you want to get the Average CPU Clock speed, then use this function below. View [here](https://joniii11.github.io/node-system-stats/functions/avgClockMHz.html) for more description.

```js
// TypeScript: import { avgClockMHz } from "node-system-stats"
const { avgClockMHz } = require("node-system-stats");

console.log(avgClockMHz()); // Output: 3600
```

If you want to get only from the core 1 the speed use the snippet below. View [here](https://joniii11.github.io/node-system-stats/functions/clockMHz.html) for more description.

```js
// TypeScript: import { clockMHz } from "node-system-stats";
const { clockMHz } = require("node-system-stats");

console.log(clockMHz(1)); // Output: 3600
```

If you want to get it from all cores modify it like that the code:
```js
console.log(clockMHz()); // Output: [ 3600, 3600, 3600, 3600
                         //           3600, 3600, 3600, 3600 ]
```

If you want to get the memory Usage, use that Snippet below. View [here](https://joniii11.github.io/node-system-stats/functions/showMemoryUsage.html)
```js
// TypeScript: import { showMemoryUsage } from "node-system-stats";
const { showMemoryUsage } = require("node-system-stats");

console.log(showMemoryUsage()); // Output: 100 MB 
```

## Contributing
If you wish to contribute to the Node-System-Stats codebase or documentation, feel free to fork the repository and submit a
pull request. We use ESLint to enforce a consistent coding style, so having that set up in your editor of choice
is a great boon to your development process.


[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/es-shims/Math.clz32
[actions-url]: https://github.com/Joniii11/node-system-stats/actions