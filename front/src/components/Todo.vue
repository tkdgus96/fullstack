<template>
    <v-list-item class="todo">
        <div>
            <div v-if="!edit" class="todo_title">
                {{title}}
            </div>
            <input v-else type="text" v-model="message" @keydown.enter="editMessage" class="todo_input">
            </div>
        <v-btn color="error" @click="editTodo" class="todo_edit" icon small>
            <v-icon>mdi-wrench</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="blue" @click="$emit('delete', id)" class="todo_action">
            <div>완료</div>
        </v-btn>
    </v-list-item>
</template>

<script>
export default {
  name: 'Todo',
  props: {
    title: {
      type: String,
      require: true
    },
    id: {
      type: Number,
      require: true
    },
    done: {
      type: Boolean,
      default: false
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    editTodo () {
      this.message = this.title
      if (this.edit === false) this.edit = true
      else this.edit = false
    },
    editMessage (id) {
      this.$emit('edit', this.id, this.message)
      this.edit = false
    }
  },
  data: () => ({
    doneData: false,
    message: ''
  }),
  mounted () {
    this.doneData = this.done
  },
  computed: {
    controllDone: {
      get () {
        return this.doneData
      },
      set (value) {
        this.doneData = value
      }
    }
  }
}
</script>
