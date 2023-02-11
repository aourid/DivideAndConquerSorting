# Divide and Conquer Sorting

The idea here is to implement a simple sorting algorithm (based on the Selection algorithm).This is an easy and efficient algorithm for small dataset. Then, by analyzing the number of swapping and number of comparisons to achieve the sorting output in function of the dimension of the original array, we can improve drasically the performance of the original algorithm by dividing the original array into many sub arrays with very small dimension. The sub arrays are then sorted and merged one by one to generate the final sorted array.

This is the same idea as Divide and Conquer paradigms.

## I. Number of Comparison and Swapping:

The number of swapping and comparison needed to sort the array of dimension n is given by.
$$T_n = \frac {n(n-1)}{2}$$
where n: is the dimension of the array.

As we can see, the computational complexity is $O(n^2)$ which is very bad in comparison to good algorithms with computational complexity $O(n \log{n})$.

But our concern here, is to show that by dividing the original array into small subarrays, we can improve drastically the computational complexity.

Before doing that, we can already improve the first method by reducing the number of swapping. Since, the total number $T_n$ is always the same, by reducing the number of swapping, it will increase the number of comparison and vice versa.

### Variant 1: Swap with the next small element.

In this method, we swap any time we found a small element. This is not efficient, but we don't have to keep track of any index

### Variant 2: Swap with the smallest element.

In this variant, we repeatedly select the smallest element and swap it with first element of the remaining list. In this case we have to save the index of the smallest element. (I am not giving all details of the Selection Algorithm. Many references are available on the internet).

As we can notice on the simulation, the number of swapping in the second variant is smaller than the one from variant 1. However, since we will divide the original data into a very small subarrays, we will consider the variant 1, (with very small swapping and we don't have to keep track of any index for the smallest element)

## II. Divide, Sort and Merge

The array of size n is dived into N sub arrays. Each one has a dimension $n_s$, so:
$$n = \sum_{s} ^{N} {n_s}$$
and $$T_{n_s} = \frac {n_s(n_s - 1)}{2} = k$$ where $k$ is very small number.

So, $T_n$ will be approximately equivalent to: $$T_n \approx \sum_{s} ^{N}k = N.k$$

### Merge function

Once all sub arrays are sorted, then we merge them one by one to reconstruct the sorted array. The merge function of 2 sub arrays $a$ and $b$, is performed as follows:

**_c = merge(a, b):_**

- Take $c[k] = min(a[0], b[0])$,
- remove it from its correspondig sub array (a or b),
- Repeat the process until a or b is empty

#### Example:

$c = merge(a, b)$

where: $a = [1, 3, 5, 6]$ , $b = [2, 3, 4, 5]$

$$min(a[0], b[0]) = min(1, 2) = 1 $$
we append 1 in c and we remove it from a

$\Rightarrow$
$a = [3, 5, 6]$ and $b = [2, 3, 4, 5]$

We repeat the same process until a or b becomes empty, them we append the remaining elements into c from the non empty list.

At the end c will be $[1, 2, 3, 3, 4, 5, 5, 6]$ that will be merged with another sub array b let's say: b = [1, 3, 5, 6] which result to:
$$c = [1, 1, 2, 3, 3, 3, 4, 5, 5, 5, 6, 6]$$
