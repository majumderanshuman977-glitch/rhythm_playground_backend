export const success = (res,message,data={})=>{
    return res.status(200).json({
        status:true,
        message,
        data
        })
}

export const error = (res, message, code , errors = null) => {
    return res.status(code).json({
        status: false,
        message,
        errors
    });
};