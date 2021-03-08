// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD7_3aOYVz5xvqavE8yfT-ZRTaus4JYS20",
    authDomain: "thoughtsgrownhere.firebaseapp.com",
    projectId: "thoughtsgrownhere",
    storageBucket: "thoughtsgrownhere.appspot.com",
    messagingSenderId: "61106759052",
    appId: "1:61106759052:web:e89f4a5d03271ebc1aa2a9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let postCollection = document.querySelector("#posts-collection");
  let singlepost = document.querySelector("#single-post");
  const db = firebase.firestore();


  function createPost(title,time,content,Postid){
      let div=document.createElement('div');
      div.setAttribute('class', 'col-md-4');
      let h2 =document.createElement("h2");
      let p=document.createElement("p");
      let small =document.createElement("small");
      let btn = document.createElement("BUTTON");
      btn.id="read-button";
      btn.className = "btn btn-primary";
      btn.style.cssText = 'color: white;'
      btn.onclick = function(){getSinglePost(Postid)};
      btn.innerHTML = "Read More";
      p.style.cssText='height:6em; overflow:hidden;';
      div.style.cssText='margin-bottom:2em;'
      h2.textContent = title;
      small.textContent = time;
      p.textContent = content;
      
     

      div.appendChild(h2);
      div.appendChild(small);
      div.appendChild(p);
      div.appendChild(btn);
     
      
      postCollection.appendChild(div); 
  }

 
  //Get Posts
  function getPosts(){
    
    document.getElementById("single-post").style.display = "none";
    db.collection("posts")
    .get().then(snapshot =>{ snapshot.docs.forEach((doc) =>{
            var Postid = doc.id;
            
         createPost(
             doc.data().postName,
             doc.data().createdAt,
             doc.data().postContent,
             Postid
            
         )
      });
  }).catch(err =>{
    console.log(err);
  });
  }
getPosts();

function createSinglePost(title,time,content){
  let div=document.createElement('div');
  div.setAttribute('class', 'col-md-12');
  let h2 =document.createElement("h1");
  let p=document.createElement("p");
  let small =document.createElement("small");
  h2.textContent = title;
  small.textContent = time;
  p.textContent = content;
  div.appendChild(h2);
  div.appendChild(small);
  div.appendChild(p);
  singlepost.appendChild(div); 
}
//single-post


function getSinglePost(Postid){
  document.getElementById("posts-collection").style.display = "none";
  document.getElementById("single-post").style.display = "block";
  var docRef = db.collection("posts").doc(Postid);
  docRef.get().then((doc) => {
      if (doc.exists) {
            
        createSinglePost(
          doc.data().postName,
          doc.data().createdAt,
          doc.data().postContent
         
      )
     
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
  });

  

}





