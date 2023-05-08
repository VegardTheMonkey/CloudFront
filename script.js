

function uploadFile() {
    var form = document.getElementById('upload-form');
    var formData = new FormData(form);

    fetch('http://localhost:6438/upload', {
    method: 'POST',
    body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert('Upload successful');
    })
    .catch(error => {
        console.error(error);
        alert('Upload failed');
    });
}




const contactsList = document.getElementById('contacts-list');
let currentData = null;

// get called when button is pressed to fetch contacts data
function getContacts() {
    if (currentData === 'contacts') {
      // Clear the existing content in #contacts-list
      contactsList.innerHTML = '';
      currentData = null;
    } else {
      fetch('http://localhost:6438/contacts')
        .then(response => response.json())
        .then(data => {
          // Clear the existing content in #contacts-list
          contactsList.innerHTML = '';
          currentData = 'contacts';
  
          for (let contact of data) {
            const li = document.createElement('li');
            li.innerHTML = `_id: ${contact._id.$oid}<br>
                              name: ${contact.name}<br>
                              email: ${contact.email}<br>
                              phone: ${contact.phone}<br>
                              address: ${contact.address}<br>
                              company: ${contact.company}<br>
                              fullname: ${contact.fullname}`;
            contactsList.appendChild(li);
          }
        })
        .catch(error => {
          console.error('Error fetching contacts:', error);
        });
    }
  }
  

// get called when button is pressed to fetch vCard data
function getContactsVcard() {
  if (currentData === 'vcard') {
    // Clear the existing content in #contacts-list
    contactsList.innerHTML = '';
    currentData = null;
  } else {
    fetch('http://localhost:6438/contacts/vcard')
      .then(response => response.json())
      .then(data => {
        // Clear the existing content in #contacts-list
        contactsList.innerHTML = '';
        currentData = 'vcard';

        for (let contact of data) {
          const li = document.createElement('li');
          const vcardLines = contact.vcard.split('\n').map(line => `${line}<br>`).join('');
          li.innerHTML = `${vcardLines}<br>`;
          contactsList.appendChild(li);
        }
      })
      .catch(error => {
        console.error('Error fetching contacts vCard:', error);
      });
  }
}


$(document).ready(function() {
    // handle the form submission
    $('#email-form').submit(function(event) {
      // prevent the form from submitting normally
      event.preventDefault();
      
      // get the entered email
      var email = $('#email-input').val();
      
      // make a GET request to the API endpoint with the entered email
      $.get("http://localhost:6438/contacts/" + email, function(data) {
        // format the JSON data with line breaks and display the result in the #email-output div
        var contact = data;
        var p = document.createElement('p');
        p.innerHTML = `_id: ${contact._id.$oid}<br>
                          name: ${contact.name}<br>
                          email: ${contact.email}<br>
                          phone: ${contact.phone}<br>
                          address: ${contact.address}<br>
                          company: ${contact.company}<br>
                          fullname: ${contact.fullname}`;
        $('#email-output').html(p);
      })
      .fail(function() {
        // display an error message if the request fails
        $('#email-output').text('Contact with email ' + email + ' does not exist');
      });
    });
  });
  
 
