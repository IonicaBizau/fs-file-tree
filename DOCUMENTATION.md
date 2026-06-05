## Documentation

You can see below the API reference of this module.

### `fsFileTree(inputPath, opts)`
Get a directory file tree as an object.

#### Params

- **string** `inputPath`: The input path.
- **object** `opts`: An object containing the following fields:
 - `camelCase` (Boolean): Convert the file names in camelcase format (to be easily accessible using dot notation).
 - `all` (Boolean): If `true`, it will include the hidden files/directories.

#### Return
- **Promise** A promise that resolves to the file tree object.

