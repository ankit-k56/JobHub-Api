const mongoose = require('mongoose')

const JobsSchema = mongoose.Schema({
    company:{
        type:String,
        required:[true,'Provide company name'],
        maxlength:60
    },
    position:{
        type:String,
        required:[true,'Provide company position'],
        maxlength:60
    },
    status:{
        type:String,
        enum : ['interview', 'declined', 'pending'],
        default: 'pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref: 'User',
        required : [true, 'Provide User']
    },
   },
   {timestamps:true}
   )

module.exports = mongoose.model('Job', JobsSchema)
