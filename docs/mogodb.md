## 前言：

mongo -version // 看到当前mongoDB版本

sudo service mongod start // 启动MongoDB
sudo service mongod restart # 重启
sudo service mongod stop // 关闭

配置文件mongod.conf所在路径:/etc/mongod.conf
mongodb的log:/var/log/mongodb/mongod.log 



查看mongosedb的状态：systemctl status mongod.service


对mongoDB Server的管理
 sudo systemctl enable mongod // 永久启动，添加为在启动时启动的服务
 sudo systemctl start mongod  // 启动MongoDB


ubuntu18.04 安装 mongodb：https://blog.csdn.net/weixin_42544006/article/details/84874353
Ubuntu16.04下mongodb的安装、用户配置、远程连接:https://blog.csdn.net/feiyu_may/article/details/82885247






数据交互
mongo


### 一.MongoDB 创建数据库

1.创建数据库
use 数据库名称 // use runoob


2.查看当前所在的数据库
db


3.查看所有的数据库
show dbs


4.刚创建的数据库 runoob 并不在数据库的列表中， 要显示它，我们需要向 runoob 数据库插入一些数据
db.runoob.insert({"name":"菜鸟教程"}) // 创建了一张名为runoot的集合表


5.MongoDB 中默认的数据库为 test，如果你没有创建新的数据库，集合将存放在 test 数据库中

6.注意: 在 MongoDB 中，集合只有在内容插入后才会创建! 就是说，创建集合(数据表)后要再插入一个文档(记录)，集合才会真正创建。



### 二.MongoDB 删除数据库

1.删除当前数据库，默认为 test，你可以使用 db 命令查看当前数据库名
db.dropDatabase() // 最后，我们再通过 show dbs 命令数据库是否删除成功


2.删除集合
db.collection.drop() // 如果成功删除选定集合，则 drop() 方法返回 true，否则返回 false


show tables // 查看当前数据库的集合
db.site.drop() // 删除sit集合



### 三.MongoDB 创建集合

1.创建集合
db.createCollection(name, options)


name: 要创建的集合名称
options: 可选参数, 指定有关内存大小及索引的选项


capped：布尔	（可选）如果为 true，则创建固定集合。固定集合是指有着固定大小的集合，当达到最大值时，它会自动覆盖最早的文档。当该值为 true 时，必须指定 size 参数。
autoIndexId：布尔（可选）如为 true，自动在 _id 字段创建索引。默认为 false。
size：数值	（可选）为固定集合指定一个最大值（以字节计）如果 capped 为 true，也需要指定该字段。
max：数值	（可选）指定固定集合中包含文档的最大数量。

2.查看已有的集合
show collections


3.注意：在 MongoDB 中，你不需要创建集合。当你插入一些文档时，MongoDB 会自动创建集合




### 四.MongoDB 插入文档

1.MongoDB 使用 insert() 或 save() 方法向集合中插入文档, 如果该集合不在该数据库中， MongoDB 会自动创建该集合并插入文档
db.COLLECTION_NAME.insert(document) // db.runoob.insert({"name":"菜鸟教程"})


2.插入文档你也可以使用 db.col.save(document) 命令。如果不指定 _id 字段 save() 方法类似于 insert() 方法。如果指定 _id 字段，则会更新该 _id 的数据




### 五.MongoDB 更新文档
// MongoDB 使用 update() 和 save() 方法来更新集合中的文档

1.update() 方法用于更新已存在的文档
```
db.collection.update(
   <query>,
   <update>,
   {
     upsert: <boolean>,
     multi: <boolean>,
     writeConcern: <document>
   }
)
```

query : update的查询条件，类似sql update查询内where后面的。
update : update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的
upsert : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
multi : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
writeConcern :可选，抛出异常的级别。


示例：
```
1.在集合 col 中插入如下数据
db.col.insert({
    title: 'MongoDB 教程', 
    description: 'MongoDB 是一个 Nosql 数据库',
    by: '菜鸟教程',
    url: 'http://www.runoob.com',
    tags: ['mongodb', 'database', 'NoSQL'],
    likes: 100
})

2.通过 update() 方法来更新标题(title):

db.col.update({'title':'MongoDB 教程'},{$set:{'title':'MongoDB'}})

WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })   # 输出信息

db.col.find().pretty()

{
        "_id" : ObjectId("56064f89ade2f21f36b03136"),
        "title" : "MongoDB",
        "description" : "MongoDB 是一个 Nosql 数据库",
        "by" : "菜鸟教程",
        "url" : "http://www.runoob.com",
        "tags" : [
                "mongodb",
                "database",
                "NoSQL"
        ],
        "likes" : 100
}


3.以上语句只会修改第一条发现的文档，如果你要修改多条相同的文档，则需要设置 multi 参数为 true
db.col.update({'title':'MongoDB 教程'},{$set:{'title':'MongoDB'}},{multi:true})
```



