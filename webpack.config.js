var ET=require('extract-text-webpack-plugin');
module.exports={
	entry:__dirname+'/src/scripts/app.js',//定义入口文件
	output:{
		path:__dirname+'/prd',//打包后的文件存放的地方
		filename:'boudle.js'//打包后输出文件的文件名
	},
	devtool:"source-map",
	devServer: {
	    contentBase:__dirname+'/prd',//本地服务器所加载的页面所在的目录
	    port:'8081',
	    colors: true,//终端中输出结果为彩色
	    historyApiFallback:true,//不跳转
	    inline: true//实时刷新
  	},
	module:{
		loaders:[
			{
				test:/\.css$/,
				loader:'style!css'
			},
			{
				test:/\.js$/,
				loader:'babel'
			},
			{
				test:/\.scss$/,
				loader:ET.extract('style','css!sass')
			},
			{
				test:/\.string$/,
				loader:'string'
			}
		]
	},
	plugins:[
		new ET('boudle.css')
	]

}