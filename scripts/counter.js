// Инициализация Firebase (данные из консоли)
const firebaseConfig = {
	apiKey: "AIzaSyCgo-JC1NUrKdjvVHEEFBYhPR8FxSxIJ6c",
    authDomain: "web-count-80a06.firebaseapp.com",
    projectId: "web-count-80a06",
    storageBucket: "web-count-80a06.firebasestorage.app",
    messagingSenderId: "184045022668",
    appId: "1:184045022668:web:47a44c4839581384a84169"
};

// Инициализация
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Функции
async function countVisit() {
  const today = new Date().toISOString().split('T')[0];
  try {
    const ip = await fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => data.ip);
    
    await db.collection("visits").add({
      date: today,
      ip: ip,
      timestamp: new Date()
    });
  } catch (e) {
    console.log("Ошибка записи:", e);
  }
}

async function updateCounter() {
  const today = new Date().toISOString().split('T')[0];
  
  try {
    const totalSnapshot = await db.collection("visits").count().get();
    document.getElementById("total").textContent = totalSnapshot.data().count;

    const todaySnapshot = await db.collection("visits")
      .where("date", "==", today)
      .count()
      .get();
    document.getElementById("today").textContent = todaySnapshot.data().count;
  } catch (e) {
    console.log("Ошибка загрузки:", e);
  }
}

// Запуск
window.addEventListener('DOMContentLoaded', () => {
  countVisit().then(() => updateCounter());
});