## Documentation

You can see below the API reference of this module.

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

