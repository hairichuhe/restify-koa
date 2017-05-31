const koa = require("koa")
const Router = require("koa-router")
    // const redis = require("redis")
const routes = require("./routes")
const aes = require("./utils/aes/aes");
const str = require("./utils/str")
const app = new koa();

// var client = redis.createClient({
//     password: 'root'
// });

// client.on("error", function(err) {
//     console.log("Error :", err);
// });

// client.on('connect', function() {
//     console.log('Redis连接成功.');
// });

app.use(async(ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*")
    ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    ctx.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
    await next();
});

/**
 * 统一封装数据格式
 */
app.use(async(ctx, next) => {
    try {
        await next();
        if (ctx.status > 399) {
            ctx.status=ctx.status
            ctx.body = {
                meta: {
                    success: false,
                    code: ctx.status || 500,
                    message: ctx.message || "服务器错误，请联系管理员！"
                },
                data: null
            }
        } else {
            let data = { meta: { success: true, code: 0, message: "ok" }, data: ctx.body };
            ctx.body = data;
        }
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = {
            meta: {
                success: false,
                code: err.status || 500,
                message: err.message || "服务器错误，请联系管理员！"
            },
            data: null
        }
    }
});

var readToken = function(key) {
    return new Promise(function(resolve, reject) {
        client.get(key, function(error, data) {
            if (error) reject(error);
            resolve(data);
        });
    });
};

//中间件1
// app.use(async(ctx, next) => {
//     if (ctx.header.authorization) {
//         let key = "token_" + str.substr(JSON.stringify(aes.decrypt(ctx.header.authorization)), "id:", ",ip:");
//         let token = await readToken(key);
//         if (token == ctx.header.authorization) {
//             await next()
//         } else {
//             ctx.throw(500, "您无权访问，请登录！")
//         }
//     } else {
//         ctx.throw(500, "您无权访问，请登录！")
//     }
// });
let router = new Router()
router.use('/api', routes.routes(), routes.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)
