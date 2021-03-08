firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        document.getElementById("login-div").style.display = "none";
   document.getElementById("user-div").style.display = "block";
    } else {
        document.getElementById("login-div").style.display = "block";
        document.getElementById("user-div").style.display = "none";
    }
  });

function login(){
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value; 

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Wrong username or Password");
  });
}
function logout(){
firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}

document.querySelector('#submitBtn').addEventListener('click', function(){
    let postAuthor= document.querySelector("#author").value;
    let postTitle= document.querySelector("#postTitle").value;
    let postContent= document.querySelector("#postContent").value;
    let postDate= document.querySelector("#postDate").value;
    let Postid = document.querySelector("#id").value;
    if(
        postAuthor === ''    ||
        postTitle===''     ||
        postContent ===''  ||
        postDate===''
)   {
    alert('Fields Empty')
} 
else{
    var postRef = db.collection("posts");
    postRef.doc(Postid).set({
        author:postAuthor,
        createdAt:postDate,
        postName:postTitle,
        postContent:postContent
    })
 
}
});