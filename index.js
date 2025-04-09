const express = require('express');
const users = require('./MOCK_DATA.json');
const app = express();
const port = 8000;

app.get('/users',(req,res) => {//syntax to render html code
   const html= `
   <ul>
   ${users.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join('')}
   
   </ul>
   `
   res.send(html);
})
// app.get('/api/users',(req,res) => {//here we have added api as in /users route we can render the html page for website this makes our server hybrid
//     return res.json(users);
// })

app.get('/api/users/:id',(req,res) => {
   const id= Number(req.params.id);
   console.log(id);
   const user = users.find(user => user.id === id);
   return res.json(user);
})
app.post('/api/users',(req,res) => {
    //Todo add the user to the database
    return res.json({status: 'pending'})
})
// app.patch('/api/users/:id',(req,res) => {
//     //Todo update the user in the database
//     res.json({status: 'pending'})
// })
// app.delete('/api/users/:id',(req,res) => {
//     //Todo delete the user from the database
//     res.json({status: 'pending'})
// })

//We can write it like above but as we can see that the endpoint for getting user data by id,put and delete have the same endpoint it is better to write it in the below form
app.route('api/users/:id').get((req,res) => {
    const id= Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);
}).patch((req,res) => {
    return res.json({status: 'pending'})
}).delete((req,res) => {
    return res.json({status: 'pending'})
})

app.listen(port,() => console.log( `Server is running on port ${port}`))
