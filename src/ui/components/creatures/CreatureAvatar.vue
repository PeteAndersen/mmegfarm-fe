<template>
  <div :style="`height:${size};width:${size}`">
    <img class="avatar" :src="avatarUrl" />
    <img
      v-if="stars"
      v-for="x in creature.rank"
      :key="x" 
      src="/static/star-yellow-full.png"
      :class="{
        'star-1': x == 1,
        'star-2': x == 2,
        'star-3': x == 3,
        'star-4': x == 4,
        'star-5': x == 5,
        'of-1': creature.rank == 1,
        'of-2': creature.rank == 2,
        'of-3': creature.rank == 3,
        'of-4': creature.rank == 4,
        'of-5': creature.rank == 5,
      }"
    />
    <div class="level-text">
      <span v-if="level">{{ level }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreatureAvatar",
  props: {
    creature: {
      type: Object,
      required: true
    },
    stars: {
      type: Boolean,
      default: true,
      required: false
    },
    level: {
      type: Number,
      required: false
    },
    size: {
      type: String,
      default: "76px",
      required: false
    }
  },
  computed: {
    avatarUrl: function() {
      return this.creature.trackingName ? `/static/creatures/portraits/${this.creature.trackingName}.png` : `/static/creatures/portraits/default.png`
    }
  }
};
</script>

<style scoped>
div {
  position: relative;
  margin: auto;
}

.level-text {
  position: absolute;
  bottom: 0;
  left: 0;
  font-weight: 600;
  text-align: center;
  width: 100%;
}

.level-text > span {
  background: #373737;
  color: #f7f7f7;
}

img.avatar {
  height: 100%;
  width: 100%;
}

.star-1,
.star-2,
.star-3,
.star-4,
.star-5 {
  position: absolute;
  margin-left: -11.4px;
  height: 26%;
}

.star-1.of-1,
.star-2.of-3,
.star-3.of-5 {
  top: -10%;
  left: 50%;
}

.star-1.of-2,
.star-2.of-4 {
  top: -8%;
  left: 35%;
  transform: rotate(-15deg);
}

.star-2.of-2,
.star-3.of-4 {
  top: -8%;
  left: 65%;
  transform: rotate(15deg);
}

.star-1.of-3,
.star-2.of-5 {
  top: -4%;
  left: 24%;
  transform: rotate(-30deg);
}

.star-3.of-3,
.star-4.of-5 {
  top: -4%;
  left: 76%;
  transform: rotate(30deg);
}

.star-1.of-4 {
  top: 7%;
  left: 10%;
  transform: rotate(-55deg);
}

.star-4.of-4 {
  top: 7%;
  left: 90%;
  transform: rotate(55deg);
}

.star-1.of-5 {
  top: 14%;
  left: 8%;
  transform: rotate(-70deg);
}

.star-5.of-5 {
  top: 14%;
  left: 94%;
  transform: rotate(70deg);
}
</style>
