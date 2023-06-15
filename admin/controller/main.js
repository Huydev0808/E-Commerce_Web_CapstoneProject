import Api from "../services/api.js";
import Product from "../model/product.js";

const api = new Api();


const getEle = (id) => document.getElementById(id);
//
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
                    <td><img src="${product.img}" width="30%" alt=""/></td>
                    <td>${product.desc}</td>
                    <td>${product.type === "Iphone" ? "Iphone" : "Samsung"}</td> 
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
const getPhoneInformation = () => {
    const id = getEle("phoneID").value;
    const phoneName = getEle("phoneName").value;
    const price = getEle("phonePrice").value;
    const screen = getEle("phoneScreen").value;
    const backCamera = getEle("backCam").value;
    const frontCamera = getEle("frontCam").value;
    //const img = getEle("phonePhoto").value;
    const type = getEle("typePhone").value;

    //phone Photo
    // let phonePhoto = "";
    // if (getEle("phonePhoto") && getEle("phonePhoto").files.length > 0) {
    //     phonePhoto = getEle("phonePhoto").files[0].name;
    // };
    const phonePhoto = getEle("phonePhoto").value;
    const desct = getEle("description").value;
    //tao doi tuong product tu Product
    var product = new Product(id, phoneName, price, screen, backCamera, frontCamera, type, phonePhoto, desct);

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
    var btnUpdate = `<button class='btn btn-success' onclick='updateProduct(${id})'>Update</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;

    api.callApi(`Product/${id}`, "GET", null)
        .then((result) => {
            const product = result.data;
            getEle("phoneID").value = product.id;
            getEle("phoneID").disabled = true;
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

//Update 
function updateProduct () {
    var product = getPhoneInformation();
    //console.log(product);
    api.callApi(`Product/${product.id}`, "PUT", product).then(()=> {
        getPhoneList();
        document.getElementsByClassName("close")[0].click();
    }).catch((err) => {
        console.log(err);
    })
};
window.updateProduct = updateProduct;

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
    getEle("phoneID").disabled = false;
    getEle("phoneID").value = "";
    getEle("phoneName").value = "";
    getEle("phonePrice").value = "";
    getEle("phoneScreen").value = "";
    getEle("backCam").value = "";
    getEle("frontCam").value = "";
    getEle("typePhone").value = "";
    getEle("phonePhoto").value = "";
    getEle("description").value = "";
    getEle("btnAdd").style.display = "inline-block";
};
//Add New Phone
getEle("btnAdd").onclick = function () {
    const product = getPhoneInformation();

    api.callApi("Product", "POST", product).then(()=> {
        getPhoneList();
        document.getElementsByClassName("closeModal")[0].click();
    }).catch((err) => {
        console.log(err);
    })
};
//Update Data
// getEle("btnUpdate").onclick = async function () {
//     const product = getPhoneList();
//     // const productDetail = await api.callApi(`Product/${product.id}`,"GET", null);
//     // if (!product.img) {
//     //     product.img = productDetail.data.img;
//     // }
//     const result = await api.callApi(`Product/${product.id}`,"PUT",product);
//     if (result.status === 200 && result.statusText === "OK"){
//         //success
//         // re-render Phone List
//         getPhoneList();
//         document.getElementsByClassName("closeModal")[0].click();
//     } else {
//         //error
//     }
// }; 
//Update 1
//Filter
getEle("selType").addEventListener("change",async () => {
    const value = getEle("selType").value;
    const result = await api.callApi("Product","GET",null);
    if(result.status === 200 && result.statusText ==="OK") {
        let findArray = result.data;
        if (value !== "all") {
            findArray = result.data.filter((product) => product.type === value);
        }
        renderProductList(findArray);
    }
});