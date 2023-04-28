const  mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type: string,
        required: [true, 'Please provide a name'],
        minlength: 3,
        maxlength: 30
    },
    name:{
        type: string,
        required: [true, 'Please provide a name'],
        match :[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide valid email'
        ],
        unique:true
    },
    password:{
        type:string,
        required: [true, 'Please provide password']
    }

})