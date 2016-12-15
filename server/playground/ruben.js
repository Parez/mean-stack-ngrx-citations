/**
 * Created by baunov on 16/11/16.


let strAr = ["a","b","c","d","e","f","g"];

//customForEach(array, item => console.log(item));

customForEach(array, item => {
    if(item % 2 == 0)
    {
        console.log(item);
    }
});

function arrayAction(item)
{
    if(item % 2 == 0)
    {
        console.log(item);
    }
    //console.log(item);
}



let filteredAr = customFilter(array, arrayCondition);

//console.log(filteredAr);


function arrayCondition(item)
{
    return (item > 3);
}

//condition == условие

function customFilter(array, condition) {
    let outAr = [];

    customForEach(array, (item) => {
        if(condition(item))
        {
            outAr.push(item);
        }
    });

    return outAr;
}

function customFilter(array, condition) {
    let outAr = [];

    customForEach(array, (item) => {
        if(condition(item))
        {
            outAr.push(item);
        }
    });

    return outAr;
}


//customMap()

function customForEach(array, callback) {
    for(let i = 0; i < array.length; i++)
    {
        callback(array[i]);
    }
}



function mutiEachBy2(array)
{
    let outAr = [];
    for(let i = 0; i<array.length; i++)
    {
        outAr.push(array[i]*2);
    }
    return outAr;
}

function mutiEachBy3(array)
{
    let outAr = [];
    for(let i = 0; i<array.length; i++)
    {
        outAr.push(array[i]*3);
    }
    return outAr;
}

function multiBy2(item) {
    return item*2;
}

function multiBy3(item) {
    return item*3;
}

function carzyShit(item) {
    return strAr[item];
}

function customMap(array, transformAction)
{
    let outAr = [];

    for(let i = 0; i < array.length; i++)
    {
        let transformed = transformAction(array[i]);
        outAr.push(transformed);
    }

    return outAr;
}


console.log(customSlice(array, -1, 7));

function customSlice(array, start=0, end=999999999)
{
    let outAr = [];

    let realEnd = Math.min(end, array.length);
    let realStart = Math.max(start, 0);

    for(let i = realStart; i < realEnd; i++)
    {
        outAr.push(array[i]);
    }

    return outAr;
}

let array = [1, 2, 3, 4, 5, 6];

console.log(customReduce(array, sum, 0));

function average(current, item) {
    return current + item;
}


function customReduce(array, callback, startValue = 0) {

    let outVal = startValue;

    for(let i = 0; i < array.length; i++)
    {
        outVal = callback(outVal, array[i]);
    }

    return outVal;
}*/
/*
let array = [1, 2, 3, 4, 5, 6];

console.log(customSplice(array, 2, 2));


function customSplice(array, startIndex, deleteCount, ...params)
{
    let tempArray;
    let endIndex = startIndex + deleteCount;
    tempArray = array.slice(0, startIndex);
    tempArray.push(...array.slice(endIndex, array.length));
    return tempArray;
}*/


var obj1 = {
    prop1: "val1",
    prop2: "val2",
    prop3: "val3",
    prop4: {
        prop1: "val1",
        prop2: "val2",
        prop3: {
            prop1: "val1",
            prop2: "val2"
        }
    }
};

var obj2 = {
    prop1: "val1",
    prop2: "val2",
    prop3: "val3",
    prop4: {
        prop1: "val1",
        prop2: "val2",
        prop3: {
            prop1: "val1",
            prop2: "val2"
        }
    }
};

console.log(deepEqual(obj1, obj2));

function deepEqual(obj1, obj2)
{

    for(var key in obj1) {

        if (key in obj2)
        {
            if (typeof obj1[key] === 'object') {
                return deepEqual(obj1[key], obj2[key]);
            }
            else {
                if (!(obj1[key] == obj2[key])) {
                    return false;
                }

            }
        }
        else {
            return false;
        }
    }
    return true;
}


//console.log(mutiEachBy3(array));

//Returns new array