### 2.save() 方法通过传入的文档来替换已有文档
```
db.collection.save(
   <document>,
   {
     writeConcern: <document>
   }
)

document : 文档数据。
writeConcern :可选，抛出异常的级别。
```

```
示例：
1.实例中我们替换了 _id 为 56064f89ade2f21f36b03136 的文档数据
db.col.save({
    "_id" : ObjectId("56064f89ade2f21f36b03136"),
    "title" : "MongoDB",
    "description" : "MongoDB 是一个 Nosql 数据库",
    "by" : "Runoob",
    "url" : "http://www.runoob.com",
    "tags" : [
            "mongodb",
            "NoSQL"
    ],
    "likes" : 110
})


2.替换成功后，我们可以通过 find() 命令来查看替换后的数据
db.col.find().pretty()
{
        "_id" : ObjectId("56064f89ade2f21f36b03136"),
        "title" : "MongoDB",
        "description" : "MongoDB 是一个 Nosql 数据库",
        "by" : "Runoob",
        "url" : "http://www.runoob.com",
        "tags" : [
                "mongodb",
                "NoSQL"
        ],
        "likes" : 110
}


3.更多实例
只更新第一条记录：

db.col.update( { "count" : { $gt : 1 } } , { $set : { "test2" : "OK"} } );
全部更新：

db.col.update( { "count" : { $gt : 3 } } , { $set : { "test2" : "OK"} },false,true );
只添加第一条：

db.col.update( { "count" : { $gt : 4 } } , { $set : { "test5" : "OK"} },true,false );
全部添加进去:

db.col.update( { "count" : { $gt : 5 } } , { $set : { "test5" : "OK"} },true,true );
全部更新：

db.col.update( { "count" : { $gt : 15 } } , { $inc : { "count" : 1} },false,true );
只更新第一条记录：

db.col.update( { "count" : { $gt : 10 } } , { $inc : { "count" : 1} },false,false );

```




### 六.MongoDB 删除文档

1.MongoDB remove()函数是用来移除集合中的数据， 在执行remove()函数前先执行find()命令来判断执行的条件是否正确，这是一个比较好的习惯

```
db.collection.remove(
   <query>,
   {
     justOne: <boolean>,
     writeConcern: <document>
   }
)
```
query :（可选）删除的文档的条件。
justOne : （可选）如果设为 true 或 1，则只删除一个文档，如果不设置该参数，或使用默认值 false，则删除所有匹配条件的文档。
writeConcern :（可选）抛出异常的级别。

示例：
db.col.remove({'title':'MongoDB 教程'})

WriteResult({ "nRemoved" : 2 })           # 删除了两条数据

db.col.find()


2.如果你只想删除第一条找到的记录可以设置 justOne 为 1
db.COLLECTION_NAME.remove(DELETION_CRITERIA,1)

3.如果你想删除所有数据，可以使用以下方式（类似常规 SQL 的 truncate 命令）
db.col.remove({})
db.col.find()


4.更新的方法！！！！！！！！！！！！！
如删除集合下全部文档：

db.inventory.deleteMany({})
删除 status 等于 A 的全部文档：

db.inventory.deleteMany({ status : "A" })
删除 status 等于 D 的一个文档：

db.inventory.deleteOne( { status: "D" } )


remove() 方法 并不会真正释放空间。

需要继续执行 db.repairDatabase() 来回收磁盘空间。

db.repairDatabase()
或者
db.runCommand({ repairDatabase: 1 })





### 七.MongoDB 查询文档

1.find() 方法以非结构化的方式来显示所有文档

db.collection.find(query, projection)
query ：可选，使用查询操作符指定查询条件
projection ：可选，使用投影操作符指定返回的键。查询时返回文档中所有键值， 只需省略该参数即可（默认省略）

2.pretty() 方法以格式化的方式来显示所有文档
db.col.find().pretty()


3.除了 find() 方法之外，还有一个 findOne() 方法，它只返回一个文档


