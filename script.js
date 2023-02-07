//******************************************************************************//
// Challenge: Sorting based on Divide and Conquer                                                       //
// Date: January 25th, 2023                                                     //
// Author: Sidi M. Aourid                                                       //
// Step 1: Generate a Random integer array:             generateRandomArray(n)  //
// Step 2: Sort the array from small to large value:    sortArray(arr)          //
// Step 3:  Take the first array (generated) and divid it on small sub arrays   //
//          The size of each sub array has to be considerd as a parameter to be //
//          able to test different scenario:           arrDivide(arr,subarrSize)//
// Step 4:  Sort each sub array                                                 //
// Step 5: Merge the sub arrays:                         mergeSubArrays(a,b)    //
////****************************************************************************//

const inputdataElement = document.querySelector(".inputdata");
const generateElement = document.querySelector(".generateBTN");
const inputholderElement = document.querySelector(".inputholder");
const sortBTNElement = document.querySelector(".sortBTN");
const sortListElement = document.querySelector(".sortList");

const nb_comparisonElement = document.querySelector(".nb_comparison");
const nb_swapElement = document.querySelector(".nb_swap");

//input the size of the List
inputholderElement.addEventListener("click", () => {
  // console.log(inputholderElement.value);
  let listSize = Number(inputholderElement.value);
  console.log("List size: ", listSize, typeof listSize);
  generateElement.addEventListener("click", () => {
    console.log("Generate a random list");
    let arrayElement = generateRandomArray(listSize);
    console.log("array element type:", arrayElement, typeof arrayElement);
    for (let i = 0; i < arrayElement.length; i++) {
      console.log(`a(${i}) = ${a[i]}`);
    }
    // inputdataElement.textContent = `Random List = [${arrayElement}]`;
    // inputdataElement.textContent = arrayElement;
    inputdataElement.value = arrayElement;
    inputdataElement.textContent = arrayElement;
    console.log("..... Finally this element", inputdataElement.value);

    // divideBTNElement.addEventListener("click", () => {
    //   sortListElement.textContent = arrDivide(arrayElement, 3);
    // });
  });
});

sortBTNElement.addEventListener("click", () => {
  console.log("****************************************");
  console.log("I will sort them on few moment");
  // console.log("edit the element of array", inputdataElement.textContent);
  // let arr = inputdataElement.textContent.slice(13); //remove the first string: Random...
  let arr = inputdataElement.value; //remove the first string: Random...
  let sortedArray = [];

  console.log("Array to sort: ", arr, typeof arr);
  // console.log("pad first part", arr.slice(13));
  console.log("array now:", Array.of(arr));

  console.log("****************************************");
  sortedArray = sortArray(arr);
  sortListElement.textContent = sortedArray.arr;
  nb_comparisonElement.textContent = sortedArray.numberComparison;
  nb_swapElement.textContent = sortedArray.numberSwap;
  console.log(sortListElement.textContent);
});

// generateElement.addEventListener("click", () => {
//   console.log("Generate a random list");
//   // console.log(generateRandomArray(10));
//   inputdataElement.textContent = `[${generateRandomArray(10)}]`;
// });

/////////////////////////////////////////////////////////////////////////
// Method 1: Sort an Array, by swaping between a Pivot and any number less
// than the pivot
// return the sorted array and outputs the number of swap and number of
// comparison
/////////////////////////////////////////////////////////////////////////

function sortArray(arr) {
  let numberSwap = 0;
  let numberComparison = 0;
  for (let pivot = 0; pivot < arr.length; pivot++) {
    for (let i = pivot + 1; i < arr.length; i++) {
      if (arr[i] < arr[pivot]) {
        let tmp = arr[pivot];
        arr[pivot] = arr[i];
        arr[i] = tmp;
        numberSwap++;
        // console.log("after swap: ", arr[pivot], " --> ", arr[i]);
      } else numberComparison++;
    }
  }
  console.log(
    `Number of Elements: ${
      arr.length
    } and the number of swap is: ${numberSwap} and Number of Comparison is: ${numberComparison} ==> Total is: ${
      numberSwap + numberComparison
    }`
  );
  return { arr, numberSwap, numberComparison };
}

/////////////////////////////////////////////////////////////////////////
// Method 2: Sort by swaping between a Pivot and the min
// return the sorted array and outputs the number of swap and number of
// comparison
/////////////////////////////////////////////////////////////////////////

