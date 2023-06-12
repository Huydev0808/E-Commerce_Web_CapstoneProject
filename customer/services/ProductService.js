function ProductService() {
  this.productListArray = [];
  this.getProductList = function () {
      return axios({
      method: "get",
      url: "https://64709e2d3de51400f7249ff6.mockapi.io/Product",
      });
  };

  this.addProduct = function (product) {
      return axios({
      method: "post",
      url: "https://64709e2d3de51400f7249ff6.mockapi.io/Product",
      data: product,
      });
  };

  this.updateProduct = function (product, id) {
      return axios({
      method: "put",
      url: `https://64709e2d3de51400f7249ff6.mockapi.io/Product/${id}`,
      data: product,
      });
  };

  this.deleteProduct = function (id) {
      return axios({
          method: "delete",
          url: `https://64709e2d3de51400f7249ff6.mockapi.io/Product/${id}`,
      });
  };

  this.getProductDetail = function (id) {
      return axios({
      method: "get",
      url: `https://64709e2d3de51400f7249ff6.mockapi.io/Product/${id}`,
      });
  };
}


