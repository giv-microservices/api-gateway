1- to connect tho a micro services you first need to install `npm i --save @nestjs/microservices`
2- you need to register the MS, in this project we did it the module, but theres more ways
3- in teh controller you set  the emit methods to contact to the ms




Authentication and Authorization: Use guards for authentication and authorization to have fine-grained control over route access.
Pre-processing: Use middleware for tasks that need to occur before route handlers, like request logging, body parsing, and simple authentication checks.
Post-processing and Transformation: Use interceptors for response transformation, logging execution times, and other tasks that require wrapping the request-response lifecycle.
