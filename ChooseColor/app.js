// Select from doc 'html' all - div or (columns)
const cols = document.querySelectorAll('.col');

// Add control page with func. keydown - 'space'
document.addEventListener('keydown', (event) => {
  event.preventDefault()
  if (event.code.toLowerCase() === 'space') {
    setRandomColors()
  }
});

// Get all clickEvent from allpage and get click 'lock'
document.addEventListener('click', (event) => {
  const type = event.target.dataset.type

  if (type === 'lock') {
    const node = event.target.tagName.toLowerCase() === 'i' ? event.target : event.target.children[0]
    
    node.classList.toggle('fa-lock-open')
    node.classList.toggle('fa-lock')
  } else if (type === 'copy') {
    copyToClick(event.target.textContent);
  }
});

// This func. was instead for func. 'chroma'
// function gerenerateRandomColor() {
//    // RGB
//    // #FF0000 (red)
//    // #00FF00 (green)
//    // #0000FF (blue)

//    const hexCodes = '0123456789ABCDEF'
//    let color = ''
//    for(let i = 0; i < 6; i++) {
//       color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
//    }
//    return '#' + color
// }
 
// Create func. for copy and save text from name color
function copyToClick(text) {
 return navigator.clipboard.writeText(text)
};

// Created func. callback in func. 'setRandomColors' for like change color shade in icon and text
function setRandomColors(isInitial) {
  const colors = isInitial ? getColors_Hash () : [];

   cols.forEach((col, index) => {
      const isLocked = col.querySelector('i').classList.contains('fa-lock')
      const texth2 = col.querySelector('h2')
      const button = col.querySelector('button')

      if (isLocked) {
        colors.push(texth2.textContent)
        return
      }

      const color = isInitial 
        ? colors[index]
          ? colors[index]
          : chroma.random()
        : chroma.random();

      if (!isInitial) {
        colors.push(color)
      };

      texth2.textContent = color
      col.style.background = color

      setTextColor(texth2, color);
      setTextColor(button, color);
   })

   updateColorsHash(colors);
};

// Create func. 'chroma' to change the hue depending on the background color
function setTextColor(texth2, color) {
  const luminance = chroma(color).luminance()
  texth2.style.color = luminance > 0.5 ? 'black' : 'white'
};

// Save all need color in hash for share
function updateColorsHash(colors = []) {
  document.location.hash = colors.map((col) => {
    return col.toString().substring(1)
  })
  .join('-')
};

// Create a func. with set colors and save in hash
function getColors_Hash() {
  if (document.location.hash.length > 1) {
    return document.location.hash.substring(1).split('-').map((color) => '#' + color)
  }
  return []
};

// Call func.
setRandomColors(true);