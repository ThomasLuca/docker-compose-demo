<template>
  <div class="hello">
    <h1>Hello World 🍄</h1>
    <button @click="getJoke">Get Joke</button>
    <p>{{joke}}</p>
    <button @click="getBackendMessage">Get Backend Message</button>
    <p>{{backendMessage}}</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data() {
    return {
      joke: "",
      backendMessage: ""
    }
  },
  methods: {
    getJoke() {
      axios.get(process.env.VUE_APP_JOKE_BASE_URL)
      .then((res) => {
        this.joke = res.data.joke
      })
      .catch((err) => {
        console.log(err)
        this.joke = "could not get joke"
      })
    },
    getBackendMessage() {
      axios.get(`${process.env.VUE_APP_BACKEND_BASE_URL}/message`)
      .then((res) => {
        this.backendMessage = res.data.message
      })
      .catch((err) => {
        console.log(err)
        this.backendMessage = "could not get message"
      })
    }
  }
}
</script>
