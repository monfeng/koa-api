## `db.collection.aggregate()`

除了[`$out`](https://docs.mongodb.com/manual/reference/operator/aggregation/out/#pipe._S_out)和[`$geoNear`](https://docs.mongodb.com/manual/reference/operator/aggregation/geoNear/#pipe._S_geoNear)阶段之外的所有内容都可以在管道中多次出现

计算集合或[视图中](https://docs.mongodb.com/manual/core/views/)数据的聚合值

```
db.collection.aggregate(pipeline, options)
```

| 参数       | 类型 | 描述                                                         |
| ---------- | ---- | ------------------------------------------------------------ |
| `pipeline` | 排列 | 一系列数据聚合操作或阶段。有关详细信息，请参阅 [聚合管道运算](https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/)在2.6版中更改：该方法仍然可以将管道阶段作为单独的参数接受，而不是作为数组中的元素; 但是，如果未指定`pipeline`为数组，则无法指定 `options`参数。 |
| `options`  | 文献 | 可选的。[`aggregate()`](https://docs.mongodb.com/manual/reference/method/db.collection.aggregate/#db.collection.aggregate)传递给[`aggregate`](https://docs.mongodb.com/manual/reference/command/aggregate/#dbcmd.aggregate)命令的其他选项。版本2.6中的新功能：仅在您指定`pipeline`为数组时可用。 |

该`options`文档可以包含以下字段和值：

| 领域                       | 类型         | 描述                                                         |
| -------------------------- | ------------ | ------------------------------------------------------------ |
| `explain`                  | 布尔         | 可选的。指定返回有关管道处理的信息。有关示例，请参阅 [聚合管道操作的返回信息](https://docs.mongodb.com/manual/reference/method/db.collection.aggregate/#example-aggregate-method-explain-option)。在[多文档交易中](https://docs.mongodb.com/manual/core/transactions/)不可用。 |
| `allowDiskUse`             | 布尔         | 可选的。允许写入临时文件。设置为时`true`，聚合操作可以将数据写入`_tmp`目录中的 [`dbPath`](https://docs.mongodb.com/manual/reference/configuration-options/#storage.dbPath)子目录。有关示例，请参阅 [使用外部排序执行大型排序操作](https://docs.mongodb.com/manual/reference/method/db.collection.aggregate/#example-aggregate-method-external-sort)。2.6版中的新功能。 |
| `cursor`                   | 文献         | 可选的。指定游标的*初始*批处理大小。该`cursor` 字段的值是具有该字段的文档`batchSize`。有关语法和示例，请参阅 [指定初始批处理大小](https://docs.mongodb.com/manual/reference/method/db.collection.aggregate/#example-aggregate-method-initial-batch-size)。2.6版中的新功能。 |
| `maxTimeMS`                | 非负整数     | 可选的。指定处理游标操作的时间限制（以毫秒为单位）。如果未指定maxTimeMS的值，则操作不会超时。值`0`显式指定默认的无界行为。MongoDB使用与其相同的机制终止超出其分配时间限制的操作[`db.killOp()`](https://docs.mongodb.com/manual/reference/method/db.killOp/#db.killOp)。MongoDB仅终止其指定中[断点](https://docs.mongodb.com/manual/reference/glossary/#term-interrupt-point)之一的操作。 |
| `bypassDocumentValidation` | 布尔         | 可选的。仅在指定[`$out`](https://docs.mongodb.com/manual/reference/operator/aggregation/out/#pipe._S_out)聚合运算符时可用。允许[`db.collection.aggregate`](https://docs.mongodb.com/manual/reference/method/db.collection.aggregate/#db.collection.aggregate)在操作期间绕过文档验证。这使您可以插入不符合验证要求的文档。版本3.2中的新功能。 |
| `readConcern`              | 文献         | 可选的。指定[读取问题](https://docs.mongodb.com/manual/reference/glossary/#term-read-concern)。readConcern选项具有以下语法：版本3.6中已更改。[复制复制]()`readConcern ： {  level ： < value >  }`可能的阅读关注水平是：[`"local"`](https://docs.mongodb.com/manual/reference/read-concern-local/#readconcern.%22local%22)。这是默认的读取关注级别。[`"available"`](https://docs.mongodb.com/manual/reference/read-concern-available/#readconcern.%22available%22)。当[读取操作和afterClusterTime](https://docs.mongodb.com/manual/reference/read-concern/#afterclustertime)以及“level”未指定时，这是对辅助[节点的](https://docs.mongodb.com/manual/reference/read-concern/#afterclustertime)读取的默认值。查询返回实例的最新数据。[`"majority"`](https://docs.mongodb.com/manual/reference/read-concern-majority/#readconcern.%22majority%22)。适用于使用[WiredTiger存储引擎的](https://docs.mongodb.com/manual/core/wiredtiger/#storage-wiredtiger)副本集 。[`"linearizable"`](https://docs.mongodb.com/manual/reference/read-concern-linearizable/#readconcern.%22linearizable%22)。仅适用于读取操作 [`primary`](https://docs.mongodb.com/manual/reference/replica-states/#replstate.PRIMARY)。有关读取关注级别的更多信息，请参阅 [读取关注级别](https://docs.mongodb.com/manual/reference/read-concern/#read-concern-levels)。对于[`"local"`](https://docs.mongodb.com/manual/reference/read-concern-local/#readconcern.%22local%22)（默认）或[`"majority"`](https://docs.mongodb.com/manual/reference/read-concern-majority/#readconcern.%22majority%22)读取关注级别，您可以指定使`afterClusterTime`读取操作返回满足级别要求的数据和指定的群集时间要求的选项。有关更多信息，请参阅 [读取操作和afterClusterTime](https://docs.mongodb.com/manual/reference/read-concern/#afterclustertime)。 |
| `collation`                | 文献         | 可选的。指定 要用于操作的[排序规则](https://docs.mongodb.com/manual/reference/bson-type-comparison-order/#collation)。[排序规则](https://docs.mongodb.com/manual/reference/collation/)允许用户为字符串比较指定特定于语言的规则，例如字母和重音标记的规则。排序规则选项具有以下语法：[复制复制]()`collation ： {    locale ： < string > ，   caseLevel ： < boolean > ，   caseFirst ： < string > ，   strength ： < int > ，   numericOrdering ： < boolean > ，   alternate ： < string > ，   maxVariable ： < string > ，   backwards ： < boolean > }`指定排序规则时，该`locale`字段是必填字段; 所有其他校对字段都是可选的。有关字段的说明，请参阅[排序文档](https://docs.mongodb.com/manual/reference/collation/#collation-document-fields)。如果未指定排序规则但集合具有默认排序规则（请参阅参考资料[`db.createCollection()`](https://docs.mongodb.com/manual/reference/method/db.createCollection/#db.createCollection)），则该操作将使用为集合指定的排序规则。如果没有为集合或操作指定排序规则，MongoDB使用先前版本中使用的简单二进制比较进行字符串比较。您无法为操作指定多个排序规则。例如，您不能为每个字段指定不同的排序规则，或者如果使用排序执行查找，则不能对查找使用一个排序规则，而对排序使用另一个排序规则。版本3.4中的新功能。 |
| `hint`                     | 字符串或文件 | 可选的。用于聚合的索引。索引位于运行聚合的初始集合/视图上。通过索引名称或索引规范文档指定索引。注意该`hint`不适[`$lookup`](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/#pipe._S_lookup)和 [`$graphLookup`](https://docs.mongodb.com/manual/reference/operator/aggregation/graphLookup/#pipe._S_graphLookup)阶段。版本3.6中的新功能。 |
| `comment`                  | 串           | 可选的。用户可以指定任意字符串，以帮助通过数据库探查器，currentOp和日志跟踪操作。版本3.6中的新功能。 |


一个光标通过聚集流水线操作的最后阶段产生的文件，或者如果包括 explain选项，提供了聚集操作的处理细节的文件。

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

### 1.$project（更改原有字段的输出，维度是_id，即每一条数据不变）

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

### 3.$group（根据不同的字段进行统计，或者输出）

> 按一些指定的表达式对文档进行分组，并为每个不同的分组输出到下一个阶段的文档。输出文档包含一个`_id`按键包含不同组的字段。输出文档还可以包含存储由分组一些累加器表达式的值来计算字段 [`$group`](https://docs.mongodb.com/manual/reference/operator/aggregation/group/#pipe._S_group)的`_id`字段。[`$group`](https://docs.mongodb.com/manual/reference/operator/aggregation/group/#pipe._S_group)并*没有* 责令其输出文档。

该[`$group`](https://docs.mongodb.com/manual/reference/operator/aggregation/group/#pipe._S_group)阶段具有以下原型形式：

```
{  $ group ： {_  id ： < expression > ， < field1 >： {  < accumulator1 >  ： < expression1 >  }， ...  }  }
```

该`_id`字段是*强制性的* ; 但是，您可以指定 `_id`null值或任何其他常量值，以计算所有输入文档的累计值。

其余的计算字段是*可选的，*并使用`<accumulator>`运算符计算 。

在`_id`和`<accumulator>`表达式可以接受任何有效的[表达](https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#aggregation-expressions)。有关表达式的更多信息，请参阅[表达式](https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#aggregation-expressions)

#### 注意事项

##### 累加运算符

该`<accumulator>`操作必须是以下之一：

| 名称                                                         | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`$addToSet`](https://docs.mongodb.com/manual/reference/operator/aggregation/addToSet/#grp._S_addToSet) | 返回每个组的*唯一*表达式值数组。数组元素的顺序未定义。       |
| [`$avg`](https://docs.mongodb.com/manual/reference/operator/aggregation/avg/#grp._S_avg) | 返回数值的平均值。忽略非数字值。                             |
| [`$first`](https://docs.mongodb.com/manual/reference/operator/aggregation/first/#grp._S_first) | 返回每个组的第一个文档中的值。仅在文档按定义的顺序定义时才定义订单。 |
| [`$last`](https://docs.mongodb.com/manual/reference/operator/aggregation/last/#grp._S_last) | 返回每个组的最后一个文档的值。仅在文档按定义的顺序定义时才定义订单。 |
| [`$max`](https://docs.mongodb.com/manual/reference/operator/aggregation/max/#grp._S_max) | 返回每个组的最高表达式值。                                   |
| [`$mergeObjects`](https://docs.mongodb.com/manual/reference/operator/aggregation/mergeObjects/#exp._S_mergeObjects) | 返回通过组合每个组的输入文档创建的文档。                     |
| [`$min`](https://docs.mongodb.com/manual/reference/operator/aggregation/min/#grp._S_min) | 返回每个组的最低表达式值。                                   |
| [`$push`](https://docs.mongodb.com/manual/reference/operator/aggregation/push/#grp._S_push) | 返回每个组的表达式值数组。                                   |
| [`$stdDevPop`](https://docs.mongodb.com/manual/reference/operator/aggregation/stdDevPop/#grp._S_stdDevPop) | 返回输入值的总体标准偏差。                                   |
| [`$stdDevSamp`](https://docs.mongodb.com/manual/reference/operator/aggregation/stdDevSamp/#grp._S_stdDevSamp) | 返回输入值的样本标准偏差。                                   |
| [`$sum`](https://docs.mongodb.com/manual/reference/operator/aggregation/sum/#grp._S_sum) | 返回数值的总和。忽略非数字值。                               |

##### `$group`运算符和内存

该[`$group`](https://docs.mongodb.com/manual/reference/operator/aggregation/group/#pipe._S_group)阶段的RAM限制为100兆字节。默认情况下，如果阶段超出此限制，[`$group`](https://docs.mongodb.com/manual/reference/operator/aggregation/group/#pipe._S_group)将产生错误。但是，要允许处理大型数据集，请将[`allowDiskUse`](https://docs.mongodb.com/manual/reference/method/db.collection.aggregate/#db.collection.aggregate)选项设置 `true`为启用[`$group`](https://docs.mongodb.com/manual/reference/operator/aggregation/group/#pipe._S_group)操作以写入临时文件。有关详细信息，请参阅[`db.collection.aggregate()`](https://docs.mongodb.com/manual/reference/method/db.collection.aggregate/#db.collection.aggregate)方法和 [`aggregate`](https://docs.mongodb.com/manual/reference/command/aggregate/#dbcmd.aggregate)命令。

版本2.6中更改： MongoDB为[`$group`](https://docs.mongodb.com/manual/reference/operator/aggregation/group/#pipe._S_group)舞台引入了100兆字节的RAM限制， 以及[`allowDiskUse`](https://docs.mongodb.com/manual/reference/method/db.collection.aggregate/#db.collection.aggregate)处理大型数据集操作的选项。



#### 示例

##### 1.计算计数，总和和平均值

给出`sales`包含以下文档的集合：

```
{ "_id" : 1, "item" : "abc", "price" : 10, "quantity" : 2, "date" : ISODate("2014-03-01T08:00:00Z") }
{ "_id" : 2, "item" : "jkl", "price" : 20, "quantity" : 1, "date" : ISODate("2014-03-01T09:00:00Z") }
{ "_id" : 3, "item" : "xyz", "price" : 5, "quantity" : 10, "date" : ISODate("2014-03-15T09:00:00Z") }
{ "_id" : 4, "item" : "xyz", "price" : 5, "quantity" : 20, "date" : ISODate("2014-04-04T11:21:39.736Z") }
{ "_id" : 5, "item" : "abc", "price" : 10, "quantity" : 10, "date" : ISODate("2014-04-04T21:23:13.331Z") }
```

**按月，日和年分组**
以下聚合操作使用$group阶段按月，日和年对文档进行分组，并计算总价格和平均数量，并计算每个组的文档：

```
db.sales.aggregate(
   [
      {
        $group : {
           _id : { month: { $month: "$date" }, day: { $dayOfMonth: "$date" }, year: { $year: "$date" } },
           totalPrice: { $sum: { $multiply: [ "$price", "$quantity" ] } },
           averageQuantity: { $avg: "$quantity" },
           count: { $sum: 1 }
        }
      }
   ]
)



{ "_id" : { "month" : 3, "day" : 15, "year" : 2014 }, "totalPrice" : 50, "averageQuantity" : 10, "count" : 1 }
{ "_id" : { "month" : 4, "day" : 4, "year" : 2014 }, "totalPrice" : 200, "averageQuantity" : 15, "count" : 2 }
{ "_id" : { "month" : 3, "day" : 1, "year" : 2014 }, "totalPrice" : 40, "averageQuantity" : 1.5, "count" : 2 }
```

##### 2.分组`null`

下面的聚合操作指定一组`_id`的 `null`，计算总价格和平均数量以及计数集合中的所有文件：

```
db.sales.aggregate(
   [
      {
        $group : {
           _id : null,
           totalPrice: { $sum: { $multiply: [ "$price", "$quantity" ] } },
           averageQuantity: { $avg: "$quantity" },
           count: { $sum: 1 }
        }
      }
   ]
)

// result
{ "_id" : null, "totalPrice" : 290, "averageQuantity" : 8.6, "count" : 5 }
```

也可以看看

[`$count`](https://docs.mongodb.com/manual/reference/operator/aggregation/count/#pipe._S_count)



##### 3.检索不同的值

给出sales包含以下文档的集合：

```
{ "_id" : 1, "item" : "abc", "price" : 10, "quantity" : 2, "date" : ISODate("2014-03-01T08:00:00Z") }
{ "_id" : 2, "item" : "jkl", "price" : 20, "quantity" : 1, "date" : ISODate("2014-03-01T09:00:00Z") }
{ "_id" : 3, "item" : "xyz", "price" : 5, "quantity" : 10, "date" : ISODate("2014-03-15T09:00:00Z") }
{ "_id" : 4, "item" : "xyz", "price" : 5, "quantity" : 20, "date" : ISODate("2014-04-04T11:21:39.736Z") }
{ "_id" : 5, "item" : "abc", "price" : 10, "quantity" : 10, "date" : ISODate("2014-04-04T21:23:13.331Z") }


以下聚合操作使用该$group阶段按项目对文档进行分组以检索不同的项目值：

db.sales.aggregate( [ { $group : { _id : "$item" } } ] )

// result
{ "_id" : "xyz" }
{ "_id" : "jkl" }
{ "_id" : "abc" }
```

##### 4.Pivot Data

```
{ "_id" : 8751, "title" : "The Banquet", "author" : "Dante", "copies" : 2 }
{ "_id" : 8752, "title" : "Divine Comedy", "author" : "Dante", "copies" : 1 }
{ "_id" : 8645, "title" : "Eclogues", "author" : "Dante", "copies" : 2 }
{ "_id" : 7000, "title" : "The Odyssey", "author" : "Homer", "copies" : 10 }
{ "_id" : 7020, "title" : "Iliad", "author" : "Homer", "copies" : 10 }

以下聚合操作将books 集合中的数据转化为具有按作者分组的标题
db.books.aggregate(
   [
     { $group : { _id : "$author", books: { $push: "$title" } } }
   ]
)

该操作返回以下文档：
{ "_id" : "Homer", "books" : [ "The Odyssey", "Iliad" ] }
{ "_id" : "Dante", "books" : [ "The Banquet", "Divine Comedy", "Eclogues" ] }
```

##### 分组文件author

以下聚合操作使用$$ROOT 系统变量按作者对文档进行分组。生成的文件不得超过限制。

BSON Document Size:最大BSON文档大小为16兆字节。

> 最大文档大小有助于确保单个文档不会使用过多的RAM，或者在传输过程中使用过多的带宽。为了存储大于最大大小的文档，MongoDB提供了GridFS API。有关GridFS的更多信息，请参阅[驱动程序](https://docs.mongodb.com/ecosystem/drivers)[`mongofiles`](https://docs.mongodb.com/manual/reference/program/mongofiles/#bin.mongofiles)的文档。

```
db.books.aggregate(
   [
     { $group : { _id : "$author", books: { $push: "$$ROOT" } } }
   ]
)


result
{
  "_id" : "Homer",
  "books" :
     [
       { "_id" : 7000, "title" : "The Odyssey", "author" : "Homer", "copies" : 10 },
       { "_id" : 7020, "title" : "Iliad", "author" : "Homer", "copies" : 10 }
     ]
}

{
  "_id" : "Dante",
  "books" :
     [
       { "_id" : 8751, "title" : "The Banquet", "author" : "Dante", "copies" : 2 },
       { "_id" : 8752, "title" : "Divine Comedy", "author" : "Dante", "copies" : 1 },
       { "_id" : 8645, "title" : "Eclogues", "author" : "Dante", "copies" : 2 }
     ]
}
```

### `$unwind`（统计数组的每一个值，输出以该值为维度的数据，数据变多了，其他值一样）

> 从输入文档解构数组字段以输出*每个*元素的文档。每个输出文档都是输入文档，其中数组字段的值由元素替换。

该[`$unwind`](https://docs.mongodb.com/manual/reference/operator/aggregation/unwind/#pipe._S_unwind)阶段具有以下两种语法之一：

1. 操作数是一个字段路径：要指定字段路径，请在字段名称前加上美元符号， `$`并用引号括起来

```
{ $unwind: <field path> }
```

1. 操作数是一个文件：

```
{
  $unwind:
    {
      path: <field path>,
      includeArrayIndex: <string>,
      preserveNullAndEmptyArrays: <boolean>
    }
}
```

| 领域                         | 类型    | 描述                                                         |
| ---------------------------- | ------- | ------------------------------------------------------------ |
| `path`                       | string  | 数组字段的字段路径。要指定字段路径，请在字段名称前加上美元符号，`$`并用引号括起来。 |
| `includeArrayIndex`          | string  | 可选的。用于保存元素的数组索引的新字段的名称。该名称不能以美元符号开头`$`。 |
| `preserveNullAndEmptyArrays` | boolean | 可选的。如果`true`，如果`path`为null，缺少或为空数组，则[`$unwind`](https://docs.mongodb.com/manual/reference/operator/aggregation/unwind/#pipe._S_unwind)输出文档。如果`false`，[`$unwind`](https://docs.mongodb.com/manual/reference/operator/aggregation/unwind/#pipe._S_unwind)如果`path`为null，缺少或空数组， 则不输出文档。默认值为`false`。 |

#### 行为

##### 非阵列场路径

版本3.2中更改：[`$unwind`](https://docs.mongodb.com/manual/reference/operator/aggregation/unwind/#pipe._S_unwind)非数组操作数上的阶段不再出错。如果操作数未解析为数组但未丢失，null或空数组，[`$unwind`](https://docs.mongodb.com/manual/reference/operator/aggregation/unwind/#pipe._S_unwind)则将操作数视为单个元素数组。

以前，如果字段路径指定的字段中的值 *不是*数组，[`db.collection.aggregate()`](https://docs.mongodb.com/manual/reference/method/db.collection.aggregate/#db.collection.aggregate)则会生成错误。

##### 缺少字段

如果为输入文档中不存在的字段指定路径，或者该字段为空数组，则[`$unwind`](https://docs.mongodb.com/manual/reference/operator/aggregation/unwind/#pipe._S_unwind)默认情况下会忽略输入文档，并且不会输出该输入文档的文档。

版本3.2中的新增功能：要输出缺少数组字段的文档，null或空数组，请使用该选项`preserveNullAndEmptyArrays`。





#### 示例

##### 展开数组

考虑`inventory`使用以下文档：

```
{ "_id" : 1, "item" : "ABC1", sizes: [ "S", "M", "L"] }


以下聚合使用该$unwind阶段为sizes数组中的每个元素输出文档：
db.inventory.aggregate( [ { $unwind : "$sizes" } ] )


该操作返回以下结果：每个文档都与输入文档相同，除了sizes现在包含原始sizes数组值的字段的值 。

{ "_id" : 1, "item" : "ABC1", "sizes" : "S" }
{ "_id" : 1, "item" : "ABC1", "sizes" : "M" }
{ "_id" : 1, "item" : "ABC1", "sizes" : "L" }
```

##### `includeArrayIndex`和`preserveNullAndEmptyArrays`[¶](https://docs.mongodb.com/manual/reference/operator/aggregation/unwind/#includearrayindex-and-preservenullandemptyarrays)

版本3.2中的新功能。

集合`inventory`包含以下文件：

```
{ "_id" : 1, "item" : "ABC", "sizes": [ "S", "M", "L"] }
{ "_id" : 2, "item" : "EFG", "sizes" : [ ] }
{ "_id" : 3, "item" : "IJK", "sizes": "M" }
{ "_id" : 4, "item" : "LMN" }
{ "_id" : 5, "item" : "XYZ", "sizes" : null }


以下$unwind操作是等效的，并返回sizes字段中每个元素的文档。如果sizes 字段未解析为数组但未丢失，null或空数组，$unwind则将非数组操作数视为单个元素数组。

db.inventory.aggregate( [ { $unwind: "$sizes" } ] )
db.inventory.aggregate( [ { $unwind: { path: "$sizes" } } ] )

该操作返回以下文档：
{ "_id" : 1, "item" : "ABC", "sizes" : "S" }
{ "_id" : 1, "item" : "ABC", "sizes" : "M" }
{ "_id" : 1, "item" : "ABC", "sizes" : "L" }
{ "_id" : 3, "item" : "IJK", "sizes" : "M" }
```

##### 以下[`$unwind`](https://docs.mongodb.com/manual/reference/operator/aggregation/unwind/#pipe._S_unwind)操作使用该 `includeArrayIndex`选项输出数组元素的数组索引。

```
db.inventory.aggregate( [ { $unwind: { path: "$sizes", includeArrayIndex: "arrayIndex" } } ] )


该操作展开sizes数组并在新arrayIndex字段中包含数组索引的数组索引。如果该sizes 字段未解析为数组但未丢失，null或空数组，则该arrayIndex字段为null。

{ "_id" : 1, "item" : "ABC", "sizes" : "S", "arrayIndex" : NumberLong(0) }
{ "_id" : 1, "item" : "ABC", "sizes" : "M", "arrayIndex" : NumberLong(1) }
{ "_id" : 1, "item" : "ABC", "sizes" : "L", "arrayIndex" : NumberLong(2) }
{ "_id" : 3, "item" : "IJK", "sizes" : "M", "arrayIndex" : null }
```

##### 以下[`$unwind`](https://docs.mongodb.com/manual/reference/operator/aggregation/unwind/#pipe._S_unwind)操作使用该 `preserveNullAndEmptyArrays`选项在输出中包含`sizes`缺少字段的文档，null或空数组。

```
db.inventory.aggregate( [
   { $unwind: { path: "$sizes", preserveNullAndEmptyArrays: true } }
] )


除了展开sizes元素数组或非空非数组字段的文档之外，操作还会输出sizes缺少字段的空文件或空数组，而不进行修改：
{ "_id" : 1, "item" : "ABC", "sizes" : "S" }
{ "_id" : 1, "item" : "ABC", "sizes" : "M" }
{ "_id" : 1, "item" : "ABC", "sizes" : "L" }
{ "_id" : 2, "item" : "EFG" }
{ "_id" : 3, "item" : "IJK", "sizes" : "M" }
{ "_id" : 4, "item" : "LMN" }
{ "_id" : 5, "item" : "XYZ", "sizes" : null }
```



## 参考文档

- [mongodb文档](https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/)

