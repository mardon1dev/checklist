const food = [
    {
        id: "1",
        name: "Pizza",
        ingredients: ["cheese", "topping"],
        price: 681,
    },
    {
        id: "2",
        name: "Pasta",
        ingredients: ["cheese", "topping"],
        price: 325
    },
    {
        id: "3",
        name: "Rice",
        ingredients: ["garlic", "topping"],
        price: 400
    }
];

const request = window.indexedDB.open("foods", 1);

request.onupgradeneeded = (event) => {
    const db = event.target.result;
    const objectStore = db.createObjectStore('food', { keyPath: 'id' });
    objectStore.createIndex('name', 'name', { unique: true });
    objectStore.createIndex('ingredients', 'ingredients', { unique: false });
    objectStore.createIndex('price', 'price', { unique: false });
};

request.onsuccess = (event) => {
    const db = event.target.result;
    
    // Create a transaction
    const transaction = db.transaction(['food'], 'readwrite');
    // transaction.oncomplete = (event) => {
    //     console.log("Transaction completed.");
    //     db.close();
    // };
    // transaction.onerror = (event) => {
    //     console.error("Transaction error:", event.target.error);
    // };
    
    // Open the object store
    const objectStore = transaction.objectStore('food');

    // Add new data to the object store
    food.forEach(item => objectStore.add(item));
    
    // Retrieve data from the object store
    const getRequest = objectStore.get(1);
    getRequest.onsuccess = (event) => {
        const data = event.target.result;
        console.log(data);
    };


};

// Handle errors
request.onerror = (event) => {
    console.error('Database error:', event.target.error);
};

// // Handle errors
// request.onerror = (event) => {
//     console.error('Database error:', event.target.error);
// };

// function createRecord(data) {
//     const transaction = db.transaction(['myObjectStore'], 'readwrite');
//     const objectStore = transaction.objectStore('myObjectStore');
    
//     // Add data to the object store
//     const request = objectStore.add(data);
    
//     // Handle successful addition
//     request.onsuccess = () => {
//         console.log('Record added successfully');
//     };
    
//     // Handle errors
//     request.onerror = (event) => {
//         console.error('Error adding record:', event.target.error);
//     };
// }

// function readRecord(key) {
//     const transaction = db.transaction(['myObjectStore'], 'readonly');
//     const objectStore = transaction.objectStore('myObjectStore');
    
//     // Retrieve data from the object store
//     const request = objectStore.get(key);
    
//     // Handle successful retrieval
//     request.onsuccess = (event) => {
//         const data = event.target.result;
//         console.log('Record:', data);
//     };
    
//     // Handle errors
//     request.onerror = (event) => {
//         console.error('Error reading record:', event.target.error);
//     };
// }

// function updateRecord(key, newData) {
//     const transaction = db.transaction(['myObjectStore'], 'readwrite');
//     const objectStore = transaction.objectStore('myObjectStore');
    
//     // Update data in the object store
//     const getRequest = objectStore.get(key);
    
//     getRequest.onsuccess = (event) => {
//         const data = event.target.result;
        
//         // Update properties
//         for (const prop in newData) {
//             if (newData.hasOwnProperty(prop)) {
//                 data[prop] = newData[prop];
//             }
//         }
        
//         // Put updated data back into the object store
//         const request = objectStore.put(data, key);
        
//         // Handle successful update
//         request.onsuccess = () => {
//             console.log('Record updated successfully');
//         };
        
//         // Handle errors
//         request.onerror = (event) => {
//             console.error('Error updating record:', event.target.error);
//         };
//     };
    
//     // Handle errors
//     getRequest.onerror = (event) => {
//         console.error('Error reading record:', event.target.error);
//     };
// }

// function deleteRecord(key) {
//     const transaction = db.transaction(['myObjectStore'], 'readwrite');
//     const objectStore = transaction.objectStore('myObjectStore');
    
//     // Delete data from the object store
//     const request = objectStore.delete(key);
    
//     // Handle successful deletion
//     request.onsuccess = () => {
//         console.log('Record deleted successfully');
//     };
    
//     // Handle errors
//     request.onerror = (event) => {
//         console.error('Error deleting record:', event.target.error);
//     };
// }
