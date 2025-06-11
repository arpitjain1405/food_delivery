
const adminsOnly = async(req, res, next) => {
    if(!req.user || req.user.role !== "admin") return res.status(403).send("Only for Admins")
    next();
} 

module.exports = adminsOnly;