function f1(){
    var a=document.getElementById('blood').value;
    var b=document.getElementById('location').value;
    var c=document.getElementById('pn').value;
    var d=document.getElementById('pno').value;
    var e=document.getElementById('email').value;
    var f=document.getElementById('hname').value;
    var g=document.getElementById('blood').value;
    var h=document.getElementById('location').value;
    a.toString();
    b.toString();
    const emps={
        "Name":c,
        "blood":g,
        "Phonenumber":d,
        "Email":e,
        "Hospitalname":f,
        "Location":h

    }
    fetch("http://localhost:4000/addempp",{
        method:"POST",
        headers: {
            "content-type":"application/json"
        },
        body:JSON.stringify(emps)
    }); 
    fetch("http://localhost:4000/emps",{
      headers: {
        "content-type":"application/json"
      },
    }).then(response => {return response.json(); }).then(data => {
     console.log(data)
      
     window.location.href="new.html";
     var table;
     
    table='<table border="2" style="width:100% "><tr><td>Name</td><td>Email</td><td>blood group</td><td>location</td><td>Number</td><td>Age</td></tr>'
    for(var i=0;i<data.length;i++)
    {
      if(data[i].bloodgroup == a && data[i].location == b){
      if(data[i].private == "no"){
      table+=`<tr>
        <td>${data[i].Name}</td>
        <td>${data[i].Email}</td>
        <td>${data[i].bloodgroup}</td>
        <td>${data[i].location}</td>
        <td>${data[i].Number}</td>
        <td>${data[i].Age}</td>
        </tr>` 
      }
      var mail=data[i].Email;
      console.log(mail);

        fetch("http://localhost:4000/sendmail",{
        method:"POST",
        headers: {
            "content-type":"application/json"
        },
        body:JSON.stringify(mail)})
        
       
      
    }
    }  
    table =table+"</table>";
      const r=`<h1 align="center">Donor's List</h1>`;
      
      document.write(r);
      document.write(table);
  })
     
}
