var update = false
function Submit(){
    var data = retrieveformdata()
    let valid = validationcheck(data)
        console.log(data)
        if(valid){
            if(update==true){
                const itemsdata = JSON.parse(localStorage.getItem("product"))
                for (let i = 0; i < itemsdata.length; i++) {
                    if (itemsdata[i].id == contdata.children[3].innerHTML) {
                            const product = {
                                name:data[0],
                                id:data[1],
                                price:data[2],
                                image:data[3],
                                description:data[4]
                                
                             } 
                        itemsdata[i] = product
                        localStorage.setItem("product", JSON.stringify(itemsdata))
                        location.reload();
                    }
                }
                update=false
            }
            else if(update == false){
                createitems(data)
            }
          
        }
     


}

function createitems(data){
   const product = {
      name:data[0],
      id:data[1],
      price:data[2],
      image:data[3],
      description:data[4]
      
   } 
   var initial = "",final = "",close=']'
   var strdata = localStorage.getItem("product")
   console.log(strdata)
   if (strdata == null) {
       strdata = ""
       initial = "["
   }
   else {
       initial = ""
       final = ","
   }
   var str = strdata.substring(0, strdata.length - 1)
   console.log(str)
   localStorage.setItem("product", initial + str + final + JSON.stringify(product) + close)
   this.location.reload();
}

function retrieveformdata(){
    const name = document.getElementById("pname").value
    const id = document.getElementById("pid").value
    const price= document.getElementById("pprice").value
    const image = document.getElementById("pimage").value
    const description = document.getElementById("pdescription").value
    var arr = [name,id,price,image,description]
    return arr   

}

function validationcheck(data){
    if(data[0]!=="" && data[1]!=="" && data[2]!==""){
       return true
    }
    else{
        if(data[0]==""){
            alert('Invalid data!! Enter Product name properly')
        }
        if(data[1]=="" || data[1].includes('e')){
            alert('Invalid data!! Enter Product Id properly')
        }
        if(data[2]=="" || data[1].includes('e')){
            alert('Invalid data!! Enter Product Price properly')
        }
        if(data[3]==""){
            alert('Please upload image properly!!')
        }
        return false
        
    }

}

function Reset(){
    localStorage.clear()
    this.location.reload()
}

const itemsdata = JSON.parse(localStorage.getItem("product"))
console.log(itemsdata)
for (let i = 0; i < itemsdata.length; i++) {
     //Inserting the data into the table and product in the webpage
     let newcont = document.createElement("div")//creating new container
     newcont.setAttribute("class","container")
     let val = Math.floor(Math.random()*1000)
     newcont.setAttribute("id",`cont${val}`)//Generate unique id
     console.log(itemsdata[i])
     let addcon = document.querySelector(".total-cont .items")//items is paent conatiner
     addcon.appendChild(newcont)//inserting in the container to the parent container
     let datapush = document.querySelector(`#cont${val}`)//selecting id of container
     console.log(datapush)
     datapush.innerHTML=`
     <img class="pics" src=`+itemsdata[i].image+` width="100%" height="60%">
     <span class="Name" style="margin-top:5px;">${itemsdata[i].name}</span><br>
     <span class="Id">${itemsdata[i].id}</span><br>
     <span class="Price">₹${itemsdata[i].price}</span><br>
     <span class="Description" style = "font-family:'Fjalla One', sans-serif;">${itemsdata[i].description}</span><br>
     <button onclick=edit(this)  class="edit">Update</button><br>
     <button onclick = remove(this) class="delete">Delete</button>`
}

function edit(data){
    contdata = data.parentElement
    document.getElementById("pname").value = contdata.children[1].innerHTML
    document.getElementById("pid").value = contdata.children[3].innerHTML
    document.getElementById("pprice").value = contdata.children[5].innerHTML
    document.getElementById("pimage").value = contdata.children[0].src
    document.getElementById("pdescription").value = contdata.children[7].innerHTML
    console.log(contdata.children[1].innerHTML)
    update = true
   
    
}

function remove(data){
    contdata = data.parentElement
    const itemsdata = JSON.parse(localStorage.getItem("product"))
            for (let i = 0; i < itemsdata.length; i++) {
                if (itemsdata[i].id == contdata.children[3].innerHTML) {
                    itemsdata.splice(i,1)
                    location.reload();
                    if (itemsdata.length == 0)
                         localStorage.clear()
                    else
                        localStorage.setItem("product", JSON.stringify(itemsdata))
                }
            }
}
