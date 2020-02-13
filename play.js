
var array = [0,1,2,3,4,5,6];
var i = 0,
    l = array.length;

while( true ) // keep looping
{
    if(i >= l) i = 0;

    // the loop block

    var previous=array[i==0?array.length-1:i-1];
var current=array[i];
var next=array[i==array.length-1?0:i+1];

var l = array.length;

var previuos,
    current,
    next;


    l = array.length;
array[-1] = array[l-1]; // this is legal
array[l] = array[0];

for(i = 0; i < l; i++)
{
    previous = array[i-1];
    current = array[i];
    next = array[i+1];
    console.log(previous);
    console.log(current);
    console.log(next)
}

// restore the array

array.pop(); 
array[-1] = null;

    // if(/* something to cause the loop to end */) break; // <-- this let execution exit the loop immediately

    i+=1;
}


