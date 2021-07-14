<template>
  <v-app>
    <v-container fluid>
      <v-banner align="center" color="error">
        To Do List
      </v-banner>
      <template>
        <Input @message="addTodo"/>
        <v-list class="todo_list">
         <Todo v-for="(todo, index) in list" @delete="deleteTodo" @edit="editTodo" :id="todo.id" :title="todo.text" :done="todo.done" :edit="todo.edit" :key="index"></Todo>
        </v-list>
          </template>
    </v-container>
  </v-app>
</template>

<script>
import Input from '@/components/Input'
import Todo from '@/components/Todo'
import axios from 'axios'

export default {
  name: 'App',

  components: {
    Input, Todo
  },
  data: () => ({
    list: []
  }),
  methods: {
    async addTodo (message) {
      await axios.post('http://localhost:3000/add_todo', { text: message })

      const res = await axios.post('http://localhost:3000/get_todo')
      this.list = res.data
      console.log(this.list)
    },
    async deleteTodo (id) {
      await axios.post('http://localhost:3000/delete_todo', { id })

      const res = await axios.post('http://localhost:3000/get_todo')
      this.list = res.data
    },
    async editTodo (id, message) {
      await axios.post('http://localhost:3000/update_todo', { text: message, id })

      const res = await axios.post('http://localhost:3000/get_todo')
      this.list = res.data
    }
  }
}
</script>
