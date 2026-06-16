/// CartShare App - Firebase Version for Brief

// Firebase Config - Nee screenshot nunchi techukunna
const firebaseConfig = {
  apiKey: "AIzaSyAx9C3vNYuWTNiQv0oE7ZxcZepcCQ-FCU",
  authDomain: "keerthana-cart-cd019.firebaseapp.com",
  databaseURL: "https://keerthana-cart-cd019-default-rtdb.firebaseio.com",
  projectId: "keerthana-cart-cd019",
  storageBucket: "keerthana-cart-cd019.firebasestorage.app",
  messagingSenderId: "907890031134",
  appId: "1:907890031134:web:b66de4ec0ef9fcb4a58f",
  measurementId: "G-ZT550EWQPF"
};

firebase.initializeApp(firebaseConfig);

// Get Room Code & User Name
const urlParams = new URLSearchParams(window.location.search);
const roomCode = urlParams.get('room');
const userName = localStorage.getItem('cartShareUser') || 'Guest';

document.getElementById('roomCode').innerText = roomCode || 'No Room';
document.getElementById('userName').innerText = userName;

const roomRef = firebase.database().ref('rooms/' + roomCode);
const itemsRef = roomRef.child('items');
const logRef = roomRef.child('activityLog');

// Load Items & Calculate Total
itemsRef.on('value', (snapshot) => {
  const items = snapshot.val();
  const list = document.getElementById('itemList');
  list.innerHTML = '';
  let total = 0;
  let count = 0;

  if (items) {
    for (let key in items) {
      const item = items[key];
      total += Number(item.price) || 0;
      count++;
      list.innerHTML += `
        <div class="item">
          <span>${item.name} - ₹${item.price}</span>
          <button class="delete-btn" onclick="deleteItem('${key}', '${item.name}')">Delete</button>
        </div>
      `;
    }
  }
  document.getElementById('totalAmount').innerText = total;
  document.getElementById('memberCount').innerText = count > 0? '1+' : '1';
});

// Load Activity Log - Brief Requirement
logRef.limitToLast(10).on('value', (snapshot) => {
  const logs = snapshot.val();
  const logDiv = document.getElementById('activityLog');
  logDiv.innerHTML = '';

  if (logs) {
    Object.keys(logs).reverse().forEach(key => {
      logDiv.innerHTML += `<div class="log-item">${logs[key].message}</div>`;
    });
  }
});

// Add Item Function
window.addItem = function() {
  const itemName = document.getElementById('itemName').value.trim();
  const itemPrice = document.getElementById('itemPrice').value.trim();

  if (itemName && itemPrice) {
    itemsRef.push({
      name: itemName,
      price: Number(itemPrice),
      addedBy: userName
    });

    logRef.push({
      message: `${userName} added ${itemName} - ₹${itemPrice}`,
      timestamp: Date.now()
    });

    document.getElementById('itemName').value = '';
    document.getElementById('itemPrice').value = '';
  } else {
    alert('Please enter item name and price');
  }
}

// Delete Item Function
window.deleteItem = function(key, itemName) {
  itemsRef.child(key).remove();
  logRef.push({
    message: `${userName} removed ${itemName}`,
    timestamp: Date.now()
  });
}
