window.addEventListener('load', updateResults);
document.getElementById('regex-input').addEventListener('input', updateResults);
document.getElementById('test-string').addEventListener('input', updateResults);

function updateResults() {
  const regexInput = document.getElementById('regex-input').value.trim();
  const testString = document.getElementById('test-string').value;

  document.getElementById('results').innerHTML = '';

  if (!regexInput && !testString) {
    createResultBox(' ', false);
    return;
  }
  else if (!regexInput) {
    createResultBox('No pattern entered.', false);
    return;
  }

  try {
    const regex = new RegExp(regexInput, 'g');
    let matches = [];
    let match;

    while ((match = regex.exec(testString)) !== null) {
      matches.push(match[0]);
    }

    if (matches.length > 0) {
      matches.forEach((matchText) => {
        createResultBox(matchText, true);
      });
    } 
    else {
      createResultBox('No matches found.', false);
    }
  }
  catch (e) {
    createResultBox(e.message, false);
  }
}

const colors = [
  `hsl(351, 74%, 73%)`,
  `hsl(21, 86%, 73%)`,
  `hsl(40, 70%, 78%)`,
  `hsl(105, 48%, 72%)`,
  `hsl(189, 59%, 73%)`,
  `hsl(220, 83%, 75%)`,
  `hsl(267, 83%, 80%)`,
]

let currentIndex = 0;

function createResultBox(text, hasBackground) {
  const span = document.createElement('span');
  
  span.style.padding = '5px';
  span.style.marginRight = '10px';
  span.style.display = 'inline-block';
  span.style.borderRadius = '4px';
  
  span.style.fontSize = '14px';
  span.style.color = `hsl(227, 68%, 88%)`;
  span.textContent = text;

  if (hasBackground) {
    span.style.marginBottom = '5px';
    span.style.marginTop = '5px';
    span.style.backgroundColor = colors[currentIndex];
    span.style.color = `hsl(236, 23%, 12%)`;
  }

  currentIndex = (currentIndex + 1) % colors.length;
  document.getElementById('results').appendChild(span);
}
