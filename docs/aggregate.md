## `db.collection.aggregate()`

除了[`$out`](https://docs.mongodb.com/manual/reference/operator/aggregation/out/#pipe._S_out)和[`$geoNear`](https://docs.mongodb.com/manual/reference/operator/aggregation/geoNear/#pipe._S_geoNear)阶段之外的所有内容都可以在管道中多次出现

```
db 。集合。aggregate （ [  {  < stage >  }， ...  ]  ）
```



| 阶段                                                         | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$addFields`](https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/#pipe._S_addFields) | 向文档添加新字段。类似于 [`$project`](https://docs.mongodb.com/manual/reference/operator/aggregation/project/#pipe._S_project)，[`$addFields`](https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/#pipe._S_addFields)重塑流中的每个文档; 具体而言，通过向输出文档添加新字段，该文档包含输入文档和新添加字段中的现有字段。 |
| [`$bucket`](https://docs.mongodb.com/manual/reference/operator/aggregation/bucket/#pipe._S_bucket) | 根据指定的表达式和存储区边界，将传入的文档分组，称为存储桶。 |
| [`$bucketAuto`](https://docs.mongodb.com/manual/reference/operator/aggregation/bucketAuto/#pipe._S_bucketAuto) | 根据指定的表达式将传入的文档分类为特定数量的组（称为存储桶）。自动确定存储桶边界，以尝试将文档均匀地分配到指定数量的存储桶中。 |
| [`$collStats`](https://docs.mongodb.com/manual/reference/operator/aggregation/collStats/#pipe._S_collStats) | 返回有关集合或视图的统计信息。                               |
| [`$count`](https://docs.mongodb.com/manual/reference/operator/aggregation/count/#pipe._S_count) | 返回聚合管道此阶段的文档数量计数。                           |
| [`$facet`](https://docs.mongodb.com/manual/reference/operator/aggregation/facet/#pipe._S_facet) | 在同一组输入文档的单个阶段内处理多个[聚合管道](https://docs.mongodb.com/manual/core/aggregation-pipeline/#id1)。支持创建能够在单个阶段中跨多个维度或方面表征数据的多面聚合。 |
| [`$geoNear`](https://docs.mongodb.com/manual/reference/operator/aggregation/geoNear/#pipe._S_geoNear) | 基于与地理空间点的接近度返回有序的文档流。集成的功能 [`$match`](https://docs.mongodb.com/manual/reference/operator/aggregation/match/#pipe._S_match)，[`$sort`](https://docs.mongodb.com/manual/reference/operator/aggregation/sort/#pipe._S_sort)以及[`$limit`](https://docs.mongodb.com/manual/reference/operator/aggregation/limit/#pipe._S_limit)地理空间数据。输出文档包括附加距离字段，并且可以包括位置标识符字段。 |
| [`$graphLookup`](https://docs.mongodb.com/manual/reference/operator/aggregation/graphLookup/#pipe._S_graphLookup) | 对集合执行递归搜索。对于每个输出文档，添加一个新的数组字段，其中包含该文档的递归搜索的遍历结果。 |
| [`$group`](https://docs.mongodb.com/manual/reference/operator/aggregation/group/#pipe._S_group) | 按指定的标识符表达式对文档进行分组，并将累加器表达式（如果已指定）应用于每个组。消耗所有输入文档，并为每个不同的组输出一个文档。输出文档仅包含标识符字段，如果指定，则包含累积字段。 |
| [`$indexStats`](https://docs.mongodb.com/manual/reference/operator/aggregation/indexStats/#pipe._S_indexStats) | 返回有关集合的每个索引的使用的统计信息。                     |
| [`$limit`](https://docs.mongodb.com/manual/reference/operator/aggregation/limit/#pipe._S_limit) | 将未修改的前*n个*文档传递给管道，其中*n*是指定的限制。对于每个输入文档，输出一个文档（对于前*n个*文档）或零文档（在前*n个*文档之后）。 |
| [`$listSessions`](https://docs.mongodb.com/manual/reference/operator/aggregation/listSessions/#pipe._S_listSessions) | 列出活动时间足以传播到`system.sessions`集合的所有会话。      |
| [`$lookup`](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/#pipe._S_lookup) | 对*同一*数据库中的另一个集合执行左外连接，以 从“已连接”集合中过滤文档以进行处理。 |
| [`$match`](https://docs.mongodb.com/manual/reference/operator/aggregation/match/#pipe._S_match) | 过滤文档流以仅允许匹配的文档未经修改地传递到下一个管道阶段。 [`$match`](https://docs.mongodb.com/manual/reference/operator/aggregation/match/#pipe._S_match)使用标准的MongoDB查询。对于每个输入文档，输出一个文档（匹配）或零文档（不匹配）。 |
| [`$out`](https://docs.mongodb.com/manual/reference/operator/aggregation/out/#pipe._S_out) | 将聚合管道的结果文档写入集合。要使用[`$out`](https://docs.mongodb.com/manual/reference/operator/aggregation/out/#pipe._S_out)舞台，它必须是管道中的最后一个阶段。 |
| [`$project`](https://docs.mongodb.com/manual/reference/operator/aggregation/project/#pipe._S_project) | 重新整形流中的每个文档，例如添加新字段或删除现有字段。对于每个输入文档，输出一个文档。 |
| [`$redact`](https://docs.mongodb.com/manual/reference/operator/aggregation/redact/#pipe._S_redact) | 通过基于文档本身中存储的信息限制每个文档的内容来重塑流中的每个文档。包含[`$project`](https://docs.mongodb.com/manual/reference/operator/aggregation/project/#pipe._S_project)和的功能 [`$match`](https://docs.mongodb.com/manual/reference/operator/aggregation/match/#pipe._S_match)。可用于实现字段级别的编辑。对于每个输入文档，输出一个或零个文档。 |
| [`$replaceRoot`](https://docs.mongodb.com/manual/reference/operator/aggregation/replaceRoot/#pipe._S_replaceRoot) | 用指定的嵌入文档替换文档。该操作将替换输入文档中的所有现有字段，包括`_id`字段。指定嵌入在输入文档中的文档以将嵌入文档提升到顶层。 |
| [`$sample`](https://docs.mongodb.com/manual/reference/operator/aggregation/sample/#pipe._S_sample) | 从输入中随机选择指定数量的文档。                             |
| [`$skip`](https://docs.mongodb.com/manual/reference/operator/aggregation/skip/#pipe._S_skip) | 跳过前*n个*文档，其中*n*是指定的跳过编号，并将未修改的其余文档传递给管道。对于每个输入文档，输出零文档（对于前*n个*文档）或一个文档（如果在前*n个*文档之后）。 |
| [`$sort`](https://docs.mongodb.com/manual/reference/operator/aggregation/sort/#pipe._S_sort) | 按指定的排序键重新排序文档流。只有订单改变; 文件保持不变。对于每个输入文档，输出一个文档。 |
| [`$sortByCount`](https://docs.mongodb.com/manual/reference/operator/aggregation/sortByCount/#pipe._S_sortByCount) | 根据指定表达式的值对传入文档进行分组，然后计算每个不同组中的文档计数。 |
| [`$unwind`](https://docs.mongodb.com/manual/reference/operator/aggregation/unwind/#pipe._S_unwind) | 从输入文档解构数组字段以输出*每个*元素的文档。每个输出文档都使用元素值替换数组。对于每个输入文档，输出*n个*文档，其中*n*是数组元素的数量，对于空数组，可以为零。 |

对于要在管道阶段中使用的聚合表达式运算符，请参阅 [聚合管道运算符](https://docs.mongodb.com/manual/reference/operator/aggregation/)。



## `db.aggregate()`

从3.6版开始，MongoDB还提供了以下 [`db.aggregate`](https://docs.mongodb.com/manual/reference/method/db.aggregate/#db.aggregate)方法：以下阶段使用[`db.aggregate()`](https://docs.mongodb.com/manual/reference/method/db.aggregate/#db.aggregate)方法而不是[`db.collection.aggregate()`](https://docs.mongodb.com/manual/reference/method/db.collection.aggregate/#db.collection.aggregate)方法。

| 阶段                                                         | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$currentOp`](https://docs.mongodb.com/manual/reference/operator/aggregation/currentOp/#pipe._S_currentOp) | 返回有关MongoDB部署的活动和/或休眠操作的信息。               |
| [`$listLocalSessions`](https://docs.mongodb.com/manual/reference/operator/aggregation/listLocalSessions/#pipe._S_listLocalSessions) | 列出最近在当前连接[`mongos`](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos)或[`mongod`](https://docs.mongodb.com/manual/reference/program/mongod/#bin.mongod) 实例上使用的所有活动会话。这些会话可能尚未传播到`system.sessions`集合中。 |

## 聚合api

### 1.$project

> 将包含请求字段的文档传递到管道中的下一个阶段。指定的字段可以是输入文档或新计算字段中的现有字段。

```
{ $project: { <specification(s)> } }
```

该[`$project`](https://docs.mongodb.com/manual/reference/operator/aggregation/project/#pipe._S_project)需要，可以指定包含字段的压制文档`_id`领域，增加新的字段，以及现有字段的值的复位。或者，您可以指定 字段的*排除*。

该[`$project`](https://docs.mongodb.com/manual/reference/operator/aggregation/project/#pipe._S_project)规范有以下几种形式：

| 形成                    | 描述                                                         |
| ----------------------- | ------------------------------------------------------------ |
| `<field>: <1 or true>`  | 指定包含字段。                                               |
| `_id: <0 or false>`     | 指定`_id`字段的抑制。要有条件地排除字段，请改用[`REMOVE`](https://docs.mongodb.com/manual/reference/aggregation-variables/#variable.REMOVE) 变量。有关详细信息，请参阅[有条件地排除字段](https://docs.mongodb.com/manual/reference/operator/aggregation/project/#remove-var)。 |
| `<field>: <expression>` | 添加新字段或重置现有字段的值。在版本3.6中更改： MongoDB 3.6添加了变量[`REMOVE`](https://docs.mongodb.com/manual/reference/aggregation-variables/#variable.REMOVE)。如果表达式求值为`$$REMOVE`，则在输出中排除该字段。有关详细信息，请参阅[有条件地排除字段](https://docs.mongodb.com/manual/reference/operator/aggregation/project/#remove-var)。 |
| `<field>:<0 or false>`  | 版本3.4中的新功能。指定排除字段。要有条件地排除字段，请改用[`REMOVE`](https://docs.mongodb.com/manual/reference/aggregation-variables/#variable.REMOVE) 变量。有关详细信息，请参阅[有条件地排除字段](https://docs.mongodb.com/manual/reference/operator/aggregation/project/#remove-var)。如果您指定排除其他字段`_id`，**则不能**使用任何其他[`$project`](https://docs.mongodb.com/manual/reference/operator/aggregation/project/#pipe._S_project) 规范表单。此限制不适用于使用[`REMOVE`](https://docs.mongodb.com/manual/reference/aggregation-variables/#variable.REMOVE) 变量有条件地排除字段。 |

#### 注意事项

##### 包含现有字段

- `_id`默认情况下，该字段包含在输出文档中。要在输出文档中包含输入文档中的任何其他字段，必须明确指定包含在中 [`$project`](https://docs.mongodb.com/manual/reference/operator/aggregation/project/#pipe._S_project)。
- 如果指定包含文档中不存在的字段，则[`$project`](https://docs.mongodb.com/manual/reference/operator/aggregation/project/#pipe._S_project)忽略该字段包含，并且不将该字段添加到文档中。

##### 取消`_id`字段

默认情况下，该`_id`字段包含在输出文档中。要从`_id`输出文档中排除字段，必须明确指定`_id`字段 的抑制[`$project`](https://docs.mongodb.com/manual/reference/operator/aggregation/project/#pipe._S_project)。

##### 排除字段

版本3.4中的新功能。

如果指定排除某个或多个字段，则在输出文档中返回所有其他字段。

如果指定排除除以外的字段`_id`，则不能使用任何其他[`$project`](https://docs.mongodb.com/manual/reference/operator/aggregation/project/#pipe._S_project)规范表单：即，如果排除字段，则不能指定包含字段，重置现有字段的值或添加新字段。此限制不适用于使用[`REMOVE`](https://docs.mongodb.com/manual/reference/aggregation-variables/#variable.REMOVE)变量对字段进行条件排除 。

##### 有条件地排除字段

版本3.6中的新功能。

从MongoDB 3.6开始，您可以使用[`REMOVE`](https://docs.mongodb.com/manual/reference/aggregation-variables/#variable.REMOVE)聚合表达式中的变量来有条件地抑制字段。有关示例，请参阅[有条件排除字段](https://docs.mongodb.com/manual/reference/operator/aggregation/project/#remove-example)。

##### 添加新字段或重置现有字段

要添加新字段或重置现有字段的值，请指定字段名称并将其值设置为某个表达式。有关表达式的更多信息，请参阅[表达式](https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#aggregation-expressions)。

##### 文字值

若要将字段值直接设置为数字或布尔文字，而不是将字段设置为解析为文字的表达式，请使用[`$literal`](https://docs.mongodb.com/manual/reference/operator/aggregation/literal/#exp._S_literal)运算符。否则， [`$project`](https://docs.mongodb.com/manual/reference/operator/aggregation/project/#pipe._S_project)将数字或布尔文字视为包含或排除字段的标志。

##### 字段重命名

通过指定新字段并将其值设置为现有字段的字段路径，可以有效地重命名字段。

##### 新数组字段

从MongoDB 3.2开始，[`$project`](https://docs.mongodb.com/manual/reference/operator/aggregation/project/#pipe._S_project)stage支持使用方括号`[]`直接创建新的数组字段。如果数组规范包含文档中不存在的字段，则该操作将替换`null`为该字段的值。有关示例，请参阅[Project New Array Fields](https://docs.mongodb.com/manual/reference/operator/aggregation/project/#example-project-new-array-fields)。

##### 嵌入文档字段

在嵌入文档中投影或添加/重置字段时，您可以使用[点表示法](https://docs.mongodb.com/manual/reference/glossary/#term-dot-notation)，如

`"contact.address.country": <1 or 0 or expression>`

`contact: { address: { country: <1 or 0 or expression> } }`

当嵌套的领域，你*不能*使用点表示法嵌入文档中指定的领域，比如是*无效的*。`contact: {"address.country": <1 or 0 or expression> }`

##### 限制

在版本3.4中更改。

如果[`$project`](https://docs.mongodb.com/manual/reference/operator/aggregation/project/#pipe._S_project) 规范是空文档，MongoDB 3.4及更高版本会产生错误。

#### 示例

##### 1.在输出文档中包含特定字段

考虑一个`books`包含以下文档的集合：

```
{
  "_id" : 1,
  title: "abc123",
  isbn: "0001122223334",
  author: { last: "zzz", first: "aaa" },
  copies: 5
}


$project阶段只包括_id， title和author在其输出文档的字段：
db.books.aggregate( [ { $project : { title : 1 , author : 1 } } ] )

结果
{ "_id" : 1, "title" : "abc123", "author" : { "last" : "zzz", "first" : "aaa" } }
```

##### 2.抑制`_id`输出文档中的字段

`_id`默认情况下始终包含该字段。要从舞台`_id` 的输出文档中[`$project`](https://docs.mongodb.com/manual/reference/operator/aggregation/project/#pipe._S_project)排除该`_id`字段，请通过`0`在投影文档中将其设置为指定字段的排除。

考虑一个`books`包含以下文档的集合：

```
{
  "_id" : 1,
  title: "abc123",
  isbn: "0001122223334",
  author: { last: "zzz", first: "aaa" },
  copies: 5
}

以下$project阶段排除了该_id字段，但包括其输出文档中title的author字段和字段：
db.books.aggregate( [ { $project : { _id: 0, title : 1 , author : 1 } } ] )

结果
{ "title" : "abc123", "author" : { "last" : "zzz", "first" : "aaa" } }
```

##### 3.从输出文档中排除字段

版本3.4中的新功能。

考虑一个`books`包含以下文档的集合

```
{
  "_id" : 1,
  title: "abc123",
  isbn: "0001122223334",
  author: { last: "zzz", first: "aaa" },
  copies: 5,
  lastModified: "2016-07-28"
}

以下$project阶段lastModified 从输出中排除字段
db.books.aggregate( [ { $project : { "lastModified": 0 } } ] )



```

##### 从嵌入式文档中排除字段

版本3.4中的新功能。

考虑一个`books`包含以下文档的集合

```
{
  "_id" : 1,
  title: "abc123",
  isbn: "0001122223334",
  author: { last: "zzz", first: "aaa" },
  copies: 5,
  lastModified: "2016-07-28"
}

以下$project阶段从输出中排除author.first 和lastModified字段：
db.books.aggregate( [ { $project : { "author.first" : 0, "lastModified" : 0 } } ] )

或者，您可以将排除规范嵌套在文档中：
db.bookmarks.aggregate( [ { $project: { "author": { "first": 0}, "lastModified" : 0 } } ] )

两种规格都会产生相同的输出：
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

##### 4.有条件地排除字段

版本3.6中的新功能。

从MongoDB 3.6开始，您可以使用[`REMOVE`](https://docs.mongodb.com/manual/reference/aggregation-variables/#variable.REMOVE)聚合表达式中的变量来有条件地抑制字段。

考虑一个`books`包含以下文档的集合：

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


以下$project阶段仅在等于以下情况时才使用该REMOVE 变量排除该author.middle字段""：
db.books.aggregate( [
   {
      $project: {
         title: 1,
         "author.first": 1,
         "author.last" : 1,
         "author.middle": {
            $cond: {
               if: { $eq: [ "", "$author.middle" ] },
               then: "$$REMOVE",
               else: "$author.middle"
            }
         }
      }
   }
] )


聚合操作会产生以下输出：
{ "_id" : 1, "title" : "abc123", "author" : { "last" : "zzz", "first" : "aaa" } }
{ "_id" : 2, "title" : "Baked Goods", "author" : { "last" : "xyz", "first" : "abc" } }
{ "_id" : 3, "title" : "Ice Cream Cakes", "author" : { "last" : "xyz", "first" : "abc", "middle" : "mmm" } }
```

##### 5.包含嵌入式文档中的特定字段

考虑一个`bookmarks`包含以下文档的集合：

```
{ _id: 1, user: "1234", stop: { title: "book1", author: "xyz", page: 32 } }
{ _id: 2, user: "7890", stop: [ { title: "book2", author: "abc", page: 5 }, { title: "book3", author: "ijk", page: 100 } ] }


要仅在title字段中包含嵌入文档中的 stop字段，可以使用点表示法
db.bookmarks.aggregate( [ { $project: { "stop.title": 1 } } ] )
或者，您可以将包含规范嵌套在文档中：
db.bookmarks.aggregate( [ { $project: { stop: { title: 1 } } } ] )

这两个规范都会产生以下文件：
{ "_id" : 1, "stop" : { "title" : "book1" } }
{ "_id" : 2, "stop" : [ { "title" : "book2" }, { "title" : "book3" } ] }
```

##### 6.包含计算字段

考虑一个books包含以下文档的集合：

```
{
  "_id" : 1,
  title: "abc123",
  isbn: "0001122223334",
  author: { last: "zzz", first: "aaa" },
  copies: 5
}

下$project阶段增加了新的领域 isbn，lastName以及copiesSold：
db.books.aggregate(
   [
      {
         $project: {
            title: 1,
            isbn: {
               prefix: { $substr: [ "$isbn", 0, 3 ] },
               group: { $substr: [ "$isbn", 3, 2 ] },
               publisher: { $substr: [ "$isbn", 5, 4 ] },
               title: { $substr: [ "$isbn", 9, 3 ] },
               checkDigit: { $substr: [ "$isbn", 12, 1] }
            },
            lastName: "$author.last",
            copiesSold: "$copies"
         }
      }
   ]
)


操作结果如下：
{
   "_id" : 1,
   "title" : "abc123",
   "isbn" : {
      "prefix" : "000",
      "group" : "11",
      "publisher" : "2222",
      "title" : "333",
      "checkDigit" : "4"
   },
   "lastName" : "zzz",
   "copiesSold" : 5
}
```

##### 7.项目新数组字段

例如，如果集合包含以下文档：

```
{ "_id" : ObjectId("55ad167f320c6be244eb3b95"), "x" : 1, "y" : 1 }


以下操作将字段x和y元素作为新字段的项目myArray：
db.collection.aggregate( [ { $project: { myArray: [ "$x", "$y" ] } } ] )


{ "_id" : ObjectId("55ad167f320c6be244eb3b95"), "myArray" : [ 1, 1 ] }
```

如果数组规范包含文档中不存在的字段，则该操作将替换`null`为该字段的值。

例如，给定相同的文档如上述，以下的动作项目的字段`x`，`y`以及一个不存在的字段 `$someField`作为一个新的领域元素`myArray`：

```
db.collection.aggregate( [ { $project: { myArray: [ "$x", "$y", "$someField" ] } } ] )


{ "_id" : ObjectId("55ad167f320c6be244eb3b95"), "myArray" : [ 1, 1, null ] }
```

### 2.$out

> 获取聚合管道返回的文档并将它们写入指定的集合。该[`$out`](https://docs.mongodb.com/manual/reference/operator/aggregation/out/#pipe._S_out)操作者必须*在最后阶段*的管道。
>
> 版本3.2.0中已更改： MongoDB 3.2添加了对[文档验证的](https://docs.mongodb.com/manual/release-notes/3.2/#rel-notes-document-validation)支持。该`bypassDocumentValidation` 字段使您可以[`$out`](https://docs.mongodb.com/manual/reference/operator/aggregation/out/#pipe._S_out)在聚合操作阶段绕过文档验证 。这使您可以插入不符合验证要求的文档。指定`bypassDocumentValidation`聚合方法或命令的选项。

`{ $out: "<output-collection>" }`

[`$out`](https://docs.mongodb.com/manual/reference/operator/aggregation/out/#pipe._S_out) 获取一个指定输出集合名称的字符串。

重要

- 您不能将分片集合指定为输出集合。管道的输入集合可以分片。
- 该[`$out`](https://docs.mongodb.com/manual/reference/operator/aggregation/out/#pipe._S_out)运营商不能将结果写入 [封顶集合](https://docs.mongodb.com/manual/core/capped-collections/)。

#### 行为

##### 创建新集合

[`$out`](https://docs.mongodb.com/manual/reference/operator/aggregation/out/#pipe._S_out)如果当前数据库尚不存在，则该操作将在当前数据库中创建新集合。在聚合完成之前，集合不可见。如果聚合失败，MongoDB不会创建集合。

##### 替换现有集合

如果[`$out`](https://docs.mongodb.com/manual/reference/operator/aggregation/out/#pipe._S_out)操作指定的集合已存在，则在完成聚合后，该[`$out`](https://docs.mongodb.com/manual/reference/operator/aggregation/out/#pipe._S_out) 阶段将使用新结果集合原子替换现有集合。具体来说，[`$out`](https://docs.mongodb.com/manual/reference/operator/aggregation/out/#pipe._S_out)操作：

1. 创建临时集合。
2. 将索引从现有集合复制到临时集合。
3. 将文档插入临时集合中。
4. 调用[`db.collection.renameCollection`](https://docs.mongodb.com/manual/reference/method/db.collection.renameCollection/#db.collection.renameCollection)与 到临时集合重命名为目的地集合。`dropTarget: true`

该[`$out`](https://docs.mongodb.com/manual/reference/operator/aggregation/out/#pipe._S_out)操作不会更改先前集合中存在的任何索引。如果聚合失败，则[`$out`](https://docs.mongodb.com/manual/reference/operator/aggregation/out/#pipe._S_out)操作不会对预先存在的集合进行任何更改。

##### 索引约束

如果管道生成的文档违反任何唯一索引（包括`_id`原始输出集合字段的索引），则管道将无法完成 。

##### 交易

`$out`在[交易中](https://docs.mongodb.com/manual/core/transactions/)不允许。

#### 示例

集合`books`包含以下文档：

```
{ "_id" : 8751, "title" : "The Banquet", "author" : "Dante", "copies" : 2 }
{ "_id" : 8752, "title" : "Divine Comedy", "author" : "Dante", "copies" : 1 }
{ "_id" : 8645, "title" : "Eclogues", "author" : "Dante", "copies" : 2 }
{ "_id" : 7000, "title" : "The Odyssey", "author" : "Homer", "copies" : 10 }
{ "_id" : 7020, "title" : "Iliad", "author" : "Homer", "copies" : 10 }


以下聚合操作将books 集合中的数据转向以按作者分组标题，然后将结果写入authors集合。
db.books.aggregate( [
                      { $group : { _id : "$author", books: { $push: "$title" } } },
                      { $out : "authors" }
                  ] )
                  
                  
 { "_id" : "Homer", "books" : [ "The Odyssey", "Iliad" ] }
{ "_id" : "Dante", "books" : [ "The Banquet", "Divine Comedy", "Eclogues" ] }
```

