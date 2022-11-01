<template>
<div
    class="dropdown"
    :class="active ? 'is-active' : ''"
    @click="active=!active"
>
  <div class="dropdown-trigger">
    <button
        class="button"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
    >
        <span>
            {{chosenValue.name}}
        </span>
        <span class="icon is-small">
            <i class="fas fa-angle-down" aria-hidden="true" />
        </span>
    </button>
  </div>
    <div
        class="dropdown-menu"
        id="dropdown-menu"
        role="menu"
    >
        <div class="dropdown-content">
        <a
            v-for="(option, optionIndex) in options"
            :key = "optionIndex"
            class="dropdown-item"
            @click="chooseValue(option)"
        >
            {{option.name}}
        </a>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'dropdown-view',
    props: {
        options: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
            active: false,
            chosenValue: {
                name: 'All Time',
                value: 0
            }
        }
    },
    methods: {
        chooseValue (option) {
            this.chosenValue = option
            this.$emit('setFilter', option.value)
        }
    }
}
</script>