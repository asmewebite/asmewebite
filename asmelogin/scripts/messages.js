const Memberslist = document.querySelector('#members');

function renderMembers(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let email = document.createElement('span');
    let message = document.createElement('span');
 

  


    li.setAttribute('data-id',doc.id);
    name.textContent = doc.data().name;
    email.textContent = doc.data().email;
    message.textContent = doc.data().message;
  

  


    li.appendChild(name);
    li.appendChild(email);
    li.appendChild(message);
    
 
    
  

    Memberslist.appendChild(li);

}


db.collection('comments').orderBy('name').get().then((snapshot)=>{
    snapshot.docs.forEach(doc => {
        renderMembers(doc);
    })

})



