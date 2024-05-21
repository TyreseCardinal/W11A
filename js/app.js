const options = {
  samsungPhone: {
    name: "Samsung Phone",
    description: "A high-end smartphone with cutting-edge features.",
    image_url: "/images/020-galaxy-s23-fe-graphite-front2-removebg-preview.png"
  },
  samsungWatch: {
    name: "Samsung Watch",
    description: "A stylish smartwatch with numerous health-tracking features.",
    image_url: "/images/003-galaxy-watch6-graphite-40mm-r-perspective-removebg-preview.png"
  },
  samsungEarbuds: {
    name: "Samsung Earbuds",
    description: "Wireless earbuds with superior sound quality and noise cancellation.",
    image_url: "/images/006-galaxy-buds-fe-graphite-case-top-combination-dynamic-removebg-preview.png"
  }
};

function selectOption(optionKey) {
  let selectedOptions = JSON.parse(Cookies.get('selection') || '[]');
  selectedOptions.push(options[optionKey]);
  Cookies.set('selection', JSON.stringify(selectedOptions), { expires: 7, sameSite: 'Lax' });
  document.getElementById('selected-option').textContent = `You selected: ${options[optionKey].name}`;
}

function deleteItem(index) {
  let selectedOptions = JSON.parse(Cookies.get('selection') || '[]');
  selectedOptions.splice(index, 1);
  Cookies.set('selection', JSON.stringify(selectedOptions), { expires: 7, sameSite: 'Lax' });
  displaySelections();
}

function displaySelections() {
  const container = document.getElementById('selection-container');
  container.innerHTML = "";
  const selectedOptions = JSON.parse(Cookies.get('selection') || '[]');

  if (selectedOptions.length === 0) {
    container.innerHTML = "<p>No selections made. Please go to the home page and make a selection.</p>";
    return;
  }

  selectedOptions.forEach((option, index) => {
    const item = document.createElement('div');
    item.classList.add('selection-item');
    item.innerHTML = `
          <h2>${option.name}</h2>
          <p>${option.description}</p>
          <img src="${option.image_url}" alt="${option.name}">
          <button onclick="deleteItem(${index})">Delete</button>
      `;
    container.appendChild(item);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('selection.html')) {
    displaySelections();
  }
});
