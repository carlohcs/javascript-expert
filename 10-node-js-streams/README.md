# README

JavaScript it was not created to handle heavy files. If it's used 2 GB inside of application, it will break with memory leak.

Why not use Python? We can use Node.js Streams to handle data by demand.

The data is transformed into a buffer, where the system cut the buffer into chunks, small parts of the file.


Readable Stream -> provides info to be readable - it's the source of data
Transform Streams -> map and transform and apply changes 
Writable Streams -> final part, download, console.log, save to db...

We use all by pipelines.

eg.: Request from HTTP -> Readable Stream
eg.: Response from application: Writable Stream


Extract, Transform and Load - ETL


## Refs

- [Deep dive into Node.js Streams](https://erickwendel.com/talk/detail/5ee6b2452c16eb4db7e7b776)
- [Andrii Shumada](https://www.slideshare.net/OdessaJSConf/andrii-shumada-use-cases-of-nodejs-streams)
- [Duplex and a collection of useful stream utility modules](https://github.com/max-mapper/mississippi#duplex)
