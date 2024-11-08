window.onload = function () {
  // Function to show details when a button is clicked
  function showDetails(id) {
    // Hide all details sections
    document.querySelectorAll('.details').forEach((detail) => {
      detail.style.display = 'none';
    });

    // Show the selected section
    const selected = document.getElementById(id.toLowerCase().replace(' ', '-'));
    if (selected) {
      selected.style.display = 'block';
    }
  }
  
  // Toggle job card visibility based on ID
  function toggleJobVisibility(jobId, isVisible) {
    const jobElement = document.getElementById(`job-${jobId}`);
    if (jobElement) {
      jobElement.style.display = isVisible ? 'block' : 'none';
    }
  }

  // Add click event to all cards if they exist
  const cards = document.querySelectorAll('.card');
  console.log('Card elements:', cards); // Log the NodeList of .card elements

  if (cards.length > 0) {
    cards.forEach((card, index) => {
      console.log(`Adding click event to card ${index + 1}`);
      card.addEventListener('click', function () {
        console.log('Card clicked:', this);

        // Remove 'active' class from all cards
        document.querySelectorAll('.card').forEach((c) => c.classList.remove('active'));
        
        // Add 'active' class to the clicked card
        this.classList.add('active');
      });
    });
  } else {
    console.warn('No card elements found in the document.');
  }
};

// Function to call an emergency number
function callEmergency() {
  // The number you want to call (replace with a real number for actual use)
  window.location.href = "tel:112"; // Replace '112' with the desired emergency number


     // Trigger SMS using the 'sms' protocol
     const smsNumber = '+1234567890';  // Replace with emergency contact number
     const smsMessage = 'This is an emergency. Immediate assistance required!';
     window.location.href = `sms:${smsNumber}?body=${encodeURIComponent(smsMessage)}`;
}

// Trigger File Input for Profile Change
function changeProfilePicture() {
  document.getElementById("fileInput").click();
}

// Update Profile Picture on Selection
function updateProfilePicture(event) {
  const file = event.target.files[0];
  if (file) {
    const img = document.querySelector("#profilePicture img");
    img.src = URL.createObjectURL(file); // Update image preview
    // You can add logic to upload the image here
  }
}
function updateProfilePicture(event) {
  const file = event.target.files[0];
  const imgElement = document.querySelector('#profilePicture img');
  if (file) {
      imgElement.src = URL.createObjectURL(file);  // Updates with the new image file
  }
}

function changeProfilePicture() {
  document.getElementById("fileInput").click();  // Triggers file input for image upload
}

function resetToDefaultPicture() {
  const imgElement = document.querySelector('#profilePicture img');
  imgElement.src = "images/default-profile.png";  // Resets to the default image
}
