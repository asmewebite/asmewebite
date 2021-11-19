const userDetails  = document.querySelector('.userDetails')
const editProfile  = document.querySelector('#editProfile')


function createUserCollection(user){
   firebase.firestore().collection('users')
   .doc(user.uid)
   .set({
       uid:user.uid,
       name:user.displayName,
       email:user.email,
       phone:"",
       whatsapp:"",
       department:"",
       department2:"",
       college:"",
       status:""
   })
}


async function getuserInfo(userID){
    if(userID){
      const userInfoSnap = await  firebase.firestore()
    .collection('users')
    .doc(userID)
    .get()

   const userInfo = userInfoSnap.data()
   if(userInfo){
       userDetails.innerHTML = `
       <h3>${userInfo.name}</h3>
       <h3>${userInfo.email}</h3>
       <h3>${userInfo.phone}</h3>
       `
   }    
    }else{
        userDetails.innerHTML = `
        <div class="container">

      
        <h4 style="color: yellow;margin-top:120px">'Member login only'</h4></div>

        <div class="container" style="margin-top:50px">
          

          <p style="color:white">Be a part of this welfare operation by undertaking the pledge to serve people and generation.<br>
          Looking forward towards the growth of an incredible community</p>
          <p></p>
          

  </div>
  <div class="container" style="width:200px;background-color:#5793D1;padding:8px;border-radius: 8px;margin-top:70px;cursor: pointer">
  <a class="modal-trigger" href="#modal2" id="loginli" style="color:white;padding:8px;width:200px">Login</a></div>
        `
    }


}



async function getuserInfoRealtime(userID){
    if(userID){
      const userdocRef = await  firebase.firestore()
        .collection('users')
        .doc(userID)
        userdocRef.onSnapshot((doc)=>{
            if(doc.exists){
                 const userInfo = doc.data()
                    if(userInfo){
                        userDetails.innerHTML = `
                        <div class="userdee" style="background-color:#5793D1;text-align: left;width: 100%;padding: 10px">
                        <div class="collection-item"><h5 style="color:white;font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;"">${userInfo.name}</h5></div>
                        <div class="collection-item"  style="color:rgb(219, 219, 219)"> E-mail :  ${userInfo.email}<br>

                       </div>

                        
                        
                      </div>
                   


                     
                     
                      
                      </div>


                      <div class="container" style="padding: 10px;margin-top: 30px;text-align: center;">

                      <button class="logged-in" onclick="location.href='messages.html'" style="color:white;background-color: rgb(73, 73, 73);cursor: pointer;padding: 10px;border-radius: 8px;text-align: center;box-shadow: 1px 3px 5px rgba(0,0,0,0.1);width: 100%;height: 100px;">Messages</button>
                     
                      <button class="logged-in" onclick="location.href='caddict.html'" style="margin-top:10px;color:white;background-color: rgb(73, 73, 73);cursor: pointer;padding: 10px;border-radius: 8px;text-align: center;box-shadow: 1px 3px 5px rgba(0,0,0,0.1);width: 100%;height: 100px;">CADDICT-A Design Hackathon</button>
                       <button class="logged-in" onclick="location.href='EVDM.html'" style="margin-top:10px;color:white;background-color: rgb(73, 73, 73);cursor: pointer;padding: 10px;border-radius: 8px;text-align: center;box-shadow: 1px 3px 5px rgba(0,0,0,0.1);width: 100%;height: 100px;">Electric Vehicle Design Workshop</button>
                      
                      </div>

                        
                        `
                       

                       


                }    
             }
        })


    }else{
        userDetails.innerHTML = `
        <div class="container">

      
        <h2 style="color: #5793D1;margin-top:90px;font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;"">'ASME-VIT Portal'</h2></div>

        <div class="container" style="margin-top:50px">
          

          
          

  </div>
 
  <button class="modal-trigger" href="#modal2" id="loginli" style="width:200px;color:white;padding:8px;width:200px;border-radius: 8px;margin-top:70px;cursor: pointer;background-color:#5793D1;padding:8px;border:none;height: 40px">Login</button>
        
       
        `
    }
}


