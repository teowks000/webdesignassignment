// In the following line, you should include the prefixes of implementations you want to test.
window.indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
window.IDBTransaction = window.IDBTransaction ||
  window.webkitIDBTransaction ||
  window.msIDBTransaction || { READ_WRITE: "readwrite" }; // This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBKeyRange =
  window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

if (!window.indexedDB) {
  alert(
    "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."
  );
}

const request = window.indexedDB.open("funfood");

request.onerror = function (event) {
  console.log("No database found.");
};

const dishes = [
  { id: 1, name: "orange juice", price: 18.0 },
  { id: 2, name: "apple juice", price: 19.5 },
  { id: 3, name: "pineapple juice", price: 28.0 },
  { id: 4, name: "grape juice", price: 38.0 },
  { id: 5, name: "strawberry juice", price: 18.0 },
];

request.onsuccess = function (event) {
  console.log("You're ready to rock!");
};

request.onupgradeneeded = function (event) {
  const db = event.target.result;
  const transaction = event.target.transaction;
  const objectStore = db.createObjectStore("juices", { keyPath: "id" });
  const juiceObjectStore = transaction.objectStore("juices", "readwrite");

  juiceObjectStore.onsuccess = function (event) {
    console.log("Data loaded successfully!");
  };
  juiceObjectStore.onerror = function (event) {
    console.log("Failed to load data.");
  };

  console.log("loading...");

  objectStore.createIndex("name", "name", { unique: true });
  dishes.forEach((item) => juiceObjectStore.add(item));

  console.log("Boom! Let's run!");
};

// function getData(callback) {
//   request.onsuccess = function (event) {
//     const db = event.target.result;
//     const transaction = db.transaction("juices");
//     const objectStore = transaction.objectStore("juices");
//     let request = objectStore.getAll();
//     request.onerror = function (event) {
//       callback(false);
//     };
//     request.onsuccess = function (event) {
//       callback(request.result);
//     };
//   };
// }

function getData(ids) {
  return new Promise(function (res, rej) {
    const results = [];
    request.onsuccess = function (event) {
      const db = event.target.result;
      const objectStore = db.transaction("juices").objectStore("juices");
      ids.forEach((id) => {
        objectStore.get(id).onsuccess = function (e) {
          results.push(e.target.result);
          if (results.length === ids.length) {
            res(results);
          }
        };
      });
    };
  });
}