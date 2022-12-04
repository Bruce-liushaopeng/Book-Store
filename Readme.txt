已经完成导入数据库，现在可以进行一些简单的选择数据，暂时没有测试更改数据，比如删除增加。
暂时不支持trigger， 因为还没有安装trigger。 
暂时express 不工作，没有设置url。 目前node js 和 postgre sql 链接。 剩下前端的东西，我可以以后改。

code 注意事项， 似乎express 处理 前端url 和 请求读取 postgre sql 都是 asynchronous，所以要注意 double callback 情况
如果不注意的话，似乎server 会进入 infinite loop， 然后进time out ---》server crash

目前的一些不足。数据库生成script 做不到drop database if exist. 因为没有第三方 JavaScript library 支持 drop database if exist，

目前只支持drop database。 所以现在的 数据库生成script 逻辑是 首先尝试建立连接目标database（我起名叫做bookstore），如果找不到database，
进行建立数据库然后再次尝试连接。 连接成功后开始自动删除 table（如果有的话），重新建立table，导入数据。

其他事项， 每次换设备你要需要更改configuration object 和 client object 里面 password property。 原因是需要你本地 postgre sql 的管理登录密码来建立连接，所以要给改作业的ta
说记得去哪一行改密码。
然后我暂时还没想到怎么处理没有本地密码。因为好像有的人 设置 本地 postgre sql 不需要管理登录密码。

如何启动：
1. 在文件夹目录里，npm install
2. node database-initializer.js
3. node server.js
