# Configurations

You can customize the behavior of `grep2json`.

## initialize config file
``` shell
npx grep2json --init-config
```

configuration example
``` javascript
module.exports = {
  prepareStore: async (util) => await Promise.resolve({}),
  setupResult: async (block, structuredLine, store) => {
    return await Promise.resolve({
      fileName: structuredLine.fileName,
      matchedLineNumber: structuredLine.lineNumber,
      line: structuredLine.codeLine
    });
  }
};
```

## prepareStore()

`prepareStore()` in `grep2json.config.js` will be executed once before `setupResult()`.

`prepareStore()` should return a Promise that resolves as any object.

[Utility instance](./Utility.md) will be passed as the parameter, so you can use it or expose it from store.

### setupResult()

`setupResult()` in `grep2json.config.js` will be executed with each matched line.

`setupResult()` should return a Promise that resolves as any object.

`setupResult()` receives block, line, and store as the parameters.



