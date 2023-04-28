const getAllJobs = async(req,res)=> {
    res.send('All jobs endpoint')
} 
const getJob = async(req,res) =>{
    res.send('Single job endpoint')
}
const createJob = async(req,res) =>{
    res.send('Craete job endpont ')
}
const deleteJob  = async(req,res) =>{
    res.send('Delete job endpoint')
}
const updateJob  = async(req,res) =>{
    res.send('Update job endpoint')
}

module.exports ={ 
    getAllJobs,
    getJob,
    createJob,
    deleteJob,
    updateJob
}