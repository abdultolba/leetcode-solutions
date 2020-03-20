# 709. To Lower Case

Implement function ToLowerCase() that has a string parameter str, and returns the same string in lowercase.

**Example 1.**
<pre>
<b>Input:</b> "Hello"
<b>Output:</b> "hello"
</pre>

**Example 2.**
<pre>
<b>Input:</b> "here"
<b>Output:</b> "here"
</pre>

**Example 3.**
<pre>
<b>Input:</b> "LOVELY"
<b>Output:</b> "lovely"
</pre>

## Solution

Most programming languages already include the function ```ToLowerCase()```, so one could simply do the following:
```javascript 
return str.ToLowerCase()
```
However, this defeats the purpose. Instead, there are a few ways to implement it yourself. One solution is to loop through each character of the string. If it is an alpha character (a-z or A-Z), and is not already lowercase, then convert it by adding 32 to it's ASCII code, because the difference is 32 ascii characters. To ensure character like ```!, @, #, $, %, ^, &, *, (, ), -, _, =, +``` arent changed, we check if they exist in the alphabet string.

Code:

```javascript
/**
 * @param {string} str
 * @return {string}
 */
var toLowerCase = function(str) {
    let result = "",
        alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    for(let i = 0; i < str.length; i++){
        if(!alphabet.includes(str[i])){
            result += str[i]
        } else{
            if(str[i] != str[i].toUpperCase()) result += str[i]
            else result += String.fromCharCode(str.charCodeAt(i) + 32)
        }
    }
    return result;
};
```

Another similar, but simple solution is to convert the string to an array, map each character to either itself or the lowercase of it using char codes, then back to a string.

Code:

 ```javascript
 /**
 * @param {string} str
 * @return {string}
 */
const toLowerCase = (str) => {
    //Calculate Ascii diff from a to A
    const DIFF = ('a'.charCodeAt(0) - 'A'.charCodeAt(0));
    
    return Array
        .from(str)
        .map( ch => ( ch >= 'A' && ch <= 'Z' ) ? String.fromCharCode(ch.charCodeAt(0) + DIFF) : ch )
        .join('');
};
```
