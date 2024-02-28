const items = []

while(true) items.push(items)

// node --max-old-space-size=64 index.js
// -> FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory