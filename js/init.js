var firebaseConfig = {
    apiKey: "AIzaSyDdDZAfg8ytMf9tbcyc8EeIP_WM23O17Wk",
    authDomain: "rppg-24b77.firebaseapp.com",
    projectId: "rppg-24b77",
    storageBucket: "rppg-24b77.appspot.com",
    messagingSenderId: "988914224486",
    appId: "1:988914224486:web:f14f714de91e6db8d2cca7",
    measurementId: "G-VX0D9QVQYK"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
   // db.collection("student").get().then((snapshot)=>{
     //   snapshot.docs.forEach(doc=>{
       //     console.log(doc.data());
        //})
   // })
