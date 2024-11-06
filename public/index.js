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
  document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');
    console.log('Card elements:', cards); // This will log the NodeList of .card elements

    if (cards.length > 0) {
        cards.forEach((card, index) => {
            console.log(`Adding click event to card ${index + 1}`);
            card.addEventListener('click', function () {
                console.log('Card clicked:', this);

                document.querySelectorAll('.card').forEach((c) => c.classList.remove('active'));
                this.classList.add('active');
            });
        });
    } else {
        console.warn('No card elements found in the document.');
    }
  });
}
