"use strict";

const fsFileTree = require("../lib");

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
