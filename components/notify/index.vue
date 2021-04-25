<template>
  <div v-show="show" :class="[$style.notify, $style[location], $style[type]]">
    {{ message }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: '',
      duration: 3000,
      type: '',
      location: '',
    }
  },

  watch: {
    show: {
      deep: true,
      handler() {
        if (this.show) {
          setInterval(() => {
            this.show = false
          }, this.duration)
        }
      },
    },
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'notify/SHOW_MESSAGE') {
        this.message = state.notify.message
        this.duration = state.notify.duration
        this.type = state.notify.type
        this.location = state.notify.location
        this.show = true
      }
    })
  },
}
</script>

<style lang="scss" scoped module>
.notify {
  position: absolute;
  z-index: 1;
  min-width: 250px;
  margin: 0 auto;
  background-color: #000;
  color: #fff;
  border-radius: 2px;
  padding: 16px;
}

.success {
  background-color: greenyellow;
}

.alert {
  background-color: orange;
}

.error {
  background-color: red;
}

.top {
  top: 40px;
}

.topLeft {
  top: 40px;
  left: 30px;
}

.topRight {
  top: 40px;
  right: 30px;
}

.bottom {
  bottom: 40px;
}

.bottomLeft {
  bottom: 30px;
  left: 30px;
}

.bottomRight {
  bottom: 30px;
  right: 30px;
}
</style>
