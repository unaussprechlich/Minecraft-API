# minecraft-api

`minecraft-api` is a simple wrapper around the [Minecraft API](http://wiki.vg/Mojang_API). The package is really lightweight and does use Promises as return type.

## Installation

    npm install --save minecraft-api

## Usage

### MinecraftAPI.uuidForName(username)

Parameters:

 * **username**: The username to resolve the UUID for

Example:
 ```js
 const MinecraftAPI = require('minecraft-api');

 function foo() {
     MinecraftAPI.uuidForName('jeb_')
         .then(uuid => console.log(uuid))
         .catch(err => console.log(err))
 }
 ```

Example (async/await):
```js
const MinecraftAPI = require('minecraft-api');

async function foo() {
    try{
        const uuid = await MinecraftAPI.uuidForName('jeb_');
        console.log(uuid);
    } catch(err){
        console.error(err);
    }
}
```