4.MongoDB 与 RDBMS Where 语句比较
等于	{<key>:<value>}	db.col.find({"by":"菜鸟教程"}).pretty()	where by = '菜鸟教程'
小于	{<key>:{$lt:<value>}}	db.col.find({"likes":{$lt:50}}).pretty()	where likes < 50
小于或等于	{<key>:{$lte:<value>}}	db.col.find({"likes":{$lte:50}}).pretty()	where likes <= 50
大于	{<key>:{$gt:<value>}}	db.col.find({"likes":{$gt:50}}).pretty()	where likes > 50
大于或等于	{<key>:{$gte:<value>}}	db.col.find({"likes":{$gte:50}}).pretty()	where likes >= 50
不等于	{<key>:{$ne:<value>}}	db.col.find({"likes":{$ne:50}}).pretty()	where likes != 50



5.MongoDB AND 条件
// 类似于 WHERE 语句：WHERE by='菜鸟教程' AND title='MongoDB 教程'
MongoDB 的 find() 方法可以传入多个键(key)，每个键(key)以逗号隔开，即常规 SQL 的 AND 条
db.col.find({key1:value1, key2:value2}).pretty()



6.MongoDB OR 条件
MongoDB OR 条件语句使用了关键字 $or
```
db.col.find(
   {
      $or: [
         {key1: value1}, {key2:value2}
      ]
   }
).pretty()
```

7.AND 和 OR 联合使用
// 类似常规 SQL 语句为： 'where likes>50 AND (by = '菜鸟教程' OR title = 'MongoDB 教程')'
db.col.find({"likes": {$gt:50}, $or: [{"by": "菜鸟教程"},{"title": "MongoDB 教程"}]}).pretty()




### 八.MongoDB 条件操作符
// 条件操作符用于比较两个表达式并从mongoDB集合中获取数据

1.MongoDB (>) 大于操作符 - $gt

// 如果你想获取 "col" 集合中 "likes" 大于 100 的数据，你可以使用以下命令
db.col.find({likes : {$gt : 100}})
// 类似于SQL语句：
Select * from col where likes > 100;



2.MongoDB（>=）大于等于操作符 - $gte
// 如果你想获取"col"集合中 "likes" 大于等于 100 的数据，你可以使用以下命令：

db.col.find({likes : {$gte : 100}})
// 类似于SQL语句：

Select * from col where likes >=100;


3.MongoDB (<) 小于操作符 - $lt
// 如果你想获取"col"集合中 "likes" 小于 150 的数据，你可以使用以下命令：

db.col.find({likes : {$lt : 150}})
// 类似于SQL语句：

Select * from col where likes < 150;


4.MongoDB (<=) 小于操作符 - $lte

//如果你想获取"col"集合中 "likes" 小于等于 150 的数据，你可以使用以下命令：

db.col.find({likes : {$lte : 150}})
// 类似于SQL语句：

Select * from col where likes <= 150;


5.MongoDB 使用 (<) 和 (>) 查询 - $lt 和 $gt
//如果你想获取"col"集合中 "likes" 大于100，小于 200 的数据，你可以使用以下命令：

db.col.find({likes : {$lt :200, $gt : 100}})
//类似于SQL语句：

Select * from col where likes>100 AND  likes<200;


6.简写
$gt -------- greater than  >

$gte --------- gt equal  >=

$lt -------- less than  <

$lte --------- lt equal  <=

$ne ----------- not equal  !=

$eq  --------  equal  =


7.模糊搜索
查询 title 包含"教"字的文档：

db.col.find({title:/教/})
查询 title 字段以"教"字开头的文档：

db.col.find({title:/^教/})
查询 titl e字段以"教"字结尾的文档：

db.col.find({title:/教$/})





### 九.MongoDB $type 操作符
$type操作符是基于BSON类型来检索集合中匹配的数据类型
MongoDB 中可以使用的类型

类型	数字
Double	1	 
String	2	 
Object	3	 
Array	4	 
Binary data	5	 
Object id	7	 
Boolean	8	 
Date	9	 
Null	10	 
Regular Expression	11	 
JavaScript	13	 
Symbol	14	 
JavaScript (with scope)	15	 
32-bit integer	16	 
Timestamp	17	 
64-bit integer	18	 
Min key	255	Query with -1.
Max key	127


1.MongoDB 操作符 - $type 实例
如果想获取 "col" 集合中 title 为 String 的数据，你可以使用以下命令
db.col.find({"title" : {$type : 2}})
或
db.col.find({"title" : {$type : 'string'}})






### 十.MongoDB Limit与Skip方法

