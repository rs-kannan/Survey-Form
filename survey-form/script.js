
const formData={
    firstName:'',
    lastName:'',
    address:'',
    pincode:'',
    gender:'',
    foodType:[],
    selectState:'',
    selectCountry:'',
};

reloadTable(JSON.parse(localStorage.getItem('data')))

function SaveInStorage(value={}){
 try{
   const data= JSON.parse(localStorage.getItem('data'))?JSON.parse(localStorage.getItem('data')):[];
   data.push(value);
   localStorage.setItem("data",JSON.stringify(data))

 } catch(error){
    console.log(error)
 }
 window.location.reload();
}


function handleInput(element){
   console.log(element.id,element.name,element.type)
if(element.type ==="radio"){
   formData[element.name]=element.id;
} else if(element.type ==="checkbox"){
   if(formData[element.name].includes(element.id)){
       formData[element.name]= formData[element.name].filter((d)=>d !== element.id)
   }
   else{
     formData[element.name].push(element.id);
   }
}else{
   formData[element.id]=element.value;
}
}

function handleSave(){
   
   if(formData.foodType.length>=2){
       SaveInStorage(formData);
      reloadTable(JSON.parse(localStorage.getItem('data')));
   }else{
       throw new Error('select alteast 2')
   }
}

function reloadTable(data=[]){
  const tableBody=document.querySelector('tbody');
  tableBody.append(...renderRows(data))
}

function renderRows(data=[]){
 const rows=[];
  if(data.length>0){
    data.forEach((e)=>{
       const rowElemet=document.createElement('tr')
       rowElemet.append(...renderCoulms(e));
       rows.push(rowElemet)
    })
  }
  return rows;
}

function renderCoulms(data={}){
    let tds=[];
    if(Object.values(data).length>0){
     Object.values(data).forEach((d)=>{
       const td=document.createElement('td');
       td.innerText=d;
       tds.push(td);
     });
    }
  return tds;
}