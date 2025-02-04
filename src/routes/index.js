const users=require('./users')
const admin=require('./admin')

module.exports=app=>{
    app.use('/api/users',users),
    app.use('/api/admin',admin)
}
