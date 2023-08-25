<script setup>

import { io } from 'socket.io-client';
import { ref , onBeforeMount, nextTick } from 'vue';
// import Chat from './components/Chat.vue'
// onBeforeMount is a lifecycle hook that runs before the component is mounted
const socket = io('http://localhost:3001');
const messages = ref([]); // Array of messages
const message = ref(''); // Current message
const username = ref(''); // Current username
const isClientHasJoined = ref(false); // Has the user joined the chat?
const typingDisplay = ref(''); // Display typing message
// get all messages from server
onBeforeMount(() => {
  socket.emit('findAllMessages', {}, (response) => {
    // response is an array of messages
    messages.value = response; 
  });

  // listen for new messages from server
  socket.on('newMessage', (message) => {
    messages.value.push(message);

    // scroll to bottom of messages
    scrollToLastMessage();
  });

});

// Scroll to the last message
const scrollToLastMessage = () => {
  nextTick(() => {
    const messageContainer = document.getElementById('message-container');
    messageContainer.scrollTop = messageContainer.scrollHeight;
  });
};

// send message to server
const sendMessage = () => {
  if (message.value === '') {
    return;
  }
  socket.emit('createMessage', {
    name: username.value,
    message: message.value,
  });
  message.value = '';
};


// listen for user joining chat
const joinChat = () => {
  socket.emit('clientHasJoined', {
    name: username.value,
  });
  if (username.value === '') {
    alert('Please enter a username');
    return;
  }
  isClientHasJoined.value = true;
};





</script>

<template class="flex items-center justify-center">
<div class="chat chat-start">
  <div v-if="!isClientHasJoined" class="join-chat">
    <h2>Join the chat</h2>
    <input v-model="username" type="text" placeholder="Enter your name" />
    <button class="btn" @click="joinChat">Join</button>
  </div>
  <div v-else class="chat-container">
    <div class="messages"  id="message-container">
      <div v-for="message in messages" class="message">
        <div v-if = "message.name === username" class="chat chat-start ">
          <div class="message-name chat-bubble chat-bubble-primary">{{ message.message }}</div>
          <div class="message-name ">{{ message.name }} {{ message.timestamp }}</div>
        </div>
        <div v-else class="chat chat-end">
          <div class="message-name chat-bubble chat-bubble-success my-5">{{ message.message }}</div>
          <div>
            <div class="message-name ">{{ message.name }} {{ message.timestamp }}</div>
          </div>
        </div>
      </div>
    </div>

    <hr />

   <div class="input">
      <form @submit.prevent="sendMessage">
        <label style="width: 2%;" for="message">Message</label>
        <input
          v-model="message"
          @input="emitTyping"
          type="text"
          placeholder="Type your message..."
        />
        <!-- <button type="submit" class="btn">Send</button> -->
        <button type="submit" class="btn">
          Button
        </button>
      </form>
    </div>
  </div>
</div>
</template>

<style >
@import './assets/base.css';
</style>