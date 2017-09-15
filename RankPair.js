//List object
var list;
var five = 5;



//vars for keeping track of current pairs
var listItem0=0;
var listItem1=0;

//Used to keep track of the submit button
var btnHit=false;

function rankList(name) {
  this.name = name;
  this.items = new Array();
  //Outputs the list to display
  this.print = function() {
        document.getElementById("output").innerHTML = "";
		this.items.forEach(function(element){
		document.getElementById("output").innerHTML += element.print();
	  
	  });	
  }
}

// items to be ranked
function item(name) {
	//declaring variables
    this.name = name;
	this.score = 0;
	this.ranks = 0;
	this.lastRanked = 0;
	this.cv = 0;
	
	///Display list
	this.print = function() {
       return ("<tr>"+
	   "<td>"+this.name+"</td>"+
       "<td>"+this.score+"</td>"+
	   "<td>"+this.ranks+"</td>"+
	   "<td>"+this.lastRanked+"</td>"+
	   "<td>"+this.cv+"</td>"+
	   "</tr>");
    }
	
} 


//send you to the submit or add list after hitting the submit button

function handleSubmitBtn()
{

var input = document.getElementById("list").value;
var pairs = input.split("\n");
if(pairs.length>1 || btnHit)
{
	if(!btnHit)
	{
		list=submit();
		rank();
		btnHit=true;
	}
	else
	{
		//alert("this");
		addToList();
		rank();
	}

}

	else
	{
		alert("YOU CAN'T ENTER LESS THAN TWO ITEMS WWHAT THE FUCK DO YOU THINK YOU'RE DEOING YOU FICUKING PIECE OF SHAT!");
	}

}


//Adds to the current list

function addToList()
{
	
	var input = document.getElementById("list").value;
  var pairs = input.split("\n");
  var firstList = new rankList();
  // Put individual pairs into object array
  pairs.forEach(function(element,index){
	//firstList.items[index] = new item(element);
	list.items[list.items.length+index]=new item(element );
  });
  
  
  //Display the list
  //firstList.print();
  // Stores array into local storage
  var myJSON;
  myJSON = JSON.stringify(list.items);
  localStorage.setItem("testJSON", myJSON);


	
}

// Submit List to array and puts it into local storage
function submit(){
  var input = document.getElementById("list").value;
  var pairs = input.split("\n");
  var firstList = new rankList();
  // Put individual pairs into object array
  pairs.forEach(function(element,index){
	firstList.items[index] = new item(element);
  });
  
  //Display the list
  firstList.print();
  // Stores array into local storage
  var myJSON;
  myJSON = JSON.stringify(firstList.items);
  localStorage.setItem("testJSON", myJSON);

  //Returns the list
  return firstList;
}

function save(){
	var myJSON;
	myJSON = JSON.stringify(list.items);
	localStorage.setItem("testJSON", myJSON);
}

// Loads the array from local storage
function pullArray(){
	btnHit=true;
	
	var testJSON;
	test = localStorage.getItem("testJSON");
	text = JSON.parse(test);
	//alert(text[1].name);
	var firstList = new rankList();
	//Get individual objects and store them into the array
	text.forEach(function(element,index){
		firstList.items[index] = new item(text[index].name);
		firstList.items[index].score = text[index].score;
		firstList.items[index].ranks = text[index].ranks;
		firstList.items[index].lastRanked = text[index].lastRanked;
	});
	
	firstList.print();
	//returns the list
	return firstList;
}


function SelectFirst()
{
	var time = new Date().getTime();
	var date = new Date(time);
	
	list.items[listItem0].score=list.items[listItem1].score+1;
	list.items[listItem1].lastRanked=date.toString();
	list.items[listItem0].lastRanked=date.toString();
	
	list.items[listItem0].ranks += 1;
	list.items[listItem1].ranks += 1;
	
	rank();
	save();
}

function SelectSecond()
{
	var time = new Date().getTime();
	var date = new Date(time);
	
	list.items[listItem1].score=list.items[listItem0].score+1;
	list.items[listItem1].lastRanked=date.toString();
	list.items[listItem0].lastRanked=date.toString();
	
	list.items[listItem0].ranks += 1;
	list.items[listItem1].ranks += 1;
	
	rank();
	save();
}

function rank(){
//added
list.items.sort(function (a, b) {
  return b.score - a.score;
});
	
//

	first = Math.floor(Math.random() * list.items.length);
	second = Math.floor(Math.random() * list.items.length);
	
	do {second = Math.floor(Math.random() * list.items.length);
	} while(first == second)
	document.getElementById("first").innerHTML = list.items[first].name;
	document.getElementById("second").innerHTML =  list.items[second].name;
	//document.getElementById("lblFirst").innerHTML = list.items[first].name;
//	document.getElementById("lblSecond").innerHTML= list.items[second].name;
		
	listItem0=first;
	listItem1=second;
		
	list.print();
		

	
}