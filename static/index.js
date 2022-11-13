document.getElementById("add-user-form").addEventListener('submit',(e)=>{
    e.preventDefault();
    const name = document.querySelector("#name").value ;
    const age = document.querySelector("#age").value ;

createUser(name,age);
})
 async function createUser(name,age){
    const data=await fetch('http://localhost:3000/api/users',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({name,age}),
    });
    console.log(data.status);
}