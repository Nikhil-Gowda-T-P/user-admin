// Function to retrieve token from URL query parameter
function getTokenFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const token=urlParams.get('token');
    console.log(token)
    return token
  }
  
  // Set token value to the hidden input field on page load
  document.getElementById('token').value = getTokenFromURL();
  