var temp=  document.querySelector(".total-cont")
var pasc = document.querySelector(".pasc")
var pdesc = document.querySelector(".pdesc")
var idasc = document.querySelector(".idasc")
var iddesc = document.querySelector(".iddesc")
var nameasc = document.querySelector(".nameasc")
var namedesc = document.querySelector(".namedesc")
var buttons = document.querySelector(".buttons")
var items = document.querySelector(".items ")
var final_index_values = []
var count = 0

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
     <span class="Description" style = "font-family:'Fjalla One', sans-serif;">${itemsdata[i].description}</span>`
}

//searchbar 
var ans = document.querySelector(".searchbarMain")
ans.addEventListener("keydown",(event)=>{
    console.log(ans.value)
    console.log("children items",items.children)
    for(let a=0;a<itemsdata.length;a++){//Iterating through the child containers or products

        if(!(items.children[a].children[1].textContent).includes(ans.value)){//doesn't match with name
            items.children[a].style.display = "none";
        }
        else{//if it matches display it 
            console.log(items.children[a].children[1].textContent)
            items.children[a].style.display = "inline-block"
        }
       
    }

})

function Show(){
    buttons.style.display = "flex"

}
//Name by ascending order
nameasc.addEventListener('click',()=>{
 
    var arrayitems = []
    for(let a=0;a<itemsdata.length;a++){
        arrayitems.push(items.children[a].children[1].textContent)
    }  
    arrayitems.sort()
   sorting(arrayitems,1)
   
})

//Name by descending order
namedesc.addEventListener('click',()=>{
 
    var arrayitems = []
    for(let a=0;a<itemsdata.length;a++){
        arrayitems.push(items.children[a].children[1].textContent)
    }  
    arrayitems.sort().reverse()
   sorting(arrayitems,1)
   
})

//Id by ascending order
idasc.addEventListener('click',()=>{

    var arrayitems1 = []

    for(let a=0;a<itemsdata.length;a++){
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
    for(let a=0;a<itemsdata.length;a++){
        arrayitems.push(+items.children[a].children[3].textContent)
    }  
    arrayitems.sort((a,b)=>b-a)
    console.log("arrayitemsiddesc:",arrayitems)
   sorting(arrayitems,3)
   
})

//price by ascending order
pasc.addEventListener('click',()=>{

    var arrayitems = []

    for(let a=0;a<itemsdata.length;a++){
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
    for(let a=0;a<itemsdata.length;a++){
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
        for(let a=0;a<itemsdata.length;a++){
            if(items.children[a].children[param].textContent == arrayitems[x]){
                console.log("container",items.children[a])
                items.insertBefore(items.children[a],items.children[x])
                break
            }
        }
    
    }
}


