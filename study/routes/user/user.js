const Router = require("koa-router");
let page = new Router();

// 引用模型
var db = require('../../models');

module.exports = page;

page
    .post("/save", async(ctx) => {
        let result = await Promise.all([
            db.User.create({ username: 'itbilu', password: 'itbilu.com' }),
            db.Role.create({ roleName: '管理员' })
        ]);
        ctx.body=result
    })
    .get("/list", async(ctx) => {
        let user=await db.User.create({username:"test",password:"test"});
        let userCheckin = db.UserCheckin.build({loginIp:'127.0.0.1'});
        let result=await user.setUserCheckin(userCheckin);
        ctx.body=result
    })
    .get("/getone",async(ctx)=>{
        let user=await db.User.findOne({include:[db.UserCheckin]})
        ctx.body=user
    })
    .get("/address",async(ctx)=>{
        let user=await db.User.findOne();
        let result=await user.getAddress();
        ctx.body={user:user,addr:result};
    })
    .get("/update",async(ctx)=>{
        let user=await db.User.findOne({include:[db.UserCheckin]});
        let userCheckin=db.UserCheckin.build({userId:user.id,loginIp:"192.168.0.1"});
        let result=await user.setUserCheckin(userCheckin);
        ctx.body=result
    })
