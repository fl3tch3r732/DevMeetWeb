const errorHandling = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 500,
        error: "Something went wrong",
        message: err.message,
    });
    }

export default errorHandling;