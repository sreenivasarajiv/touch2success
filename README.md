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
2. Unit Test Implementation
3. Dependency Injection Mechanism in Backend for injecting and managing Dependencies

### Features
1. TypeORM implementation
2. Global Exception Handling
3. Error Handling
4. JWT Authentication Mechanism, Auth Middleware
5. Winston for Logging Purpose
6. Complete Code in Typescript 
7. Database Connection Pooling
8. App -> Routes -> Controller -> Services -> Repository styled code
---
## Front End
### How to Run:

        cd front-end && npm i
        ng s

<br>

1. Web Application will be running in port __4200__.
2. Open Browser and Navigate to __http://localhost:4200__
3. In Order to clear Previous Login Token Credentials (if already loggedin), Open Chrome Dev Tools

                localStorage.clear()

### Todo:
1. Yet to Implement Dashboad Logics
   * __Store Component:__ Form for Store CRUD Operations, Search Store By Name, Show List of Stores with Total Customers
   * __Customer Component:__ Form for Customer CRUD Operations, Show List of Customers, Show Store Information of a Customer
   * State Management with __NgRx__
   * Modular/Facade Design Pattern for Reusable/Shared Modules and Modular Code Structure
   * Logout Mechanism

### Features
1. Auth Guard Mechanism to Handle JWT Token and Logging-in the User to Dashboard From Login Page, Once the Credentials are Validated on Backend side
2. Angular Material Design (Partially Implemented)

