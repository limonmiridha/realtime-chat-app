const socket = io();

let username;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');

do {
  username = prompt('Please enter your name: ');
} while (!username);

textarea.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    sendMessage(e.target.value);
    textarea.value = '';
  }
});

const sendMessage = (message) => {
  let msg = {
    username,
    message: message.trim(),
  };
  appendMessage(msg, 'outgoing');
  scrollToBottom();
  socket.emit('message', msg);
};

const appendMessage = (msg, type) => {
  let mainDiv = document.createElement('div');
  let className = type;
  mainDiv.classList.add(className, 'message');

  let markup = `
  <h4>${msg.username}</h4>
  <p>${msg.message}</p>
  `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
};

socket.on('message', (msg) => {
  appendMessage(msg, 'incoming');
  scrollToBottom();
});

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
