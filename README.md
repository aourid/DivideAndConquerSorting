# Divide and Conquer Sorting

The idea here is to implement a simple sorting algorithm (based on the Selection algorithm).This is an easy and efficient algorithm for small dataset. Then, by analyzing the number of swapping and number of comparisons to achieve the sorting output in function of the dimension of the original array, we can improve drasically the performance of the original algorithm by dividing the original array into many sub-arrays with very small dimension. The sub-arrays are then sorted and merged one by one to generate the final sorted array.

This is the same idea as Divide and Conquer paradigms.

## I. Number of Comparison and Swapping:

The number of swapping and comparison needed to sort an array of dimension n is given by.
$$T_n = \frac {n(n-1)}{2}$$

As we can see, the computational complexity is $O(n^2)$. This is very bad in comparison to good algorithms with computational complexity $O(n \log{n})$.

But our concern here, is to show that by dividing the original array into small sub-arrays, we can improve drastically the computational complexity.

Before doing that, we can already improve the first method by reducing the number of swapping. Since, the total number $T_n$ is always the same, by reducing the number of swapping, it will increase the number of comparison and vice versa.

### Variant 1: Swap with the next smaller element.

In this variant, for each element (i.e. called _pivot element_) in the array, we try to find the _first smaller_ element (i.e. _current element_) among the remaining element in the array. If the pivot element is larger than the current element, we then swap. In other way, we swap any time the current element is smaller than a pivot element. This is not efficient for larger size, but we don't have to keep track of any index in comparison to classical Selection sorting (variant 2).

### Variant 2: Selection Sorthing Algorithm.

This is the classical sorting algorithm, where the array is divided into two parts: a sorted sub-array and the remaning unsorted sub array.
The algorithm proceeds by repeatedly select the smallest element from unsorted part and swap it with first element of the remaining part (unsorted sub-array). In this case we have to save the index of the smallest element to perform the swapping later, after scanning the whole unsorted sub-array. (For more details, many references are available on the internet).

It's clear that the number of swapping in the second variant is smaller than the one from variant 1. However, since we will divide the original data into a very small sub-arrays, we will consider the variant 1. This is justified because the size of the sub-arrays is very small and in consequence the number of swapping is not significant. At the same time, we don't have to keep track for any index for the minimum to swap with.

## II. Divide, Sort and Merge

The array of size n is dived into N sub-arrays. Each one has a dimension $n_s$, so:
$$n = \sum_{s} ^{N} {n_s}$$
and $$T_{n_s} = \frac {n_s(n_s - 1)}{2} = k$$ where $k$ is very small number.

So, $T_n$ will be approximately equivalent to: $$T_n \approx \sum_{s} ^{N}k = N.k$$

### Merge function

Once all sub-arrays are sorted, then we merge them one by one to reconstruct the sorted array. The merge function of 2 sub-arrays $a$ and $b$, is performed as follows:

**_c = merge(a, b):_**

At any iteration: _k_

- Take $c[k] = min(a[0], b[0])$,
- Remove it from its correspondig sub-array (a or b),
- Repeat the process until a or b is empty

#### Example:

To illustrate the merge function, let's consider the following example:

$a = [1, 3, 5, 6]$ , $b = [2, 3, 4, 5]$

so, $c[0] = min(a[0], b[0]) = min(1, 2) = 1$.
So, we append 1 in c and we remove it from a.

$\Rightarrow$
$a = [3, 5, 6]$ and $b = [2, 3, 4, 5]$.

At the second step, $c[1] = min(a[0], b[0]) = min(3, 2) = 2$. In the same manner, we append 2 in c and we remove it from b. Which result to:
$a = [3, 5, 6]$ and $b = [3, 4, 5]$.

We repeat the same process until a or b becomes empty. In this case, we append the remaining elements into c from the non empty list.

At the end c will be $[1, 2, 3, 3, 4, 5, 5, 6]$.
