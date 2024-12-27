# Fruit Basket Project

## Overview

The goal of this project is to test my understanding of core JS and React fundamentals.

## Prompt

Suppose you are given the following array of fruits, sorted in alphabetical order:
```ts
const fruits = [
'Apple',
'Banana',
'Blueberry',
'Cherry',
'Kiwi',
'Mango',
'Orange',
'Pear',
'Pineapple',
'Strawberry’,
];
```

The objective is to build a CRUD application that fetches, adds, updates, and deletes the list of fruits, without making requests to an actual web server.

### Initial Render

1. On render of the page, simulate an API call via a promise which resolves with the list of fruits after 2 seconds.
2. While the fetch occurs, display the text “Loading...” on the page
3. After the promise resolves, do the following:
    a. Render a text input and an “Add” button to the right of it. These will be used for adding a new fruit to the list.
    b. Under the input, render the list of fruits where each list item displays the fruit name as well as an edit and delete button

### Adding a Fruit

1. After typing a value into the input and clicking the “Add” button, disable the “Add” button
2. Then, simulate an API request via a promise which, after 2 seconds, calls a function that does the following:
    a. If the new fruit name already exists within the array (case insensitive check), reject with the error message “{name} already exists”
    b. Otherwise, add the fruit to the fruits array and then resolve with the list of fruits sorted alphabetically
3. If the promise rejects:
    a. Re-enable the disabled “Add” button
    b. Render the error message in red under the add input
4. If the promise resolves:
    a. Re-enable the disabled “Add” button
    b. Re-render the list of fruits with the resolved fruits array

### Editing a Fruit

1. On click of the edit button, update the list item content to display an input field as well as a cancel and save button. The input field should be pre-populated with the fruit name you are editing.
2. On click of the cancel button, the list item should revert back to the previous state, showing the fruit name as well as edit and delete buttons.
3. On click of the save button:
    a. Disable the save button
    b. Simulate an API request via a promise which, after 2 seconds, calls a function that does the following:
        i. If the old fruit name does not exist (case insensitive check), return the error message: “{oldName} not found”
        ii. If the new fruit name already exists (case insensitive check), return the error message: “{newName} already in use”
        iii. If the old name and new name are both valid, then:
            1. Update the fruit array with the new name
            2. Resolve with the updated fruit array sorted alphabetically
4. If the promise rejects, re-enable the save button and display the error message under the edit input in the list item in red
5. If the promise resolves, re-render the list of fruits with the resolved fruits array. (Note: The list should get reset back to its default state, where no inputs are rendered within any of the list items)

### Deleting a Fruit

1. On click of delete, disable both the edit and delete buttons within the list item
2. Simulate an API request via a promise which, after 2 seconds, calls a function that does the following:
    a. If the name does not exist within the list of fruits, reject with the error message “{name} not found”
    b. If the name does exist:
        i. Remove the fruit with the name from the fruits array
        ii. Resolve with the updated list of fruits sorted alphabetically
3. If promise rejects, re-enable buttons and display error message in red above fruits list
4. If the promise resolves, re-render the list of fruits with the resolved fruits array

### Project Structure

You are welcome to set up the initial project via Vite or Create React App. Using TypeScript is optional. If you would like to write unit tests, you are also welcome to write unit tests with a testing library of your choice. You are also welcome to install a React component library and use any state management library or method of your choice.
The project structure outlined below is intentionally designed to mimic the current state of the web code base.

- **index.html:**
```html
<div id=”react-root”></div> <!-- Entrypoint to react application -->
<script type=”text/javascript”>var BASKET = BASKET || {}</script>
<script type=”text/javascript” src=”api.module.js”></script>
<script type=”module” src=”react.bundle.js” defer></script>
```

- **api.module.js:**
```js
BASKET.API = (() => {
    _fruits = [...]; // add list of fruits here, which will act as in-memory storage
    // Add any private methods here (prefixed with _)
    _output = () => console.log(_fruits); // Example method
    // Update the methods below to return a promise which, after 2 seconds, calls a
    // function that performs an operation and resolves with the fruits array or rejects with
    // an error message.
    return {
        getAll() {},
        add() {},
        update() {},
        delete() {},
    };
})();
```

- **react.bundle.js:**
    - This is the entrypoint to your React application, which should mount the application into the div with id “react-root”
    - The React application should leverage BASKET.API methods to make mock API calls to fetch, add, update, or delete from the fruits array
    - The UI itself should be rendered via React. You are welcome to structure the React application however you like