let renderProductList = function (productArr) {
    console.log("productArr ", productArr);
    let contentHTML = "";
    for (let i = 0; i < productArr.length; i++){
        let product = productArr[i];
        contentHTML += `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.screen}</td>
            <td>${product.backCamera}</td>
            <td>${product.frontCamera}</td>
            <td>${product.img}</td>
            <td>${product.desc}</td>
            <td>${product.type}</td>
        </tr>`;
    }
    //Dom tới Tbody
    document.getElementById("tbodyProduct").innerHTML = contentHTML;
};