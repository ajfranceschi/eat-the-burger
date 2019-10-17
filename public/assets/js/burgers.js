const axios = require('')
$(".devourButtons").on('click', event => {
  // get the id of the burger being devoured.
  const id = event.target.attributes[1].value;

  // change the devoured value in the database


  // reload the page
});