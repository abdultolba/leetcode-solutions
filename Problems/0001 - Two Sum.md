# 1. Two Sum

Given an array of integers, return **indices** of the two numbers such that they add up to a specific target.

You may assume that each input would have **exactly** one solution, and you may not use the same element twice.

## Example:

    Given nums = [2, 7, 11, 15], target = 9,

    Because nums[0] + nums[1] = 2 + 7 = 9,
    return [0, 1].

## Solution

At first glance, one might come up with a *brute force* solution, where you would simply iterate over the array `nums`, and at each element `a`, iterate over the rest of the array until you find an element `b` such that `a + b = target`. Such a solution would look something like this:

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum => (nums, target) {
    for(let i = 0; i < nums.length; i++){
        for(let j = i + 1; j < nums.length; j++){
            if(nums[i] + nums[j] === target) return [i, j]
        }
    }
};
```
Unfortunately this isn't a very efficient approach. For each time the outer loop executes, the inner loop executes `n` times. Therefore, the statement in the nested loop executes a total of `n * n` times. This results in a time complexity of $O$($n^2$), meaning it grows in quadratic time. 

---

A better approach is a dynamic one - for each number I come across, I store the remaining part of the sum I need in a cache if it doesnt already exist. Once I come across the solution, it would already be in the cache and thus returns. By increasing space complexity from $O$($1$) to $O$($n$), we can drastically improve the time complexity.

i.e: If `target = 9`, and the input is `nums = [2, 7, 11, 15]`, then when I first read `nums[0] = 2`, I would store `9 - 2 = 7` in the cache. This would look like:
```javascript
{
    7: 0
}
``` 
The solution, which would have a linear time - $O$($n$) - would thus be:

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum => (nums, target) {
    const hash = {};
    for(let i = 0; i < nums.length; i++){
        if(hash[nums[i]] >= 0) return [hash[nums[i]], i]
        hash[target - nums[i]] = i
    }
};
```
