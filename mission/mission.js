let themeSelector = document.getElementById('theme');
let bodyElement = document.body; 
let logoImage = document.querySelector('.mission-logo'); 

function changeTheme() {
  const selectedTheme = themeSelector.value;

  if (selectedTheme === 'dark') {
    bodyElement.classList.add('dark');
 
  } else {
    bodyElement.classList.remove('dark');
    
  }
}

themeSelector.addEventListener('change', changeTheme);
