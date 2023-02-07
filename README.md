# Divide and Conquer Sorting

The idea here is to implement a simple sorting algorithm (based on the insertion algorithm). Then, by analyzing the number of swapping and number of comparisons to achieve the sorting output in function of the dimension of the original array, we can improve drasically the performance of the original algorithm by dividing the original array into many sub arrays with very small dimension. The sub arrays are then sorted and merged one by one to generate the final sorted array.

This is the same idea as Divide and Conquer paradigms.

## Number of Comparison and Swapping:

The number of swapping and comparison needed to sort the array of dimension n is given by.
$$T_n = \frac {n(n-1)}{2}$$
where n: is the dimension of the array.

As we can see, the computational complexity is $O(n^2)$ which is very bad in comparison to good algorithms with computational complexity $O(n \log{n})$.

But our concern here, is to show that by dividing the original array into small subarrays, we can improve drastically the computational complexity.
