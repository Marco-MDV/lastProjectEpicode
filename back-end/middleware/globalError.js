const error = (err, req, res, next) =>{
    const status = err.status || 500
    const message = err.message || 'Something went wrong'
    res.status(status).json({
        error:{
            message:message,
            status:status
        }
    })
}

module.exports = error