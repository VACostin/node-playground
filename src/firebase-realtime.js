/* eslint-disable jest/require-hook */
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set } = require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyDuU8VDVppooo3R0z35txU9snzYXuwRqQI",
  authDomain: "deep-arch-283408.firebaseapp.com",
  databaseURL: "https://deep-arch-283408-default-rtdb.firebaseio.com",
  projectId: "deep-arch-283408",
  storageBucket: "deep-arch-283408.appspot.com",
  messagingSenderId: "944641948256",
  appId: "1:944641948256:web:eddc78d27f575119822105",
  measurementId: "G-0DFDJRNGRF"
};

const write = async (userId, name, email, imageUrl) => {
  const db = getDatabase();
  await set(ref(db, `users/${userId}`), {
    username: name,
    email,
    profile_picture: imageUrl
  });
};

// Rest just copy from here, too lazy to do it rn
// https://firebase.google.com/docs/database/web/read-and-write

const run = async () => {
  const app = initializeApp(firebaseConfig);
  await write("nicu", "marian", "no@mail.com", "nowhere");
  process.exit();
};

run();
