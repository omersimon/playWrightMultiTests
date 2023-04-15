import fetch from "node-fetch";
const user = {
    name: 'John Doe',
    job: 'Software Engineer'
};

// send POST request to create user
fetch('https://reqres.in/api/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