1.MongoDB Limit() 方法
如果你需要在MongoDB中读取指定数量的数据记录，可以使用MongoDB的Limit方法，limit()方法接受一个数字参数，该参数指定从MongoDB中读取的记录条数。


db.COLLECTION_NAME.find().limit(NUMBER)

// db.col.find({},{"title":1,_id:0}).limit(2)
// 如果你们没有指定limit()方法中的参数则显示集合中的所有数据


2.MongoDB Skip() 方法
我们除了可以使用limit()方法来读取指定数量的数据外，还可以使用skip()方法来跳过指定数量的数据，skip方法同样接受一个数字参数作为跳过的记录条数

db.COLLECTION_NAME.find().limit(NUMBER).skip(NUMBER)

// 以下实例只会显示第二条文档数据,skip()方法默认参数为 0 
// db.col.find({},{"title":1,_id:0}).limit(1).skip(1)





### 十一.MongoDB 排序

1.MongoDB sort() 方法，在 MongoDB 中使用 sort() 方法对数据进行排序，sort() 方法可以通过参数指定排序的字段，并使用 1 和 -1 来指定排序的方式，其中 1 为升序排列，而 -1 是用于降序排列

db.COLLECTION_NAME.find().sort({KEY:1})


！！！！skip(), limilt(), sort()三个放在一起执行的时候，执行的顺序是先 sort(), 然后是 skip()，最后是显示的 limit()。





### 十二.MongoDB 索引
索引通常能够极大的提高查询的效率，如果没有索引，MongoDB在读取数据时必须扫描集合中的每个文件并选取那些符合查询条件的记录。

这种扫描全集合的查询效率是非常低的，特别在处理大量的数据时，查询可以要花费几十秒甚至几分钟，这对网站的性能是非常致命的。

索引是特殊的数据结构，索引存储在一个易于遍历读取的数据集合中，索引是对数据库表中一列或多列的值进行排序的一种结构


1.createIndex() 方法，createIndex()方法基本语法格式如下所示
db.collection.createIndex(keys, options)
语法中 Key 值为你要创建的索引字段，1 为指定按升序创建索引，如果你想按降序来创建索引指定为 -1 
db.col.createIndex({"title":1})



background	Boolean	建索引过程会阻塞其它数据库操作，background可指定以后台方式创建索引，即增加 "background" 可选参数。 "background" 默认值为false。
unique	Boolean	建立的索引是否唯一。指定为true创建唯一索引。默认值为false.
name	string	索引的名称。如果未指定，MongoDB的通过连接索引的字段名和排序顺序生成一个索引名称。
dropDups	Boolean	3.0+版本已废弃。在建立唯一索引时是否删除重复记录,指定 true 创建唯一索引。默认值为 false.
sparse	Boolean	对文档中不存在的字段数据不启用索引；这个参数需要特别注意，如果设置为true的话，在索引字段中不会查询出不包含对应字段的文档.。默认值为 false.
expireAfterSeconds	integer	指定一个以秒为单位的数值，完成 TTL设定，设定集合的生存时间。
v	index version	索引的版本号。默认的索引版本取决于mongod创建索引时运行的版本。
weights	document	索引权重值，数值在 1 到 99,999 之间，表示该索引相对于其他索引字段的得分权重。
default_language	string	对于文本索引，该参数决定了停用词及词干和词器的规则的列表。 默认为英语
language_override	string	对于文本索引，该参数指定了包含在文档中的字段名，语言覆盖默认的language，默认值为 language.


在后台创建索引：
db.values.createIndex({open: 1, close: 1}, {background: true})


2.笔记
```
1、查看集合索引

db.col.getIndexes()
2、查看集合索引大小

db.col.totalIndexSize()
3、删除集合所有索引

db.col.dropIndexes()
4、删除集合指定索引

db.col.dropIndex("索引名称")

```





### 十三.MongoDB 聚合
MongoDB中聚合(aggregate)主要用于处理数据(诸如统计平均值,求和等)，并返回计算后的数据结果。有点类似sql语句中的 count(*)
1.aggregate() 方法
db.COLLECTION_NAME.aggregate(AGGREGATE_OPERATION)
```
示例：
集合计算每个作者所写的文章数，使用aggregate()计算结果如下
通过字段 by_user 字段对数据进行分组，并计算 by_user 字段相同值的总和
db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : 1}}}])


实例类似sql语句：select by_user, count(*) from mycol group by by_user

{
   "result" : [
      {
         "_id" : "runoob.com",
         "num_tutorial" : 2
      },
      {
         "_id" : "Neo4j",
         "num_tutorial" : 1
      }
   ],
   "ok" : 1
}
```

