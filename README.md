# vue-components

Shared Vue components for Officient.

**NOTE** There is no production branch! To update, check the updating section.

## Installation

`npm i --save github:Officient/vue-components#v1.0.0`  
Replace v1.0.0 with the current version.

## Development

To add a component, add it to the `/src` folder with all the utils, vue files and tests required.
To allow it to be used externally, you need to also add it to the `/components` folder and require
the index file in the `/src` folder.

You should add an example of usage in `/testpages`

### Using a component

You can use a component by requiring `officient-vue-components` followed by the path of the component.  
E.g. `import AvatarImage from 'officient-vue-components/components/AvatarImage'`

### SCSS

Make sure to always include the CSS in the JavaScript using import.  
Do not use styling in the single file components.

This ensures that the CSS is loaded into the built file for production and not a separate file.

## Updating

Increment the version in package.json and create a release from the latest commit.  
Releases can be created in the `releases` tab on top.

The projects using this package require an update to the version tag.  
E.g. `"officient-vue-components": "github:Officient/vue-components#v1.0.1",`  
Run `npm install` after updating the version number to grab the latest version.
