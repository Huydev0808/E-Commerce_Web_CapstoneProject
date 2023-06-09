/**
 * Promise: có 3 trạng thái
 * 1) Pending
 * 2) Resolve (success)
 * 3) reject (error)
 * API cũng có 3 trạng thái
 * thuộc tính url và method luôn có mặc định
 * Khi làm việc với API, mọi thứ liên quan đến Data server đều để trong then()
 * Chức năng nên để trong controller      
 */
//Render danh sach sản phẩm từ Servcer
axios ({
    url: "https://64709e2d3de51400f7249ff6.mockapi.io/Product",
    method: "GET",
})
.then(function (res) {
    renderProductList(res.data);
})
.catch(function (err) {
    console.log("error ", err);
});
