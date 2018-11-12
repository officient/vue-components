# vue-components

Shared Vue components for Officient.

## Installation

`npm i --save github:Officient/vue-components#v1.0.0`  
Replace v1.0.0 with the current version.

## Usage

```
// Importing a component:
import AvatarImage from 'officient-vue-components/lib/components/AvatarImage.vue'

// importing utils
import daysOffTransformer from officient-vue-components/lib/utils/transformers/daysOff
```

## Development

Component and utils source code goes into `/src`.
To allow it to be used externally, you need to also add it to the `/lib` folder.

- examples of usage: `/testpages`
- unit tests: `/unittests`
- lib usage to be imported: `/lib`
- source code: `/src`

### SCSS

Import the CSS in your Vue file in the script section.

### Release

Increment the version in package.json and create a release from the latest commit.  
Releases can be created in the `releases` tab on top.

The projects using this package require an update to the version tag.  
E.g. `"officient-vue-components": "github:Officient/vue-components#v1.0.1",`  
Run `npm install` after updating the version number to grab the latest version.
