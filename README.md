
# fs-file-tree

 [![Patreon](https://img.shields.io/badge/Support%20me%20on-Patreon-%23e6461a.svg)][paypal-donations] [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![AMA](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Version](https://img.shields.io/npm/v/fs-file-tree.svg)](https://www.npmjs.com/package/fs-file-tree) [![Downloads](https://img.shields.io/npm/dt/fs-file-tree.svg)](https://www.npmjs.com/package/fs-file-tree) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> Get a directory file tree as an object.

## :cloud: Installation

```sh
$ npm i --save fs-file-tree
```


## :clipboard: Example



```js
const fsFileTree = require("fs-file-tree");

// File tree looks like this:
// .
// ├── a
// │   ├── b
// │   │   ├── c
// │   │   └── test.js
// │   └── two\ words
// └── index.js

// The tree object looks like this:
fsFileTree(__dirname, (err, tree) => {
    console.log(tree);
    // { a:
    //    { b: { c: {}, 'test.js': [Object] },
    //      'two words':
    //       { path: '.../example/a/two words',
    //         stat: [Object] } },
    //   'index.js':
    //    { path: '.../example/index.js',
    //      stat:
    //       {...} } }
});

console.log(fsFileTree.sync(__dirname, { camelCase: true }));
// { a:
//    { b: { c: {}, testJs: [Object] },
//      twoWords:
//       { path: '.../example/a/two words',
//         stat: [Object] } },
//   indexJs:
//    { path: '.../example/index.js',
//      stat:
//       {...} } }
```

## :memo: Documentation


### `fsFileTree(inputPath, opts, cb)`
Get a directory file tree as an object.

#### Params
- **String** `inputPath`: The input path.
- **Object** `opts`: An object containing the following fields:
 - `camelCase` (Boolean): Convert the file names in camelcase format (to be easily accessible using dot notation).
 - `all` (Boolean): If `true`, it will include the hidden files/directories.
- **Function** `cb`: The callback function.

### `sync(inputPath, opts)`
The sync version.

#### Params
- **String** `inputPath`: The input path.
- **Object** `opts`: An object containing the following fields:
 - `camelCase` (Boolean): Convert the file names in camelcase format (to be easily accessible using dot notation).
 - `all` (Boolean): If `true`, it will include the hidden files/directories.

#### Return
- **Object** The directory tree.



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## :moneybag: Donations

Another way to support the development of my open-source modules is
to [set up a recurring donation, via Patreon][patreon]. :rocket:

[PayPal donations][paypal-donations] are appreciated too! Each dollar helps.

Thanks! :heart:


## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[patreon]: https://www.patreon.com/ionicabizau
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2016#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
