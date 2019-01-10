
// https://materialdesignicons.com/
const icons = [
  require("vue-material-design-icons/Close.vue"),
]

/**
 * Available icons, find the full list on https://materialdesignicons.com/
 * Import the filename from the top and add it below to have the icon available everywhere.
 */
export default {
  install (Vue) {
    for (const iconRequire of icons) {
      const component = iconRequire.default
      Vue.component(formatName(component.name), component)
    }
  }
}

function formatName(iconName) {
  return `Icon${iconName.replace('Icon', '')}`
}
