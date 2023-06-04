const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllJobs = async(req,res)=> {
    // res.send('All jobs endpoint')
    const job = await Job.find({createdBy: req.user.userId})
    res.status(200).json({job, count: job.length })
} 
const getJob = async(req,res) =>{
    // console.log(req.body)
    const {user:{userId,name},params: {id:jobId}} = req
    const job = await Job.findOne({
        _id:jobId,
        createdBy: userId
    })
    console.log(name)
    if(!job){
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(200).json({job})
}
const createJob = async(req,res) =>{
    // console.log(req.user)
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
    // res.status(200).json(req.user)
}
const deleteJob  = async(req,res) =>{
    // res.send('Delete job endpoint')
    const {
        user:{userId},
        params :{id:jobId},

    } = req
    const job = await Job.findByIdAndDelete(
        {_id:jobId, createdBy:userId}
    )
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
      }
    res.status(StatusCodes.OK).json({ job })
}
const updateJob  = async(req,res) =>{
    console.log("hi 123")
    const {
        body : { company , position },
        user: { userId },
        params : { id: jobId},
    } = req
    // const {
    //     body: { company, position },
    //     user: { userId },
    //     params: { id: jobId },
    //   } = req
    console.log(company)
    console.log(position)
    console.log(jobId)
    console.log(userId)
    if (company === '' || position === '') {
        throw new BadRequestError('Company or Position fields cannot be empty')
    }
    const job = await Job.findOneAndUpdate(
        { _id: jobId, createdBy: userId },
        req.body,
        { new: true, runValidators: true }
      )
      if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
      }
      res.status(StatusCodes.OK).json({ job })
}

module.exports ={ 
    getAllJobs,
    getJob,
    createJob,
    deleteJob,
    updateJob
}