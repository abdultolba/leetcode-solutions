# 1221. Split a String in Balanced Strings

*Balanced* strings are those who have equal quantity of 'L' and 'R' characters.

Given a balanced string ```s``` split it in the maximum amount of balanced strings.

Return the maximum amount of splitted balanced strings.

**Example 1.**
<pre>
<b>Input:</b> s = "RLRRLLRLRL"
<b>Output:</b> 4
<b>Explanation:</b> s can be split into "RL", "RRLL", "RL", "RL", each substring contains same number of 'L' and 'R'.
</pre>

**Example 2.**
<pre>
<b>Input:</b> s = "RLLLLRRRLR"
<b>Output:</b> 3
<b>Explanation:</b> s can be split into "RL", "LLLRRR", "LR", each substring contains same number of 'L' and 'R'.
</pre>

**Example 3.**
<pre>
<b>Input:</b> s = "LLLLRRRR"
<b>Output:</b> 1
<b>Explanation:</b> s can be split into "LLLLRRRR".
</pre>

**Example 4.**
<pre>
<b>Input:</b> s = "RLRRRLLRLL"
<b>Output:</b> 2
<b>Explanation:</b> s can be split into "RL", "RRRLLRLL", since each substring contains an equal number of 'L' and 'R'
</pre>

**Constraints**
* ```1 <= s.length <= 1000```
* ```s[i] = 'L' or 'R'```

## Solution

One solution to this is to iterate over each character of the string and check the balance. If there is an equal number of L's and R's, the balance would be 0, and thus, there exists a balanced string of R's and L's.

Code:

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var balancedStringSplit = function(s) {
    let balance = 0, count = 0;
    for(let i = 0; i < s.length; i++){
        balance = (s[i] == 'R') ? balance + 1 : balance - 1
        if(balance == 0) count++
    }
    return count;
};
```

**Time Complexity**

- This algorithm has a runtime of ```O(N)``` since we must loop through n character's once.
