# 1. Two Sum

Given an array of integers, return **indices** of the two numbers such that they add up to a specific target.

You may assume that each input would have **exactly** one solution, and you may not use the same element twice.

## Example:

    Given nums = [2, 7, 11, 15], target = 9,

    Because nums[0] + nums[1] = 2 + 7 = 9,
    return [0, 1].

## Solution

My approach is a dynamic one - for each number I come across, I store the remaining part of the sum I need in a cache if it doesnt already exist. Once I come across the solution, it would already be in the cache and thus returns.

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
