// index.js

// Name all the variables in the global scope so it can be used through all the functions, 
// and query select the elements to use in the functions
let ramenUrl = 'http://localhost:3000/ramens';
let ramenMenu = document.querySelector('#ramen-menu');
let ramenDetail = document.getElementById('ramen-detail');
let ramenImage = ramenDetail.querySelector('.detail-image');
let ramenName = ramenDetail.querySelector('.name');
let ramenRestaurant = ramenDetail.querySelector('.restaurant');
let ratingDisplay = document.getElementById('rating-display');
let commentDisplay = document.getElementById('comment-display');
// document.querySelector('#form-new-ramen').addSubmitListener('submit', addSubmitListener)

// Function that displayes all the ramen in the ramen menu 
// and has the call back function to handle the click event
function displayRamens() {
  fetch(ramenUrl)
    .then(response => response.json())
    .then(ramens => {
      ramens.forEach(ramen => {
        let img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        img.id = ramen.id;
        img.classList.add('ramen-image');
        img.addEventListener('click', () => handleClick(ramen));
        ramenMenu.appendChild(img);
     // newRamen.appendChild(newRamen);
      });
    });
}
// Function that tells the ramen menu what to display: image with the name, restaurant, rating and comment
function handleClick(ramen) {
  ramenImage.src = ramen.image;
  ramenImage.alt = ramen.name;
  ramenName.textContent = ramen.name;
  ramenRestaurant.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
}

// Create the event listener for submitting the form to the menu
// After the submission, create a new ramen and add it to the#ramen-menu div
function addSubmitListener() {
  let form = document.getElementById('new-ramen');
  
  
  form.addEventListener('submit', function (event) {  
    event.preventDefault();

// Pull the form from the document once value is entered by the client
    let newRamen = {
      name: document.getElementById('new-name').value,  
      restaurant: document.getElementById('new-restaurant').value,  
      image: document.getElementById('new-image').value,  
      rating: document.getElementById('new-rating').value,  
      comment: document.getElementById('new-comment').value,
    };

    console.log(newRamen);

    // clear the form after it's submitted
    event.target.reset();

    // Make POST request to add new ramen to the json data
    fetch(ramenUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newRamen),
    })
      .then(res => res.json())
      .then(createdRamen => {
        console.log('Created ramen:', createdRamen);

        // Fixed: Appending the newly created ramen to the DOM
        let img = document.createElement('img');
        img.src = createdRamen.image;
        img.alt = createdRamen.name;
        img.id = createdRamen.id;
        img.classList.add('ramen-image');
        img.addEventListener('click', () => handleClick(createdRamen));
        ramenMenu.appendChild(img); 
      });
  });
}

// Invoke displayRamens
// Invoke addSubmitListener 
// Invoke main
let main = () => {
  displayRamens();
  addSubmitListener();  
};

main();

export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
