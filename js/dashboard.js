import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDocs, collection } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

onAuthStateChanged(auth, async user => {
  if (!user) location.href="admin.html";

  load("customRequests","requests");
  load("contributors","contributors");
});

async function load(col, id){
  const ul=document.getElementById(id);
  const snap=await getDocs(collection(db,col));
  snap.forEach(d=>{
    const li=document.createElement("li");
    li.innerText=JSON.stringify(d.data());
    ul.appendChild(li);
  });
}
