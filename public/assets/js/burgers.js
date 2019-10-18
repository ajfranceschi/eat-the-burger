$(".devourButtons").on("click", event => {
  // get the id of the burger being devoured.
  const id = event.target.attributes[1].value;

  // change the devoured value in the database
  fetch("/api/updateOne", {
    method: "put",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id,
      devoured: true
    })
  }).then(response => {
    if (response.ok) {
      location.reload();
    }
  });
});

$("#submitBtn").on("click", async () => {
  const burgerName =$('#burgerTxtField').val().trim();

  if (burgerName === '' || !burgerName) {
    return alert('Please enter a burger before submitting.');
  }

  const response = fetch('/api/insertOne', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      burgerName
    })
  });

  const data = await response;

  if (data.ok) {
    location.reload();
  } else {
    alert('Could not insert item, please try again');
  }
});

$('#clearDatabase').on('click', async () => {
  const response = await fetch('/api/deleteAll', {
    method: 'delete'
  });
  const result = await response;
  if (result.ok) {
    location.reload();
  } else {
    alert("Couldn't clear database. Please try again later")
  }

});