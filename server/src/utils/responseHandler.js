export const responseHandler = (res, status, data) => {
    res.status(status).json({ success: true, data });
};