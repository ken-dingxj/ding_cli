'use strict'
const co = require('co')
const chalk = require('chalk')
const config = require('../templates')
const fs = require('fs')
const prompt = require('co-prompt')

module.exports=()=>{
    co(function *() {
        //分布接收用户输入的参数
        let tplName=yield prompt('Template name: ')
        let gitUrl = yield prompt('Git https link: ')
        let branch = yield prompt('Branch: ')

        //避免重复添加
        if(!config.tpl[tplName]){
            config.tpl[tplName] = {}
            config.tpl[tplName]['url'] = gitUrl.replace(/[\u0000-\u0019]/g, '') // 过滤unicode字符
            config.tpl[tplName]['branch'] = branch
        }else {
            console.log(chalk.red('Template has already existed!'))
            process.exit()
        }
        //把模板信息写入templates.json
        fs.writeFile(__dirname+'/../templates.json',JSON.stringify(config),"utf-8",(err)=>{
            if (err) console.log(err)
            console.log(chalk.green('New template added!\n'))
            console.log(chalk.grey('The last template list is: \n'))
            console.log(config)
            console.log('\n')
            process.exit()
        })
    })
}