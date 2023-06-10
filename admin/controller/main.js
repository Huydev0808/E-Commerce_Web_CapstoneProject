import Api from "../services/api.js";
import Product from "../model/product.js";

const api = new Api();


const getEle = (id) => document.getElementById(id);

const renderProductList = (data) => {
    let content = "";
    if (data && data.length > 0) {
        data.forEach((product) => {
            content += `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.price} $</td>
                    <td>${product.screen}</td>
                    <td>${product.backCamera}</td>
                    <td>${product.frontCamera}</td>
                    <td>${product.img}</td>
                    <td>${product.desc}</td>
                    <td>${product.typePhone === "type1" ? "Iphone" : "Samsung"}</td>
                    <td>          
                        <button class="btn btn-warning" data-toggle="modal" data-target="#exampleModal" onclick="editData(${product.id})">Edit</button>      
                        <button class="btn btn-danger" onclick="deleteData(${product.id})">Delete</button>      
                    </td>
                </tr>`;
        });
        //Dom tới Tbody
        getEle("tbodyProduct").innerHTML = content;
    }
};
var getPhoneInformation = function (id) {
    var phoneName = getEle("phoneName").value;
    var price = getEle("phonePrice").value;
    var screen = getEle("phoneScreen").value;
    var backCam = getEle("backCam").value;
    var frontCam = getEle("frontCam").value;
    var img = getEle("phonePhoto").value;
    var desc = getEle("description").value;
    var type = getEle("typePhone").value;

    //tao doi tuong product tu Product
    var product = new Product(id, phoneName, price, screen, backCam, frontCam, img, desc, typePhone);

    return product;
};
//Get list Product Phone 
const getPhoneList = () => {
    api.callApi("Product", "GET", null)
        .then((result) => {
            renderProductList(result.data);
        })
        .catch((error) => {
            console.log(error);
        });
};
getPhoneList();
//Edit Data 
const editData = (id) => {
    getEle("exampleModalLabel").innerHTML = "Edit Product";
    getEle("btnAdd").style.display = "none";

    api.callApi(`Product/${id}`, "GET", null)
        .then((result) => {
            const product = result.data;
            getEle("phoneID").value = product.id;
            getEle("phoneID").disabled  = true;
            getEle("phoneName").value = product.name;
            getEle("phonePrice").value = product.price;
            getEle("phoneScreen").value = product.screen;
            getEle("backCam").value = product.backCamera;
            getEle("frontCam").value = product.frontCamera;
            getEle("typePhone").value = product.type;
            getEle("phonePhoto").value = product.img;
            getEle("description").value = product.desc;
        })
        .catch((err) => {
            console.log(err);
        })
};
window.editData = editData;
//Delete Data
const deleteData = (id) => {
    api.callApi(`Product/${id}`, "DELETE", null)
        .then(() => {
            getPhoneList();
        })
        .catch((err) => {
            console.log(err);
        })
};
window.deleteData = deleteData;
//Add new data
getEle("btnAddModal").onclick = function () {
    getEle("exampleModalLabel").innerHTML = "Create New Phone";
    getEle("phoneID").value = "";
    getEle("phoneName").value = "";
    getEle("phonePrice").value = "";
    getEle("phoneScreen").value = "";
    getEle("backCam").value = "";
    getEle("frontCam").value = "";
    getEle("typePhone").value = "";
    getEle("phonePhoto").value = "";
    getEle("description").value = "";
};