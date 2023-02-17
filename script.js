var row = null
var count = 0
//Taking buttons on the webpage
var temp=  document.querySelector(".total-cont")
var pasc = document.querySelector(".pasc")
var pdesc = document.querySelector(".pdesc")
var idasc = document.querySelector(".idasc")
var iddesc = document.querySelector(".iddesc")
var nameasc = document.querySelector(".nameasc")
var namedesc = document.querySelector(".namedesc")


var i = 0
//click on the submit 
function Submit(){
    var data = retrieveformdata()
    var valid = validationcheck(data)
    if(valid){
        //Storing and reading in the localstorage
        var readdata = readlocalstorage(data)
        var images = document.getElementById("pimage").value;
            localStorage.setItem(`productimage${count}`,images)
            console.log(images)
        var imagedata = localStorage.getItem(`productimage${count}`)
        if(row==null){
            //Inserting the data into the table and product in the webpage
            let newcont = document.createElement("div")//creating new container
            newcont.setAttribute("class","container")
            let val = Math.floor(Math.random()*1000)
            newcont.setAttribute("id",`cont${val}`)//Generate unique id
            insertdata(readdata,`cont${val}`)//inserting data in the table
            console.log(readdata)
            let addcon = document.querySelector(".total-cont .items")//items is paent conatiner
            addcon.appendChild(newcont)//inserting in the container to the parent container
            let datapush = document.querySelector(`#cont${val}`)//selecting id of container
            console.log(datapush)
            //Adding the product to the webpage
            datapush.innerHTML=`
            <img class="pics" src=`+imagedata+` width="100%" height="60%">
            <span class="Name" style="margin-top:5px;">${readdata[0]}</span><br>
            <span class="Id">${readdata[1]}</span><br>
            <span class="Price">${readdata[2]}</span><br>
            <span class="Description" style = "font-family:'Fjalla One', sans-serif;">${readdata[4]}</span>`

         }
        else{
            //Updating the product in the webpage
            const [contents,tempo] = update()//we get edited data and id of desired container
            console.log("contents",contents,"productid",contents[1])
            console.log(document.querySelector('.total-cont'))
            console.log("firstcontent",contents.cells[1].textContent)
            let dataid = document.querySelectorAll('.total-cont div')//selecting all child containers
            console.log("dataid",dataid)
            dataid.forEach((ele)=>{
                if(ele.id == tempo){//if the id gets match  then doing the changes
                    ele.innerHTML=`
                    <img class="pics" src=`+imagedata+` width="100%" height="60%">
                    <span class="Name" style="margin-top:5px;">${contents.cells[0].textContent}</span><br>
                    <span class="Id">${readdata[1]}</span><br>
                    <span class="Price">${contents.cells[2].textContent}</span><br>
                    <span class="Description" style = "font-family:'Fjalla One', sans-serif;">${contents.cells[4].textContent}</span>`
                }
            })
            row = null
        }
    }

}

function retrieveformdata(){
    //retrieving the data from the form
    const name = document.getElementById("pname").value
    const id = document.getElementById("pid").value
    const price= document.getElementById("pprice").value
    const image = document.getElementById("pimage").value
    const description = document.getElementById("pdescription").value
    var arr = [name,id,price,image,description]
    return arr   

}

function validationcheck(data){
    //checking the data is valid or not
    if(data[0]!=="" && data[1]!=="" && data[2]!=="" && data[3]!=="" && /^[a-zA-Z]+$/i.test(data[0])){
       return true
    }
    else{
        if(data[0]=="" || !(/^[a-zA-Z]+$/i.test(data[0]))){
            alert('Invalid data!! Enter Product name properly')
        }
        if(data[1]==""){
            alert('Invalid data!! Enter Product Id properly')
        }
        if(data[2]==""){
            alert('Invalid data!! Enter Product Price properly')
        }
        if(data[3]==""){
            alert('Image not added properly!!')
        }
        return false
        
    }
  

}


function readlocalstorage(data){
    //storing and reading the data from the localstorage
    count+=1
    localStorage.setItem(`Name${count}`,data[0]);
    localStorage.setItem(`Id${count}`,data[1]);
    localStorage.setItem(`Price${count}`,data[2]);
    localStorage.setItem(`Description${count}`,data[4]);

    var name  = localStorage.getItem(`Name${count}`)
    var id  = localStorage.getItem(`Id${count}`)
    var price  = localStorage.getItem(`Price${count}`)
    var description  = localStorage.getItem(`Description${count}`)
    var img = data[3]
    var cont = [name,id,price,img,description]
    return cont
}

function insertdata(contents,productid){
    //inserting the data into the table
    console.log("entered the insert data contents")
    let table = document.querySelector('#table')
    row = table.insertRow()
    row.setAttribute("class",productid)
    console.log(row)
    row.insertCell(0).innerHTML = contents[0]
    row.insertCell(1).innerHTML = contents[1]
    row.insertCell(2).innerHTML = contents[2]
    row.insertCell(3).innerHTML = contents[3]
    row.insertCell(4).innerHTML = contents[4]
    i+=1
    //when you  click on edit or delete button
    row.insertCell(5).innerHTML = `<button onclick=edit(this)  class="edit">Edit</button>
                                    <button onclick = remove(this) class="delete">Delete</button>`
    row = null

}
  
