# Optimizing Database Performance with PostgreSQL and Node.js

## Project Overview

This project aims to optimize database performance using PostgreSQL, Node.js (Express), and Swagger for API documentation. The dataset originates from the UCI Machine Learning Repository and is used to simulate a real-world e-commerce scenario. Key optimizations include use of stored procedures, triggers, efficient database schema design, and performance analysis using PostgreSQL’s EXPLAIN and ANALYZE.



## Technologies Used

* PostgreSQL
* Node.js (Express.js)
* Swagger (OpenAPI)
* JavaScript
* SQL

## Setup Instructions

1. Clone this repository:

   
   git clone (https://github.com/MosesOmondi046/online-retailapi)
   cd <online-retailapi>
   

2. Install backend dependencies:
   cd backend
   npm install
  

3. Configure your PostgreSQL database:

4. Start the API server:


5. Access Swagger UI:

   * Visit: `http://localhost:3000/api-docs`

## Features

* CRUD operations for products via RESTful API
* Stored procedures for advanced analytics (e.g., total sales, average order value)
* Triggers for automatic updates (e.g., updating timestamps, managing stock)
* Performance tuning using EXPLAIN and ANALYZE

## Performance Optimization

* Screenshots of EXPLAIN/ANALYZE results before and after optimizations are located in the /screenshots folder.

## Key Endpoints

| Method | Endpoint       | Description         |
| ------ | -------------- | ------------------- |
| GET    | /products      | List all products   |
| GET    | /products/\:id | Get a product by ID |
| POST   | /products      | Add a new product   |
| PUT    | /products/\:id | Update a product    |
| DELETE | /products/\:id | Delete a product    |

## Swagger Documentation

Swagger UI is available at: `http://localhost:3000/api-docs`

The API documentation includes:

* Endpoint descriptions
* Parameters and responses
* Try-it-out feature for live testing


## GitHub Repository: https://github.com/MosesOmondi046/online-retailapi

GitHub Folder: 


