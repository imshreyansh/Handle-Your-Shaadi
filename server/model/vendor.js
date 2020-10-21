const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vendor = new Schema({
    crdential:{
        type:Schema.Types.ObjectId,
        ref:'CredentitalSchema'
    },
    store:[{
        storeName:{
            type:String
        },
        storePhotos:Object,
        storeDocument:Object,
        address:{
            state:{
                type:String
            },
            city:{
                type:String
            },
            address:{
                type:String
            }
        },
        storeMobile:{
            type:Number
        },
        typeOfStore:{
            type:Schema.Types.ObjectId,
            ref:'TypeOfStoreSchema'
        }
    }],

})

const VendorSchema = mongoose.model('VendorSchema',vendor)

exports.VendorSchema = VendorSchema