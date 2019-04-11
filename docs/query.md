### query
### 比较

> 要比较不同的BSON类型值，请参阅指定的BSON比较顺序。

|  名称    |   描述   |
| ---- | ---- |
|   $eq   |   匹配等于指定值的值   |
|    $gt  |    匹配大于指定值的值  |
|     $gte |   匹配大于或等于指定值的值   |
|   $in   |   匹配数组中指定的任何值   |
|    $lt  |    匹配小于指定值的值  |
|     $lte |   匹配小于或等于指定值的值   |
|    $ne  |    匹配所有不等于指定值的值  |
|     $nin |   不匹配数组中指定的任何值   |

### aggregate
#### $project
#### 筛选字段

```
{
  "_id" : 1,
  title: "abc123",
  isbn: "0001122223334",
  author: { last: "zzz", first: "aaa" },
  copies: 5,
  lastModified: "2016-07-28"
}

db.books.aggregate( [ { $project : { "author.first" : 0, "lastModified" : 0 } } ] )


db.bookmarks.aggregate( [ { $project: { "author": { "first": 0}, "lastModified" : 0 } } ] )

### result
{
   "_id" : 1,
   "title" : "abc123",
   "isbn" : "0001122223334",
   "author" : {
      "last" : "zzz"
   },
   "copies" : 5,
}

```

#### 有条件地排除字段¶

版本3.6中的新功能。

从MongoDB 3.6开始，您可以使用REMOVE聚合表达式中的变量来有条件地抑制字段。

考虑一个books包含以下文档的集合：
```
{
  "_id" : 1,
  title: "abc123",
  isbn: "0001122223334",
  author: { last: "zzz", first: "aaa" },
  copies: 5,
  lastModified: "2016-07-28"
}
{
  "_id" : 2,
  title: "Baked Goods",
  isbn: "9999999999999",
  author: { last: "xyz", first: "abc", middle: "" },
  copies: 2,
  lastModified: "2017-07-21"
}
{
  "_id" : 3,
  title: "Ice Cream Cakes",
  isbn: "8888888888888",
  author: { last: "xyz", first: "abc", middle: "mmm" },
  copies: 5,
  lastModified: "2017-07-22"
}
```