function sortArrayBasedOnMinInsertion(arr) {
  // console.log(arr.length);
  let numberSwap = 0;
  let numberComparison = 0;
  let minIndex = 0;
  let isMinChanged;
  for (let pivot = 0; pivot < arr.length; pivot++) {
    isMinChanged = false;
    Mymin = arr[pivot];
    for (let i = pivot + 1; i < arr.length; i++) {
      if (arr[i] < Mymin) {
        Mymin = arr[i];
        minIndex = i;
        numberSwap++;
        isMinChanged = true;
      } else numberComparison++;
    }
    if (isMinChanged === true) {
      //Here we swap only once between the pivot and the min
      tmp = arr[pivot];
      arr[pivot] = Mymin;
      arr[minIndex] = tmp;
    }
  }
  console.log(
    `Number of Elements: ${
      arr.length
    } and the number of swap is: ${numberSwap} and Number of Comparison is: ${numberComparison} ==> Total is: ${
      numberSwap + numberComparison
    }`
  );
  return arr;
}

function swap(a, b) {
  let tmp = a;
  a = b;
  b = tmp;
  console.log(a, b);
}

function generateRandomArray(n) {
  a = [];
  for (let i = 0; i < n; i++) a.push(Math.floor(Math.random() * n));
  return a;
}

function mergeArrays(a, b) {
  //if a and b are sorted, then not necessarily to sort them again
  // console.log(
  //   "a: ",
  //   a.sort(function (a, b) {
  //     return a - b;
  //   })
  // );
  // console.log(
  //   "b: ",
  //   b.sort(function (a, b) {
  //     return a - b;
  //   })
  // );
  console.log(a[0], b[0]);
  let c = [];
  let small = 0;
  while (a.length !== 0 && b.length !== 0) {
    small = Math.min(a[0], b[0]);
    c.push(small);
    small === a[0] ? a.shift() : b.shift();
    // if (small === a[0]) a.shift();
    // else b.shift();
  }
  return c.concat(a, b);
}

/////////////////////////////////////////////////////////////////////////
//  Split array on different subarrays
//   each subarrays has dimension subarraySize as a parameter
/////////////////////////////////////////////////////////////////////////
function arrDivide(arr, subarrSize) {
  console.log("Original array dimension", arr.length);
  subArrayDimension = subarrSize; //This is a parameter. It can be fixed at any small value
  let numberOfPartition = arr.length / subArrayDimension;
  const arrSliced = [];
  for (let i = 0; i < numberOfPartition; i++) {
    arrSliced.push(
      arr.slice(subArrayDimension * i, subArrayDimension * (i + 1))
    );
  }
  return arrSliced;
}

////////////////////////////////////////////////////////////
//The Main function                                       //
//numberOfItems: number of random element to sort         //
// Number of division: size of each subarrays             //
////////////////////////////////////////////////////////////
function sortByDivideAndConquer(number0fItems, sizeOfSubArray) {
  console.log("Compare sorting with and without dividing:");
  const testArray = generateRandomArray(number0fItems);
  console.log(" .....  Sorting without dividing ........");
  // console.log("  --->  This is the test array before sorting:", testArray);
  sortedtestArray = sortArray(testArray);
  // console.log("  --->  This is the test array after sorting:", testArray);
  // console.log("  --->  This is the array after sorting:", sortedtestArray);

  console.log(" ........ Start Divide and Conquer ........");
  const testArrayDivided = arrDivide(testArray, sizeOfSubArray);
  // console.log(testArrayDivided);
  let numberOfsubarrays = testArrayDivided.length;
  for (let i = 0; i < numberOfsubarrays; i++) {
    // console.log("List of sub arrays: ", testArrayDivided[i]);
    sortArray(testArrayDivided[i]);
    // console.log("Number of sub subarray:");
  }
  console.log("");
  console.log("------------------------------------------------------");
  console.log("Number of subarrays: ", numberOfsubarrays);
  console.log("------------------------------------------------------");
  let mergeSubLists = [];
  for (let i = 0; i < testArrayDivided.length; i++) {
    console.log(`Element N: ${i}:`, testArrayDivided[i]);
    mergeSubLists = mergeArrays(mergeSubLists, testArrayDivided[i]);
  }
  console.log(mergeSubLists);
}
