const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vendor = new Schema({
    crdential:{
        type:Schema.Types.ObjectId,
        ref:'CredentitalSchema'
    },
    status:{
        type:String,
        default:'Active'
    },

    store:[{
        storeName:{
            type:String
        },
        storePhotos:Object,
        storeDocument:Array,
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
        },
        storeStatus:{
            type:String,
            default:'Inactive'
        }
    }],

})

const VendorSchema = mongoose.model('VendorSchema',vendor)

exports.VendorSchema = VendorSchema