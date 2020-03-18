# 155. Min Stack

Design a stack that supports push, pop, top, and retrieving the minimum element in **constant time**.

* push(x) -- Push element x onto stack.
* pop() -- Removes the element on top of the stack.
* top() -- Get the top element.
* getMin() -- Retrieve the minimum element in the stack.

## Example

```javascript
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin();   --> Returns -3.
minStack.pop();
minStack.top();      --> Returns 0.
minStack.getMin();   --> Returns -2.
```

## Solution

Design a min stack can be considered quite easy, it is a fundamental of data structures in computer science. To implement one, I used the ES6 Class Syntax to initialize an array called stack. In order to store the minimum value in O(1) time, each element in the stack is a subarray, containing two elements:
* the value (```stack[stack.length - 1][0]```)
* the current minimum (```stack[stack.length - 1][1]```)

This works well when factoring in scalability because the minimum value will always be up to date as elements get pushed/popped.

Code:

```javascript
/** 
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

class MinStack{
    /**
    * initialize your data structure here.
    */
    constructor(){
        this.stack = []
    }
    
    /** 
    * @param {number} x
    * @return {void}
    */
    push(x){
        // If the stack isn't empty, get the minimum, otherwise, the min is x
        let min = this.stack.length ? Math.min(this.getMin(), x) : x;
        this.stack.push([x, min])
    }
    
    /**
    * @return {void}
    */
    pop(){
        // If you want to return the element 
        // popped, use the following line:
        // return this.stack.pop()[0];
        
        this.stack.pop()
    }
    
    /**
    * @return {number}
    */
    top(){
        return this.stack[this.stack.length - 1][0]
    }
    
    /**
    * @return {number}
    */
    getMin(){
        return this.stack[this.stack.length - 1][1]
    }
}
```
