var firebaseConfig = {
  apiKey: "AIzaSyBrqsxfpgvnranZURCMdJqcXqvYXtjv1dg",
  authDomain: "asmeportal.firebaseapp.com",
  databaseURL: "https://asmeportal-default-rtdb.firebaseio.com",
  projectId: "asmeportal",
  storageBucket: "asmeportal.appspot.com",
  messagingSenderId: "831583795108",
  appId: "1:831583795108:web:c2290b92d03722b34db331",
  measurementId: "G-CGZKGS5MVH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const rootRef = firebase.database().ref();

const commentsRef = rootRef.child('comments');

document.getElementById('btnSubmitComment').addEventListener('click', function () {

  var newcomment = document.getElementById('txComment').value.replace(/\n/g, "<br>");

  var newPostRef = commentsRef.push();


  newPostRef.set({
    name: document.getElementById('tbName').value.trim(),
    comment: newcomment.trim(),
    frompage: location.pathname,
    when: firebase.database.ServerValue.TIMESTAMP
  });
});



function showpastcomments() {
        var showat = document.getElementById('pastcomments');
        //Get comments whose from page equals this page's pathname.
        var commentsRef = firebase.database().ref('comments/').orderByChild('frompage').equalTo(location.pathname);
        commentsRef.once('value', function (snapshot) {
            snapshot.forEach(function (itemSnapshot) {
                //Get the object for one snapshot
                var itemData = itemSnapshot.val();
                var comment = itemData.comment;
                var name = itemData.name;
                var when = new Date(itemData.when).toLocaleDateString("en-us");
                showat.innerHTML += "<li>" + comment + "<span> -- " + name + " (" + when +
                    ")</span></li>";
            })
        })
    }
    //Called when page first opens and also after Submit button click to show all comments for this page.
    showpastcomments()