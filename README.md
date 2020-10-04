# Touch 2 Success Demo
## Backend
### How to Run:

        cd backend && npm i
        npm start

<br>

1. API will be running in port __3000__.
2. import Post Man Collection
3. Execution steps:
    * First run Authentication API (__/auth__) and copy the __JWT Token__ (from response)
    
            email: sreenivasarajiv@gmail.com
            password: Admin123$

    * Attach JWT For other APIs, in Header (__x-auth-token__: __"jwt-token"__)

            For example, Search Store By Name API, curl:

            curl --location --request GET 'localhost:3000/store?name=Real' --header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNyZWVuaXZhc2FyYWppdkBnbWFpbC5jb20iLCJuYW1lIjoiU3JlZW5pdmFzYSBSYWppdiBSIiwiaWF0IjoxNjAxODA2NjU2fQ.OWeZDb0Xp226Fj9vCuGif1HF-PiMis8erEaDZ9MyM1Y'

### Todo:
1. User details should be fetched from Database, Hardcoded as if now (not in given requirements)
2. Front End Application
3. Unit Test Implementation
4. Dependency Injection Mechanism in Backend for injecting and managing Dependencies

### Features
1. TypeORM implementation
2. Global Exception Handling
3. Error Handling
4. JWT Authentication Mechanism, Auth Middleware
5. Winston for Logging Purpose
6. Complete Code in Typescript 
7. Database Connection Pooling
8. App -> Routes -> Controller -> Services -> Repository styled code
