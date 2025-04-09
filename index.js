const express = require('express');
const users = require('./MOCK_DATA.json');
const app = express();
const port = 8000;
const fs=require('fs');

app.use(express.urlencoded({extended: false}))//middleware made to parse the body of the reques if sent in the form of x-www-form-urlencoded
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

// app.get('/api/users/:id',(req,res) => {
//    const id= Number(req.params.id);
//    const user = users.find(user => user.id === id);
//    return res.json(user);
// })
app.post('/api/users',(req,res) => {
    //Todo add the user to the database
    const body=req.body;
    users.push({...body,id:users.length+1});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data) => {
    return res.json({status: 'success',id:users.length})
})})
// app.patch('/api/users/:id',(req,res) => {
//     //Todo update the user in the database
//     res.json({status: 'pending'})
// })
// app.delete('/api/users/:id',(req,res) => {
//     //Todo delete the user from the database
//     res.json({status: 'pending'})
// })

//We can write it like above but as we can see that the endpoint for getting user data by id,put and delete have the same endpoint it is better to write it in the below form
app.route('/api/users/:id').get((req,res) => {
    const id= Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);
}).patch((req,res) => {
    const body=req.body;
    const id= Number(req.params.id);
    const user = users.find(user => user.id === id);
    user.first_name=body.first_name;
    user.last_name=body.last_name;
    user.email=body.email;
    user.gender=body.gender;
    user.job_title=body.job_title;
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data) => {
        return res.json({status: 'success'})
    })

}).delete((req,res) => {
    const id= Number(req.params.id);
    const newUsers=users.filter(user => user.id !== id);
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(newUsers),(err,data) => {
        return res.json({status: 'success'})
    })
})

app.listen(port,() => console.log( `Server is running on port ${port}`))
