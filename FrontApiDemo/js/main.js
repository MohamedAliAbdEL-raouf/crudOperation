
let productName = document.getElementById('productName')
let productPrice = document.getElementById('productPrice')
let productDesc = document.getElementById('productDesc')

let products = []

function getDataFromApi() {
  fetch('http://localhost:3001/allproducts')
    .then(response => response.json())
    .then(json => {
      products = json.user;
      showData()
      // console.log(json);
    })
}
getDataFromApi()
function showData() {
  let str = ``
  for (let index = 0; index < products.length; index++) {
    str += `
           <tr>
           <td>${products[index].name}</td>
           <td>${products[index].price}</td>
           <td>${products[index].description}</td>
           <td>
               <button onclick="deleteProduct(${products[index].id})" class="btn btn-danger">Delete</button>
               <button onclick="updateProduct(${index},${products[index].id})" class="btn btn-success">Update</button>
           </td>
       </tr>
           
           `
  }

  document.getElementById('tbody').innerHTML = str
}


function inputData() {
  let data = {
    name: productName.value,
    price: productPrice.value,
    description: productDesc.value
  }
  crudProduct('addproduct', 'POST', data)

}


function crudProduct(endPoint, method, data) {

  fetch(`http://localhost:3001/${endPoint}`, {

    // Adding method type
    method: method,

    // Adding body or contents to send
    body: JSON.stringify(data),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })

    // Converting to JSON
    .then(response => response.json())

    // Displaying results to console
    .then(obj => {
      if (obj.message == 'sucsess') {
        getDataFromApi()
      }
    });

}

function deleteProduct(id) {

  crudProduct('delete', 'DELETE', { id })


}

let productId

function updateProduct(index, id) {
  productId = id
  productName.value = products[index].name;
  productPrice.value = products[index].price;
  productDesc.value = products[index].description
  document.getElementById('update').style.display = 'block';
  document.getElementById('add').style.display = 'none';
}

function senUpdate() {
  let data = {
    id: productId,
    name: productName.value,
    price: productPrice.value,
    description: productDesc.value
  }
  crudProduct('update', 'PUT', data);

  document.getElementById('update').style.display = 'none';
  document.getElementById('add').style.display = 'block';
}
