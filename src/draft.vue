/* Загружаем данные на сервер firebase */ // const loadDataInDB = async function
() { // try { // const response = await fetch( //
'https://vue-task-manager-cb60d-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
// { // method: 'POST', // headers: { // 'Content-Type': 'application/json', //
}, // body: JSON.stringify({ // id: Date.now(), // title:
formData.value.title.trim(), // worker: formData.value.worker.trim(), //
deadline: formData.value.deadline.trim(), // desc: formData.value.desc.trim(),
// status: 'на распределении', // }), // } // ) // const firebaseData = await
response.json() // console.log(firebaseData) // } catch (error) { //
console.error('Ошибка:', error) // } // }