function updateUserProfile(e){
    e.preventDefault()
    const userDocRef =  firebase.firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)


    userDocRef.update({
        name:editProfile["name"].value,
        email:editProfile["profileEmail"].value,
        phone:editProfile["phoneno"].value,
        whatsapp:editProfile["whatsapp"].value,
        college:editProfile["college"].value,
        department:editProfile["department"].value,
        status:editProfile["status"].value

    })

    M.Modal.getInstance(myModel[2]).close()
}





async function allUserDetails(){
  document.getElementById('table').style.display='table'
  const userRef = await firebase.firestore().collection('users').get()  
  userRef.docs.forEach(doc=>{
           const info =   doc.data()
           document.getElementById('tbody').innerHTML += `
           <tr>
            <td>${info.name}</td>
            <td>${info.email}</td>
            <td>${info.phone}</td>
            <td>${info.whatsapp}</td>
            <td>${info.experience}</td>
            <td>${info.college}</td>
            <td>${info.status}</td>
          </tr>
           `
    })
 
}





//Messages

var db = firebase.firestore();
 
function storeData() {
 
  
  var inputname = document.getElementById("name").value;
  var inputemail = document.getElementById("email").value;
  var inputsubject = document.getElementById("subject").value;
  var inputmessage = document.getElementById("message").value;
 
     db.collection("comments").add({
         name: inputname,
         email: inputemail,
         subject: inputsubject,
         message: inputmessage,
         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(()=>{
          document.querySelector('.alert').style.display = 'block';
      
          // Hide alert after 3 seconds
       setTimeout(function(){
        document.querySelector('.alert').style.display = 'none';
      },3000);
      
      // Clear form
      document.getElementById('messageform').reset();
      
      
        });
      }
      



       //Registrations

      // Reference messages collection
var dataRef = firebase.database().ref('Caddict');

// Listen for form submit
document.getElementById('reg').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values

  var teamname = getInputVal('TeamName');


  var name1 = getInputVal('Name1');
  var email1 = getInputVal('Email1');
  var college1 = getInputVal('College1');
  var whatsapp1 = getInputVal('Whatsapp1');
  var contact1 = getInputVal('Contact1');

  var name2 = getInputVal('Name2');
  var email2 = getInputVal('Email2');
  var college2 = getInputVal('College2');
  var whatsapp2 = getInputVal('Whatsapp2');
  var contact2 = getInputVal('Contact2');

  var name3 = getInputVal('Name3');
  var email3 = getInputVal('Email3');
  var college3 = getInputVal('College3');
  var whatsapp3 = getInputVal('Whatsapp3');
  var contact3 = getInputVal('Contact3');



// Save message
saveData(teamname, name1, email1, college1, whatsapp1, contact1, name2, email2, college2, whatsapp2, contact2, name3, email3, college3, whatsapp3, contact3 );

document.querySelector('.alert').style.display = 'block';
      
          // Hide alert after 3 seconds
       setTimeout(function(){
        document.querySelector('.alert').style.display = 'none';
      },3000);
 // Clear form
 document.getElementById('reg').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveData(teamname, name1, email1, college1, whatsapp1, contact1, name2, email2, college2, whatsapp2, contact2, name3, email3, college3, whatsapp3, contact3 ){
  var newDataRef = dataRef.push();
  newDataRef.set({

    teamname:teamname,
 
    name1:name1,
    email1:email1,
    college1:college1,
    whatsapp1:whatsapp1,
    contact1:contact1,
    name2:name2,
    email2:email2,
    college2:college2,
    whatsapp2:whatsapp2,
    contact2:contact2,
    name3:name3,
    email3:email3,
    college3:college3,
    whatsapp3:whatsapp3,
    contact3:contact3,

   
   
  });
}















