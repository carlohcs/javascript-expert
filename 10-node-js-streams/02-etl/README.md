# README


## Refs:

> In addition, there is also a difference in how the .pipe and the pipeline consume Streams. The .pipe allows you not to read the entire stream, while the pipeline demands that you consume the entire stream and if you close it in the middle of the process, it throws an ERR_STREAM_PREMATURE_CLOSE error.

- https://stackoverflow.com/questions/55959479/error-err-stream-premature-close-premature-close-in-node-pipeline-stream/61379055#61379055
- https://stackoverflow.com/questions/32661873/node-streams-cause-large-memory-footprint-or-leak
- https://www.alxolr.com/articles/understanding-memory-leaks-in-node-js-part-1
- https://medium.com/the-node-js-collection/a-brief-history-of-node-streams-pt-2-bcb6b1fd7468
- https://nodejs.org/es/docs/guides/backpressuring-in-streams/