表达式	描述	实例
$sum	计算总和。	db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : "$likes"}}}])
$avg	计算平均值	db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$avg : "$likes"}}}])
$min	获取集合中所有文档对应值得最小值。	db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$min : "$likes"}}}])
$max	获取集合中所有文档对应值得最大值。	db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$max : "$likes"}}}])
$push	在结果文档中插入值到一个数组中。	db.mycol.aggregate([{$group : {_id : "$by_user", url : {$push: "$url"}}}])
$addToSet	在结果文档中插入值到一个数组中，但不创建副本。	db.mycol.aggregate([{$group : {_id : "$by_user", url : {$addToSet : "$url"}}}])
$first	根据资源文档的排序获取第一个文档数据。	db.mycol.aggregate([{$group : {_id : "$by_user", first_url : {$first : "$url"}}}])
$last	根据资源文档的排序获取最后一个文档数据	db.mycol.aggregate([{$group : {_id : "$by_user", last_url : {$last : "$url"}}}])



2.管道的概念
$project：修改输入文档的结构。可以用来重命名、增加或删除域，也可以用于创建计算结果以及嵌套文档。
$match：用于过滤数据，只输出符合条件的文档。$match使用MongoDB的标准查询操作。
$limit：用来限制MongoDB聚合管道返回的文档数。
$skip：在聚合管道中跳过指定数量的文档，并返回余下的文档。
$unwind：将文档中的某一个数组类型字段拆分成多条，每条包含数组中的一个值。
$group：将集合中的文档分组，可用于统计结果。
$sort：将输入文档排序后输出。
$geoNear：输出接近某一地理位置的有序文档。



管道操作符实例
1、$project实例
```
db.article.aggregate(
    { $project : {
        title : 1 ,
        author : 1 ,
    }}
 );
 ```

这样的话结果中就只还有_id,tilte和author三个字段了，默认情况下_id字段是被包含的，如果要想不包含_id话可以这样:
```
db.article.aggregate(
    { $project : {
        _id : 0 ,
        title : 1 ,
        author : 1
    }});
```

2.$match实例

db.articles.aggregate( [
                        { $match : { score : { $gt : 70, $lte : 90 } } },
                        { $group: { _id: null, count: { $sum: 1 } } }
                       ] );
$match用于获取分数大于70小于或等于90记录，然后将符合条件的记录送到下一阶段$group管道操作符进行处理。

3.$skip实例

db.article.aggregate(
    { $skip : 5 });
经过$skip管道操作符处理后，前五个文档被"过滤"掉


- [MongoDB 聚合](https://www.cnblogs.com/shaosks/p/5760819.html)



### 十四.MongoDB 备份(mongodump)与恢复(mongorestore)


1.MongoDB数据备份

mongoimport -d library -c books ./db.json  # Import the DB, makes sure mongod is running


在Mongodb中我们使用mongodump命令来备份MongoDB数据。该命令可以导出所有数据到指定目录中。mongodump命令可以通过参数指定导出的数据量级转存的服务器

mongodump -h dbhost -d dbname -o dbdirectory

-h：MongDB所在服务器地址，例如：127.0.0.1，当然也可以指定端口号：127.0.0.1:27017

-d：需要备份的数据库实例，例如：test

-o：备份的数据存放位置，例如：c:\data\dump，当然该目录需要提前建立，在备份完成后，系统自动在dump目录下建立一个test目录，这个目录里面存放该数据库实例的备份数据。


2.MongoDB数据恢复
```
mongorestore -h <hostname><:port> -d dbname <path>

--host <:port>, -h <:port>：MongoDB所在服务器地址，默认为： localhost:27017

--db , -d ：需要恢复的数据库实例，例如：test，当然这个名称也可以和备份时候的不一样，比如test2

--drop：恢复的时候，先删除当前数据，然后恢复备份的数据。就是说，恢复后，备份后添加修改的数据都会被删除，慎用哦！

<path>：
mongorestore 最后的一个参数，设置备份数据所在位置，例如：c:\data\dump\test。你不能同时指定 <path> 和 --dir 选项，--dir也可以设置备份目录。

--dir：指定备份的目录你不能同时指定 <path> 和 --dir 选项。
```

[ubuntu系统下MongoDB 备份与恢复](https://blog.csdn.net/niubiqigai/article/details/84001948)
[Mongo的导出和导入（mongoexport和mongoimport](https://blog.csdn.net/tiantang_1986/article/details/82185307)






