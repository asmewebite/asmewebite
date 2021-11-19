
      //Registrations Caddict

      // Reference messages collection
      var dataRef = firebase.database().ref('EVDW');

      // Listen for form submit
      document.getElementById('reg').addEventListener('submit', submitForm);
      
      // Submit form
      function submitForm(e){
        e.preventDefault();
      
        // Get values
      

        var name = getInputVal('Name');
        var regno = getInputVal('Regno');
        var email = getInputVal('Email');
        var whatsapp = getInputVal('Whatsapp');
        var contact = getInputVal('Contact');
  
      
      
      // Save message
      saveData(name, regno, email, whatsapp, contact);
      
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
      function saveData(name, regno, email, whatsapp, contact){
        var newDataRef = dataRef.push();
        newDataRef.set({
      
          name:name,
          regno:regno,
          email:email,
          whatsapp:whatsapp,
          contact:contact
        
         
         
        });
      }
      
      