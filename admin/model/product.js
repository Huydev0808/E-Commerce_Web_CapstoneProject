export default class Product {
    constructor (
        _id, _name, _price, _screen, _backCam, _frontCam, _img, _desc, _typePhone) 
    {
        this.id = _id;
        this.name = _name;
        this.price = _price;
        this.screen = _screen;
        this.backCamera = _backCam;
        this.frontCamera = _frontCam;
        this.img = _img;
        this.desc = _desc;
        this.type = _typePhone;
    }
};
