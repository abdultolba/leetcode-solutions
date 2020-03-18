## 146. LRU Cache

Design and implement a data structure for *Least Recently Used (LRU)* cache. It should support the following operations: ```get``` and ```put```.

```get(key)``` - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.

```put(key, value)``` - Set or insert the value if the key is not already present. When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.

The cache is initialized with a **positive** capacity.

**Follow up:**
Could you do both operations in **O(1)** time complexity?

## Example
```
LRUCache cache = new LRUCache( 2 /* capacity */ );

cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // returns 1
cache.put(3, 3);    // evicts key 2
cache.get(2);       // returns -1 (not found)
cache.put(4, 4);    // evicts key 1
cache.get(1);       // returns -1 (not found)
cache.get(3);       // returns 3
cache.get(4);       // returns 4
```

## Solution

For readability, I decided to use ES6 classes rather than prototypes to define the LRUCache object. I used the built-in ```Map``` object as it preserves the order of insertion, which is useful when checking which item was acced most or least recently. The ```get``` function returns -1 if the key isn't found, otherwise it re-inserts the value (to update it to most recently used) and then returns the value. The put method inserts the given key and value (and deleted th ekey if it already exists). If the capacity has been reached, it deleted the least recently used item, which would be the first item in the MapIterator (sort of like a Queue).

Code:

```
/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

class LRUCache{
    /**
    * @param {number} capacity
    */
    constructor(capacity){
        this.cache = new Map();
        this.capacity = capacity;
    }
    
    /** 
    * @param {number} key
    * @return {number}
    */
    get(key){
        if(!this.cache.has(key)){
            return -1; // If it doesn't exist, return 1
        }
        const temp = this.cache.get(key) // Delete & reset its position to updatte most recently used
        this.cache.delete(key)
        this.cache.set(key, temp)
        return temp
    };
    
    /** 
    * @param {number} key 
    * @param {number} value
    * @return {void}
    */
    put(key, value) {
        if(this.cache.has(key)){
            this.cache.delete(key)
        }
        this.cache.set(key, value)
        if(this.capacity < this.cache.size){
            this.cache.delete(this.cache.keys().next().value)
        }
    }
}
```
