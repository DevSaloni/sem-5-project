// JavaScript to control the modal behavior
function openModal() {
  document.getElementById("applyModal").style.display = "block";
}

function closeModal() {
  document.getElementById("applyModal").style.display = "none";
}

// Close the modal when clicking outside of it
window.onclick = function (event) {
  const modal = document.getElementById("applyModal");
  if (event.target == modal) {
    closeModal();
  }
};

async function submitForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formDataObject = {};

  // Convert FormData to object
  for (let pair of formData.entries()) {
    formDataObject[pair[0]] = pair[1];
  }

  console.log(formDataObject);

  try {
    const response = await fetch("/apply-job", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObject),
    });

    if (!response.ok) {
      throw new Error("Form submission failed");
    }

    alert("Application submitted successfully!");
    event.target.reset();
  } catch (error) {
    alert("Error submitting application: " + error.message);
  }
}
