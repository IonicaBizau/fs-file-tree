"use strict";

import fsFileTree from "../lib/index.js";

// File tree looks like this:
// .
// ├── a
// │   ├── b
// │   │   ├── c
// │   │   └── test.js
// │   └── two\ words
// └── index.js

// Promise/async-await interface
(async () => {
    const tree = await fsFileTree("example/");
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
})();