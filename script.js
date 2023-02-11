//******************************************************************************//
// Challenge: Sorting based on Divide and Conquer                               //
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
const inputholderElement = document.querySelector(".inputholder");
const divideInputDataElement = document.querySelector(".dividedata");
const subarraySizeElement = document.querySelector(".subarraySize");

const generateElement = document.querySelector(".generateBTN");
const sortBTNElement = document.querySelector(".sortBTN");
const divideBTNElement = document.querySelector(".divideBTN");
const sortListElement = document.querySelector(".sortList");
const mergeElement = document.querySelector(".merge");
const mergedataElement = document.querySelector(".mergedata");

const nb_comparisonElement = document.querySelector(".comparison");
const nb_swapElement = document.querySelector(".swap");
const nb_operationElement = document.querySelector(".operation");
const nb_comparisonMethod2Element =
  document.querySelector(".comparisonMethod2");
const nb_swapMethod2Element = document.querySelector(".swapMethod2");
const nb_operationMethod2Element = document.querySelector(".operationMethod2");

const nb_comparisonMethod3Element =
  document.querySelector(".comparisonMethod3");
const nb_swapMethod3Element = document.querySelector(".swapMethod3");
const nb_operationMethod3Element = document.querySelector(".operationMethod3");

//generate a random array with size = arrayDimension
generateElement.addEventListener("click", () => {
  let arrayDimension = Number(inputholderElement.value);
  let arrayElement = generateRandomArray(arrayDimension);
  inputdataElement.value = arrayElement;
  inputdataElement.textContent = arrayElement;
  console.log("Random array", inputdataElement.value);
  divideInputDataElement.value = [...arrayElement];
  //To keep a clone copy of the original array
});

sortBTNElement.addEventListener("click", () => {
  let arr = inputdataElement.value;
  let arrCopy = [...inputdataElement.value];
  let sortedArray = [];
  //Pseudo Selection Sorting the array
  sortedArray = sortArray(arr);
  sortListElement.textContent = sortedArray.arr;
  nb_comparisonElement.textContent = sortedArray.numberComparison;
  nb_swapElement.textContent = sortedArray.numberSwap;
  nb_operationElement.textContent =
    Number(sortedArray.numberComparison) + Number(sortedArray.numberSwap);

  //Selction Sorting Method here:
  let sortedArrayBySecondMethod = [];
  sortedArrayBySecondMethod = sortArrayBySelection(arrCopy);
  console.log("sorted copy 2end Method: ", sortedArrayBySecondMethod);

  nb_comparisonMethod2Element.textContent =
    sortedArrayBySecondMethod.numberComparison;
  nb_swapMethod2Element.textContent = sortedArrayBySecondMethod.numberSwap;
  nb_operationMethod2Element.textContent =
    Number(sortedArrayBySecondMethod.numberComparison) +
    Number(sortedArrayBySecondMethod.numberSwap);
});
//Divide and Sort  sub arrays
divideBTNElement.addEventListener("click", () => {
  // let arrayOriginal = [...inputdataElement.value];
  console.log(
    "-----------------------------------------------------------------"
  );
  console.log(
    "***    S t a r t  t h e  D i v i d e  a n d  C o n q u e r   ***"
  );
  console.log(
    "-----------------------------------------------------------------"
  );

  console.log("*** Original array: ", divideInputDataElement.value);
  let subarraysize = Number(subarraySizeElement.value);
  if (subarraysize === 0) subarraysize = 1; //To avoid division by 0
  let dividedArray = arrDivide(divideInputDataElement.value, subarraysize);
  console.log("Divide the Array", dividedArray);
  console.log("******** S O R T  E A C H  S U B  A R R A Y ********");
  let numberOfsubarrays = dividedArray.length;
  let totalSwap = 0;
  let totalComparison = 0;
  let tmpArr = {};
  for (let i = 0; i < numberOfsubarrays; i++) {
    // console.log(` ..... sort of sub arrays:${i} , ${dividedArray[i]}`);
    tmpArr = sortArray(dividedArray[i]);
    totalSwap += tmpArr.numberSwap;
    totalComparison += tmpArr.numberComparison;
  }
  console.log("Sub arrays after sorting", dividedArray);
  console.log(
    `   Total swap: ${totalSwap}, total Comparison: ${totalComparison}`
  );

  nb_comparisonMethod3Element.textContent = totalComparison;
  nb_swapMethod3Element.textContent = totalSwap;
  nb_operationMethod3Element.textContent =
    Number(totalComparison) + Number(totalSwap);

  let constructedArray = "[";
  let mergeSubLists = [];
  for (let i = 0; i < dividedArray.length; i++) {
    // console.log(`Element N: ${i}:`, dividedArray[i]);
    // print(dividedArray[i]);
    constructedArray += `[${dividedArray[i]}],`;
    mergeSubLists = mergeArrays(mergeSubLists, dividedArray[i]);
  }
  divideInputDataElement.textContent = constructedArray + "]";
  console.log(mergeSubLists);
  mergeElement.addEventListener("click", () => {
    mergedataElement.textContent = mergeSubLists;
  });
});

/////////////////////////////////////////////////////////////////////////
// Method 1: Sort an Array, by swaping between a Pivot and any number less
// than the pivot
// return an object of: the sorted array, the number of swap and number of
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
      } else numberComparison++;
    }
  }
  console.log(
    `  ****   Number of Elements: ${
      arr.length
    }      Number of swaps:  ${numberSwap}       Number of Comparisons:  ${numberComparison}    ==> Total:  ${
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

function sortArrayBySelection(arr) {
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
    `  ****   Number of Elements: ${
      arr.length
    }      Number of swaps:  ${numberSwap}       Number of Comparisons:  ${numberComparison}    ==> Total:  ${
      numberSwap + numberComparison
    }`
  );

  return { arr, numberSwap, numberComparison };
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
  // a and b has to be sorted before starting to merge
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
  // console.log(a[0], b[0]);

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
