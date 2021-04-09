<template>
  <div id="chat-window">
    <div id="message-container" class="container">
      <form id="send-container" class="form">
        <div class="row">
          <input type="text" id="message-input" />
          <button type="submit" id="send-button" class="">Send message</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
body {
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
}
#message-container {
  width: 80%;
  max-width: 1200px;
}

#message-container div {
  background-color: #ccc;
  padding: 5px;
}

#message-container div:nth-child(2n) {
  background-color: #fff;
}

#send-container {
  position: fixed;
  padding-bottom: 30px;
  bottom: 0;
  background-color: white;
  max-width: 1200px;
  width: 80%;
  display: flex;
}

#message-input {
  flex-grow: 1;
}
</style>
