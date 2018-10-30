# vue-components

Shared Vue components for Officient.  

## Installation

`npm i --save github:Officient/vue-components#v1.0.0`  
Replace v1.0.0 with the current version.  

## Development

### Using a component

You can use a component by requiring `officient-vue-components` followed by the path of the component.  
E.g. `import AvatarImage from 'officient-vue-components/components/AvatarImage/AvatarImage.vue'`

**Note:** The .vue extension is required for it to load correctly.

### SCSS

Make sure to always include the CSS in the JavaScript using import.  
Do not use styling in the single file components.  

This ensures that the CSS is loaded into the built file for production and not a separate file.

