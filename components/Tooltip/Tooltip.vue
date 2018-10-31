<template>
  <span class="md-tooltip" :class="classes" :style="style">
    <slot :active="active" />
  </span>
</template>

<script>
  // https://github.com/vuematerial/vue-material/tree/master/src/components/mdTooltip

  export default {
    name: 'Tooltip',
    props: {
      mdDirection: {
        type: String,
        default: 'bottom'
      },
      color: {
        type: String,
        default: '#233447'
      }
    },
    data: () => ({
      active: false,
      parentClass: null,
      topPosition: false,
      leftPosition: false,
    }),
    computed: {
      classes() {
        const cssClasses = {
          'md-active': this.active,
          'md-tooltip-top': this.mdDirection === 'top',
          'md-tooltip-right': this.mdDirection === 'right',
          'md-tooltip-bottom': this.mdDirection === 'bottom',
          'md-tooltip-left': this.mdDirection === 'left'
        };

        if (this.parentClass) {
          cssClasses[this.parentClass] = true;
        }

        return cssClasses;
      },
      style() {
        return {
          backgroundColor: this.color,
          top: this.topPosition + 'px',
          left: this.leftPosition + 'px'
        };
      }
    },
    watch: {
      mdDirection() {
        this.calculateTooltipPosition();
      }
    },
    methods: {
      removeTooltips() {
        if (this.tooltipElement.parentNode) {
          this.tooltipElement.parentNode.removeChild(this.tooltipElement);
        }
      },
      calculateTooltipPosition() {
        let position = this.parentElement.getBoundingClientRect();
        let tooltipbounds = this.tooltipElement.getBoundingClientRect();
        let cssPosition = {};
		
		// we should have a minimum number for the position 'left', to avoid placing the tooltip off-screen
		var minimum_position_left = 20  + tooltipbounds.width / 2;

        switch (this.mdDirection) {
          case 'top':
            cssPosition.top = position.top - this.$el.offsetHeight;
            cssPosition.left = position.left + position.width / 2;

            break;

          case 'right':
            cssPosition.top = position.top;
            cssPosition.left = position.left + position.width;

            break;

          case 'bottom':
            cssPosition.top = position.bottom;
            cssPosition.left = position.left  + position.width / 2;

            break;

          case 'left':
            cssPosition.top = position.top;
            cssPosition.left = position.left - this.$el.offsetWidth;

            break;

          default:
            console.warn(`Invalid ${this.mdDirection} option to md-direction option`);
        }

        this.topPosition = cssPosition.top;
        this.leftPosition =  Math.max( minimum_position_left , cssPosition.left) ;
      },
      generateTooltipClasses() {
        let classes = [];

        [...this.parentElement.classList].forEach((cssClass) => {
          if (cssClass.indexOf('md-') >= 0 && cssClass !== 'md-active') {
            classes.push(cssClass + '-tooltip');
          }
        });

        this.parentClass = classes.join(' ');
      },
      open() {
        this.removeTooltips();

        // No content in tooltip, don't append
        if (this.tooltipElement.childNodes.length === 0) return;

        document.body.appendChild(this.tooltipElement);
        getComputedStyle(this.tooltipElement).top;
        this.generateTooltipClasses();
        this.active = true;

        this.$nextTick(() => {
          this.calculateTooltipPosition();
        })
      },
      close() {
        this.active = false;

       this.removeTooltips();
      }
    },
    mounted() {

        this.tooltipElement = this.$el;
        this.parentElement = this.tooltipElement.parentNode;

        this.$el.parentNode.removeChild(this.$el);

        this.parentElement.addEventListener('mouseenter', this.open);
        this.parentElement.addEventListener('focus', this.open);
        this.parentElement.addEventListener('mouseleave', this.close);
        this.parentElement.addEventListener('blur', this.close);

    },
    beforeDestroy() {
      this.active = false;

      this.removeTooltips();

      if (this.parentElement) {
        this.parentElement.removeEventListener('mouseenter', this.open);
        this.parentElement.removeEventListener('focus', this.open);
        this.parentElement.removeEventListener('mouseleave', this.close);
        this.parentElement.removeEventListener('blur', this.close);
      }
    }
  };
</script>
