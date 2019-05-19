import firebase from 'firebase';
// import 'firebase/storage';

const config = {
    apiKey: "AIzaSyB-x7ROQZEb9fFkoWzGVhw2FNq2qiQJjTY",
    authDomain: "file-uploader-35918.firebaseapp.com",
    databaseURL: "https://file-uploader-35918.firebaseio.com",
    projectId: "file-uploader-35918",
    storageBucket: "file-uploader-35918.appspot.com",
    messagingSenderId: "859570481489",
    appId: "1:859570481489:web:6d7352303f1efdea"
};

firebase.initializeApp(config);

// const storage = firebase.storage();
// const database = firebase.database();

export default firebase;