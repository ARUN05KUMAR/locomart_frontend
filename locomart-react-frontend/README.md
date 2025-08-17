# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## By Arun, What I Did?
    
    1) Home Page Creation:

        Created a Home Page that fetches all products from the backend and categorizes them based on product type.

        Each product group is passed into the ProductFeed component using the map function.

        The ProductFeed component uses an unordered list (<ul>) to iterate over products, and each product is passed to the ProductCard component for rendering.

    2) Service Folder:

        Created a services folder and inside it, added a file called productService.jsx.

        Defined functions in this file to handle fetching data from the backend using axios.

    3) Category Page:

        Created the CategoryProduct.jsx file to display the details of a specific product.

        The unique product ID is received as a URL parameter, and product details are fetched from the backend.

        All products in the same category are filtered and displayed at the end of the page using the ProductFeed component.

    4) Packages Installed:
        
        I installed the following packages to implement these features:
    
                npm install react-router-dom
                npm install axios
    
    5) Dummy JSON Server:
    
        For testing, I used a dummy JSON server with product data stored in the db.json file inside the json-server folder.
        To start the server, I ran the following commands:
    
                npm install json-server
                npx json-server --watch db.json --port 3000

    Note:
        In the App.jsx , i wrote a temproary code to check the CategoryProduct page ("i commented those code"), to see this page uncomment the code and execute the program , then access it from "http://localhost:5173/product/1"