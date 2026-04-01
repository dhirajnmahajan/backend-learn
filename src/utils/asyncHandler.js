// this asyncHandler (promise based)- utility function to handle the async task
const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .reject((error) => next(error))
    }
}

export default asyncHandler;



// this asyncHandler (using try catch) - a utility function to handle the async tasks 
/*
const asynHandler = (func) => async (req, res, next) => {
    try {
        await func(req, res, next)
    } catch (error) {
        res
            .status(error.code || 500)
            .json({
                success: false,
                message: error.message
            })
    }
}
    */