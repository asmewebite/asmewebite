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
      userDetails.innerHTML = `<div id="content_container" class="container" style=" width: 47vh;
      height: 43vh;margin-top:180px">
      
      <div id="form_container" style="width: 100%;height: 100%;background-color: #222222;box-shadow: 0 0 50px -20px #000;border-radius: 2%;overflow: hidden;">
      <div id="form_header_container" style="width: 100%;
      height: 5%;display: flex; justify-content: center;align-items: center;float: left; padding: 20px;padding-bottom: 30px; padding-top: 30px;
      border-bottom: 1px solid transparent; border-color: cornflowerblue;background: #000;">
          <h2 id="form_header" style="display: inline-block; font-size: 15px;font-family: Bowlby One SC;
          font-weight: 900;  text-transform: uppercase;letter-spacing: 1px; background-color: rgb(255, 255, 255);-webkit-background-clip: text;-webkit-text-fill-color: transparent;"> ASME-VIT PORTAL </h2>
      </div>
      <div id="form_content_container" style="width: 100%; height: 90%; float: left; display: flex;justify-content: center;align-items: center;padding-top: 30px;">
          <div id="form_content_inner_container" style="width: 75%;height: 100%;float: left;">
           
          <form autocomplete="off" onsubmit="login(event)" >
              
            <input type="email" id="loginEmail" placeholder="Email" style="width: 100%;
              height: 40px;padding-left: 10px;margin-bottom: 20px;background: #000;font-family: Montserrat;font-weight: 500;color: #fff;
              font-size: 12px; border-bottom: 2px solid transparent;border-top-left-radius: 2%; border-top-right-radius: 2%;border-color: cornflowerblue;">
             
              <input type="password" id="loginPassword" placeholder="Password" style="width: 100%;
              height: 40px;padding-left: 10px;margin-bottom: 20px;background: #000;font-family: Montserrat;font-weight: 500;color: #fff;
              font-size: 12px; border-bottom: 2px solid transparent;border-top-left-radius: 2%; border-top-right-radius: 2%;border-color: cornflowerblue;">
              <a href="#" onclick="forgotPass()">Forgot Password</a><br>
              <div id="button_container" style="width: 100%;height: 45px;background-color: cornflowerblue;color: #fff;margin-top: 15px;" >
                  <button type="submit" style="width: 100%;height: 100%;background: transparent;color: inherit;font-family: Montserrat;letter-spacing: 1px;
                  font-weight: 900;font-size: 12px;cursor: pointer;align-items: center;">Login</button>
                  
              </div>
           </form>
          </div>
      </div></div>
  </div>
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
                        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="assets/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="assets/css/style.css">

    <style>
    .profile-img .pic {
        height: 90%;
        width: 90%;
        -o-object-fit: cover;
        object-fit: cover;
        -o-object-position: center;
        object-position: center;
      }
    </style>
    
                        <div class="sidebar" id="sidebar">
            <div class="sidebar-inner slimscroll">
                <div id="sidebar-menu" class="sidebar-menu">
                    <ul>
                        <li class="menu-title">Admin Panel</li>
                       
                        <li>
                            <a href="main.html"><i class="fa fa-dashboard"></i> <span>Dashboard</span></a>
                        </li>
                        <li >
							<a href="messages.html"><i class="fa fa-bell-o"></i> <span>Messages</span></a>
						</li>
				
						         
                       
                        <li>
                        <a href="members.html"><i class="fa fa-users"></i> <span>Admins Panel</span></a>
                       </li>

                    </ul>
                </div>
            </div>
        </div>
        
        
        <div class="page-wrapper">
        <div class="content">
            <div class="row">
                <div class="col-sm-7 col-6">
                    <h4 class="page-title" style="float:left;font-weight:500;">My Profile</h4>
                </div>
                <div class="col-sm-5 col-6 text-right m-b-30">
                  
                    
      <button type="button" style="margin-left:10px;border-color:#df0f00;background-color:black;padding:7px;"  data-toggle="modal" data-target="#exampleModal">
      <i class="fa fa-sign-out" style="color:#df0f00"></i>
    </button>
                </div>
            </div>
            <div class="card-box profile-header" style="box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.336);">
                <div class="row">
                    <div class="col-md-12">
                        <div class="profile-view">
                            <div class="profile-img-wrap" style="height:25vh;width:24vh;background-color:rgb(22, 22, 22)" >
                                <div class="profile-img">
                                    <img id="proimg"  class="pic circle modal-trigger" href="#modal4" src="../assets/user.png" alt=""><br>
 
                                    <i href="#modal4" class="fa fa-camera upload-button modal-trigger">Upload</i>
                                </div>
                                
                            </div>
                            
                            <div class="profile-basic">
                                <div class="row">
                                    <div class="col-md-5">
                                        <div class="profile-info-left" style="text-align:justify">
                                            <h3 class="user-name m-t-0 mb-0" style="color:white">${userInfo.name}</h3>

                                            <h4 class="text-muted" style="margin-top:5px;color:white">${userInfo.department}</h4>
                                          
                                            
                                    
                                        </div>
                                    </div>
                                    <div class="col-md-7">
                                        <ul class="personal-info" style="text-align:left">
                                            <li>
                                                <span class="title">Phone:</span>
                                                <span class="text"><a>${userInfo.phone}</a></span>
                                            </li>
                                            <li>
                                                <span class="title">Whatsapp:</span>
                                                <span class="text"><a>${userInfo.whatsapp}</a></span>
                                            </li>
                                            <li>
                                                <span class="title">Email:</span>
                                                <span class="text"><a><span class="__cf_email__">${userInfo.email}</span></a></span>
                                            </li>
                                            
                                        
                                        </ul>
                                    </div>
                                    
                                    <button style="background-color: #df0f00;border-radius: 5px;height:35px;width:90px;border: none;cursor: pointer;color: white;margin-left:22px" class="modal-trigger" href="#modal3">Edit details</button> 
         
                               
                               
                                    </div>
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
            

        </div>


        <div class="container-fluid">
        <div class="card">
             <div class="card-header">
                  <h4 class="card-title d-inline-block">MESSAGES</h4> 
             </div>
             <div class="card-body p-0">
                  <div class="table-responsive">
                       <table class="table mb-0">
                       
                            <tbody>
                                 <tr>
                                      <td style="min-width: 200px;">
                                           
                                           <h2><a href="messages.html" >Messages</a></h2>
                                      </td>                 

                                      <td class="text-right">
                                           <a href="messages.html"  class="btn btn-danger take-btn">View</a>
                                      </td>
                                 </tr>
                          
                               

                                
                            </tbody>
                       </table>
                  </div>
             </div>
        </div>
   </div>





        <div class="container-fluid">
        <div class="card">
             <div class="card-header">
                  <h4 class="card-title d-inline-block">EVENT REGISTRATIONS</h4> 
             </div>
             <div class="card-body p-0">
                  <div class="table-responsive">
                       <table class="table mb-0">
                       
                            <tbody>
			     <tr>
                            <td style="min-width: 200px;">
                                 
                                 <h2><a href="MEE2022.html" >>Mechanical Engineering and Entrepreneurship</a></h2>
                            </td>                 

                            <td class="text-right">
                                 <a href="MEE2022.html"  class="btn btn-danger take-btn">View</a>
                            </td>
                       </tr>

                       <tr>
                       <td style="min-width: 200px;">
                            
                            <h2><a href="FSAD.html" >Futuristic view of Sustainable Aircraft Design</a></h2>
                       </td>                 

                       <td class="text-right">
                            <a href="FSAD.html"  class="btn btn-danger take-btn">View</a>
                       </td>
                  </tr>
		  
                                 <tr>
                                      <td style="min-width: 200px;">
                                           
                                           <h2><a href="Recruitments.html" >Recruitments</a></h2>
                                      </td>                 

                                      <td class="text-right">
                                           <a href="Recruitments.html"  class="btn btn-danger take-btn">View</a>
                                      </td>
                                 </tr>
                                 <tr>
                                      <td style="min-width: 200px;">
                                      
                                           <h2><a href="IASTSF.html">IASTSF</a></h2>
                                      </td>                 

                                      <td class="text-right">
                                           <a href="IASTSF.html" class="btn btn-danger take-btn">View</a>
                                      </td>
                                 </tr>
                                 <tr>
                                      <td style="min-width: 200px;">
                                      
                                           <h2><a href="CODMED.html">CODMED</a></h2>
                                      </td>                 

                                      <td class="text-right">
                                           <a href="CODMED.html" class="btn btn-danger take-btn">View</a>
                                      </td>
                                 </tr>
                                 <tr>
                                      <td style="min-width: 200px;">
                                           
                                           <h2><a href="RPM.html">RPM</a></h2>
                                      </td>                 

                                      <td class="text-right">
                                           <a href="RPM.html" class="btn btn-danger take-btn">View</a>
                                      </td>
                                 </tr>
                               

                                
                            </tbody>
                       </table>
                  </div>
             </div>
        </div>
   </div>


                       
                        `
                        editProfile["name"].value = userInfo.name
                        editProfile["profileEmail"].value = userInfo.email
                        editProfile["phoneno"].value = userInfo.phone
                        editProfile["whatsapp"].value = userInfo.whatsapp
                        editProfile["department"].value = userInfo.department
                     


                        if(firebase.auth().currentUser.photoURL){
                            document.querySelector('#proimg').src = firebase.auth().currentUser.photoURL
                        }
                      

                }    
             }
        })


    }else{
        userDetails.innerHTML = `<div id="content_container" class="container" style=" width: 47vh;
        height: 43vh;margin-top:180px">
        
        <div id="form_container" style="width: 100%;height: 100%;background-color: #222222;box-shadow: 0 0 50px -20px #000;border-radius: 2%;overflow: hidden;">
        <div id="form_header_container" style="width: 100%;
        height: 5%;display: flex; justify-content: center;align-items: center;float: left; padding: 20px;padding-bottom: 30px; padding-top: 30px;
        border-bottom: 1px solid transparent; border-color: cornflowerblue;background: #000;">
            <h2 id="form_header" style="display: inline-block; font-size: 15px;font-family: Bowlby One SC;
            font-weight: 900;  text-transform: uppercase;letter-spacing: 1px; background-color: rgb(255, 255, 255);-webkit-background-clip: text;-webkit-text-fill-color: transparent;"> ASME-VIT PORTAL </h2>
        </div>
        <div id="form_content_container" style="width: 100%; height: 90%; float: left; display: flex;justify-content: center;align-items: center;padding-top: 30px;">
            <div id="form_content_inner_container" style="width: 75%;height: 100%;float: left;">
             
            <form autocomplete="off" onsubmit="login(event)" >
                
              <input type="email" id="loginEmail" placeholder="Email" style="width: 100%;
                height: 40px;padding-left: 10px;margin-bottom: 20px;background: #000;font-family: Montserrat;font-weight: 500;color: #fff;
                font-size: 12px; border-bottom: 2px solid transparent;border-top-left-radius: 2%; border-top-right-radius: 2%;border-color: cornflowerblue;">
               
                <input type="password" id="loginPassword" placeholder="Password" style="width: 100%;
                height: 40px;padding-left: 10px;margin-bottom: 20px;background: #000;font-family: Montserrat;font-weight: 500;color: #fff;
                font-size: 12px; border-bottom: 2px solid transparent;border-top-left-radius: 2%; border-top-right-radius: 2%;border-color: cornflowerblue;">
                <a href="#" onclick="forgotPass()">Forgot Password</a><br>
                <div id="button_container" style="width: 100%;height: 45px;background-color: cornflowerblue;color: #fff;margin-top: 15px;" >
                
                 <button type="submit" style="width: 100%;height: 100%;background: transparent;color: inherit;font-family: Montserrat;letter-spacing: 1px;
                    font-weight: 900;font-size: 12px;cursor: pointer;align-items: center;">Login</button>
                    
                </div>
             </form>
            </div>
        </div></div>
    </div>
    </div></div>
    <div class="sidebar-overlay" data-reff=""></div>
    <script src="assets/js/jquery-3.2.1.min.js"></script>
	<script src="assets/js/popper.min.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/js/jquery.slimscroll.js"></script>
    <script src="assets/js/Chart.bundle.js"></script>
    <script src="assets/js/chart.js"></script>
    <script src="assets/js/app.js"></script>
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
        department:editProfile["department"].value,
    

    })
    document.querySelector('.alert').style.display = 'block';

    // Show alert
document.querySelector('.alert').style.display = 'block';

// Hide alert after 3 seconds
setTimeout(function(){
  document.querySelector('.alert').style.display = 'none';
},3000);
  
}






var bucket = 'users';

// get elements
var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('file1');



// listen for file selection
fileButton.addEventListener('change', function uploadImage(e) {

     // what happened
     console.log('file upload event', e);

     // get file
     var file = e.target.files[0];

     // create a storage ref
     const uid = firebase.auth().currentUser.uid
     const storageRef = firebase.storage().ref().child(`${bucket}/${uid}/profile`)
     // upload file
     var uploadTask = storageRef.put(file);


     // update progress bar
     uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          function (snapshot) {
               // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
               var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
               if(progress=='100')     
               // Show alert
               document.querySelector('.success').innerHTML=`<i class="fa fa-check-circle" aria-hidden="true"></i> Updated Successfully`;
              
              // Hide alert after 10 seconds
setTimeout(function(){
    document.querySelector('.success').innerHTML=``;
  },10000);
               
               uploader.value = progress;
              
               console.log('Upload is ' + progress + '% done');
               document.querySelector('.prog').innerHTML=`${progress}%`;
            
               switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                         console.log('Upload is paused');
                      
                         break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                         console.log('Upload is running');
                         
                         break;
               }
          }, function (error) {

               // A full list of error codes is available at
               // https://firebase.google.com/docs/storage/web/handle-errors
               switch (error.code) {
                    case 'storage/unauthorized':
                         // User doesn't have permission to access the object
                         break;

                    case 'storage/canceled':
                         // User canceled the upload
                         break;

                    case 'storage/unknown':
                         // Unknown error occurred, inspect error.serverResponse
                         break;
               }
          }, 

          function () {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                document.querySelector('#proimg').src = downloadURL
                firebase.auth().currentUser.updateProfile({
                  photoURL: downloadURL
                })
              });
          });

});






