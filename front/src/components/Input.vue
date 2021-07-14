<template>
    <v-text-field
    class= "input"
    label="할 일을 입력하세요"
    filled
    v-model="message"
    append-icon="mdi-send"
    @keydown.enter="sendMessage"
    @click:append="sendMessage"
    ></v-text-field>
</template>

<script>
export default {
  name: 'Input',
  data: () => ({
    message: ''
  }),
  methods: {
    sendMessage () {
      if (this.message !== '') {
        this.$emit('message', this.message)
        this.message = ''
      }
    }
  }
}
</script>
