# Utility

``` mermaid
classDiagram

class Utility {
  +execute(command: string) Promise~string~
  +getCurrentBranch() Promise~Branch~
}
```

## execute()

It executes the commandline.

``` javascript
console.log(await util.execute("ls"));
/*
somedir
somefile1.ext
somefile2.ext
*/
```

## getCurrentBranch()

It returns a Promise that resolves as an object having name and sha.

`git branch -v` will be executed and interpreted.

``` javascript
console.log(await util.getCurrentBranch());
/*
{
  name: "feature/some",
  sha: "somesha"
}
*/
```