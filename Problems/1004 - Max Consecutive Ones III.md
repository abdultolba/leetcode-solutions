# [1004. Max Consecutive Ones III](https://leetcode.com/problems/max-consecutive-ones-iii/)

Given an array `A` of 0s and 1s, we may change up to `K` values from 0 to 1.

Return the length of the longest (contiguous) subarray that contains only 1s. 

**Example 1.**

<pre>
<b>Input:</b> A = [1,1,1,0,0,0,1,1,1,1,0], K = 2
<b>Output:</b> 6
<b>Explanation:</b> [1,1,1,0,0,<i><b>1</b>,1,1,1,1,<b>1</b></i>]
Bolded numbers were flipped from 0 to 1.  The longest subarray is <strike>underlined</strike> italicized.
</pre>

**Example 2.**
<pre>
<b>Input:</b> A = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], K = 3
<b>Output:</b> 10
<b>Explanation:</b> [0,0,<i>1,1,<b>1,1</b>,1,1,1,<b>1</b>,1,1</i>,0,0,0,1,1,1,1]
Bolded numbers were flipped from 0 to 1.  The longest subarray is <strike>underlined</strike> italicized.
</pre>

**Note:**
* ```1 <= A.length <= 20000```
* ```0 <= K <= A.length```
* ```A[i] is 0 or 1 ```

## Solution

There are a few different approaches you can take to solve this problem. One obvious approach to this would be a brute-force one, where we compute the subarray for each single value using nested for loops. This however repeats work and is not efficient, running at O(N^2) time.

A better approach is to use the [sliding window](https://www.geeksforgeeks.org/window-sliding-technique/) approach. I used a left and right pointer that move alone the length of the array, and use the variable K to keep track of how many zeroes have been flipped. If more than K zeroes are flipped, then the left pointer needs to be incremented until we get rid of a zero, thus "sliding the window" to the right.

Code:

```javascript
/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
const longestOnes = (A, K) => {
    let max = 0, i = 0;
    
    for(let j = 0; j < A.length; j++){
        // If we need to flip a zero, decrement
        // the the amount of zero's we can flip 
        if(K >= 0){
            if(A[j] === 0) K--
        }
        
        // Slide the left pointer until no more than 2 zeros are flipped
        while(K === -1){
            if(A[i] === 0) K++
            i++
        }
        
        // max is th bigger value between the current max
        // and the length of the subarray (j - i + 1)
        max = Math.max(max, j - i + 1)
    }
    
    return max;
};
```