function Reset(){
    //clearing the local storage
    localStorage.clear()
    
}

function edit(td){
    //Changing the data in the form
   row = td.parentElement.parentElement
   document.getElementById("pname").value = row.cells[0].innerHTML
   document.getElementById("pid").value = row.cells[1].innerHTML
   document.getElementById("pprice").value = row.cells[2].innerHTML
   document.getElementById("pimage").value = row.cells[3].innerHTML
   document.getElementById("pdescription").value = row.cells[4].innerHTML
}

function update(){

   //Updating the data 
    var change = row.className
    //id of the conatiner and row is same respectively
    row.cells[0].innerHTML =  document.getElementById("pname").value
    row.cells[1].innerHTML =  document.getElementById("pid").value
    row.cells[2].innerHTML =  document.getElementById("pprice").value 
    row.cells[3].innerHTML =  document.getElementById("pimage").value
    row.cells[4].innerHTML =  document.getElementById("pdescription").value 
    return [row,change]
}

function remove(td){
  //Deleting the data from table and product from webpage
  row = td.parentElement.parentElement;
  var change = row.className
  document.getElementById("table").deleteRow(row.rowIndex);
  let dataid = document.querySelectorAll('.total-cont div')
    console.log(dataid)
    dataid.forEach((ele)=>{
        if(ele.id == change){
            ele.remove()
        }
    })

}

var items = document.querySelector(".items ")
var final_index_values = []
var count = 0


function display(){
    var temp=  document.querySelector(".total-cont")
    temp.style.display = "flex";
}

//searchbar 
var ans = document.querySelector(".searchbarMain")
ans.addEventListener("keydown",(event)=>{
    console.log(ans.value)
    console.log("children items",items.children)
    for(let a=0;a<i;a++){//Iterating through the child containers or products

        if(!(items.children[a].children[1].textContent).includes(ans.value)){//doesn't match with name
            items.children[a].style.display = "none";
        }
        else{//if it matches display it 
            console.log(items.children[a].children[1].textContent)
            items.children[a].style.display = "inline-block"
        }
       
    }

})


//Name by ascending order
nameasc.addEventListener('click',()=>{
 
    var arrayitems = []
    for(let a=0;a<i;a++){
        arrayitems.push(items.children[a].children[1].textContent)
    }  
    arrayitems.sort()
   sorting(arrayitems,1)
   
})

//Name by descending order
namedesc.addEventListener('click',()=>{
 
    var arrayitems = []
    for(let a=0;a<i;a++){
        arrayitems.push(items.children[a].children[1].textContent)
    }  
    arrayitems.sort().reverse()
   sorting(arrayitems,1)
   
})

//Id by ascending order
idasc.addEventListener('click',()=>{

    var arrayitems1 = []

    for(let a=0;a<i;a++){
        arrayitems1.push(+items.children[a].children[3].textContent)
    }  
    console.log("beforesort:",arrayitems1)
    arrayitems1.sort((a,b)=>a-b)
    console.log("arrayitemsidasc:",arrayitems1)
   sorting(arrayitems1,3)
   
})

//Id by descending order
iddesc.addEventListener('click',()=>{
 
    var arrayitems = []
    for(let a=0;a<i;a++){
        arrayitems.push(+items.children[a].children[3].textContent)
    }  
    arrayitems.sort((a,b)=>b-a)
    console.log("arrayitemsiddesc:",arrayitems)
   sorting(arrayitems,3)
   
})

//price by ascending order
pasc.addEventListener('click',()=>{

    var arrayitems = []

    for(let a=0;a<i;a++){
        arrayitems.push(+items.children[a].children[5].textContent)
    }  
    console.log("beforesort:",arrayitems)
    arrayitems.sort((a,b)=>a-b)
    console.log("arrayitemsidasc:",arrayitems)
    sorting(arrayitems,5)
   
})

//price by descending order
pdesc.addEventListener('click',()=>{
 
    var arrayitems = []
    for(let a=0;a<i;a++){
        arrayitems.push(+items.children[a].children[5].textContent)
    }  
    arrayitems.sort((a,b)=>b-a)
    console.log("arrayitemsiddesc:",arrayitems)
   sorting(arrayitems,5)
   
})

//sorting the products based on the parameters
function sorting(arrayitems,param){
    console.log("After",arrayitems)
    for(let x=0;x<arrayitems.length;x++){
        for(let a=0;a<i;a++){
            if(items.children[a].children[param].textContent == arrayitems[x]){
                console.log("container",items.children[a])
                items.insertBefore(items.children[a],items.children[x])
                break
            }
        }
    
    }
}


    
