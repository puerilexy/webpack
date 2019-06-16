module.exports = {
    dev: {
        mode: 'development',
        port: 3000,
        host: 'localhost',
        devServer: {
            before(app){
                app.get('/api/getList',(req,res) => {
                    res.end(JSON.stringify({code: 1,data: 'success'}))
                })
            },
            proxy: {
                '/classify': 'http://localhost:3000'
            }
        },
        devtool: 'cheap-module-eval-source-map'
    },
    prod: {
        
    }
}