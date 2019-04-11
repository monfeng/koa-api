## `$arrayElemAt`

版本3.2中的新功能。

返回指定数组索引处的元素。

[`$arrayElemAt`](https://docs.mongodb.com/manual/reference/operator/aggregation/arrayElemAt/#exp._S_arrayElemAt) 具有以下语法：

```
{ $arrayElemAt: [ <array>, <idx> ] }
```

所述`<array>`表达可以是任何有效[的表达](https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#aggregation-expressions)，只要其解析为一个数组。

所述`<idx>`表达可以是任何有效[的表达](https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#aggregation-expressions)，只要其解析为一个整数。

- 如果为正，则[`$arrayElemAt`](https://docs.mongodb.com/manual/reference/operator/aggregation/arrayElemAt/#exp._S_arrayElemAt)返回该`idx`位置的元素 ，从数组的开头开始计算。
- 如果为负数，则[`$arrayElemAt`](https://docs.mongodb.com/manual/reference/operator/aggregation/arrayElemAt/#exp._S_arrayElemAt)返回该`idx`位置的元素 ，从数组的末尾开始计算。

如果`idx`超出数组边界，[`$arrayElemAt`](https://docs.mongodb.com/manual/reference/operator/aggregation/arrayElemAt/#exp._S_arrayElemAt) 则不返回任何结果。

有关表达式的更多信息，请参阅 [表达式](https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#aggregation-expressions)。

### 行为

有关表达式的更多信息，请参阅 [表达式](https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#aggregation-expressions)。

| 例                                      | 结果 |
| --------------------------------------- | ---- |
| `{ $arrayElemAt: [ [ 1, 2, 3 ], 0 ] }`  | `1`  |
| `{ $arrayElemAt: [ [ 1, 2, 3 ], -2 ] }` | `2`  |
| `{ $arrayElemAt: [ [ 1, 2, 3 ], 15 ] }` |      |

### 示例

的集合`users`包含以下文档：

```
{ "_id" : 1, "name" : "dave123", favorites: [ "chocolate", "cake", "butter", "apples" ] }
{ "_id" : 2, "name" : "li", favorites: [ "apples", "pudding", "pie" ] }
{ "_id" : 3, "name" : "ahn", favorites: [ "pears", "pecans", "chocolate", "cherries" ] }
{ "_id" : 4, "name" : "ty", favorites: [ "ice cream" ] }


以下示例返回favorites数组中的第一个和最后一个元素 ：
db.users.aggregate([
   {
     $project:
      {
         name: 1,
         first: { $arrayElemAt: [ "$favorites", 0 ] },
         last: { $arrayElemAt: [ "$favorites", -1 ] }
      }
   }
])

{ "_id" : 1, "name" : "dave123", "first" : "chocolate", "last" : "apples" }
{ "_id" : 2, "name" : "li", "first" : "apples", "last" : "pie" }
{ "_id" : 3, "name" : "ahn", "first" : "pears", "last" : "cherries" }
{ "_id" : 4, "name" : "ty", "first" : "ice cream", "last" : "ice cream" }
```

## `$mergeObjects`

版本3.6中的新功能。

将多个文档合并为一个文档。

```
当用作$group阶段时， $mergeObjects具有以下形式：
{ $mergeObjects: <document> }

在其他表达式中使用时，包括在 $group中但不作为累加器：
{ $mergeObjects: [ <document1>, <document2>, ... ] }
```

### 行为

- `mergeObjects`忽略了`null`操作数。如果要`mergeObjects`解析为null的所有操作数，则 `mergeObjects`返回一个空文档。`{ }`
- `mergeObjects`在合并文档时覆盖字段值。如果要合并的文档包含相同的字段名称，则结果文档中的字段具有合并该字段的最后一个文档的值。

| 例                                                           | 结果                    |
| ------------------------------------------------------------ | ----------------------- |
| `{$ mergeObjects：[{a：1}，null]}`                           | `{a：1}`                |
| `{$ mergeObjects：[null，null]}`                             | `{  }`                  |
| `{   $ mergeObjects：[      {a：1}，      {a：2，b：2}，      {a：3，c：3}   ]}` | `{a：3，b：2，c：3}`    |
| `{  $ mergeObjects：[    {a：1}，    {a：2，b：2}，    {a：3，b：null，c：3}  ]}` | `{a：3，b：null，c：3}` |

### 示例

#### `$mergeObjects`

`orders`使用以下文档创建集合：

```
db.orders.insert([
  { "_id" : 1, "item" : "abc", "price" : 12, "ordered" : 2 },
  { "_id" : 2, "item" : "jkl", "price" : 20, "ordered" : 1 }
])


db.items.insert([
  { "_id" : 1, "item" : "abc", description: "product 1", "instock" : 120 },
  { "_id" : 2, "item" : "def", description: "product 2", "instock" : 80 },
  { "_id" : 3, "item" : "jkl", description: "product 3", "instock" : 60 }
])

下面的操作首先使用$lookup阶段加入由两个集合item的字段，然后使用 $mergeObjects在$replaceRoot给加盟的文件从合并items和orders：

db.orders.aggregate([
   {
      $lookup: {
         from: "items",
         localField: "item",    // field in the orders collection
         foreignField: "item",  // field in the items collection
         as: "fromItems"
      }
   },
   {
      $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$fromItems", 0 ] }, "$$ROOT" ] } }
   },
   { $project: { fromItems: 0 } }
])

该操作返回以下文档：
{ "_id" : 1, "item" : "abc", "description" : "product 1", "instock" : 120, "price" : 12, "ordered" : 2 }
{ "_id" : 2, "item" : "jkl", "description" : "product 3", "instock" : 60, "price" : 20, "ordered" : 1 }
```

#### `$mergeObjects`作为累加器

`sales`使用以下文档创建集合：

```
db.sales.insert( [
   { _id: 1, year: 2017, item: "A", quantity: { "2017Q1": 500, "2017Q2": 500 } },
   { _id: 2, year: 2016, item: "A", quantity: { "2016Q1": 400, "2016Q2": 300, "2016Q3": 0, "2016Q4": 0 } } ,
   { _id: 3, year: 2017, item: "B", quantity: { "2017Q1": 300 } },
   { _id: 4, year: 2016, item: "B", quantity: { "2016Q3": 100, "2016Q4": 250 } }
] )
```

以下操作[`$mergeObjects`](https://docs.mongodb.com/manual/reference/operator/aggregation/mergeObjects/#exp._S_mergeObjects)在[`$group`](https://docs.mongodb.com/manual/reference/operator/aggregation/group/#pipe._S_group)按`item`字段对文档进行分组的阶段中 用作累加器：

注意

当用作累加器时，[`$mergeObjects`](https://docs.mongodb.com/manual/reference/operator/aggregation/mergeObjects/#exp._S_mergeObjects)运算符接受单个操作数。

```
db.sales.aggregate( [
   { $group: { _id: "$item", mergedSales: { $mergeObjects: "$quantity" } } }
])


该操作返回以下文档：
{ "_id" : "B", "mergedSales" : { "2017Q1" : 300, "2016Q3" : 100, "2016Q4" : 250 } }
{ "_id" : "A", "mergedSales" : { "2017Q1" : 500, "2017Q2" : 500, "2016Q1" : 400, "2016Q2" : 300, "2016Q3" : 0, "2016Q4" : 0 } }

```

注意

如果要合并的文档包含相同的字段名称，则结果文档中的字段具有合并该字段的最后一个文档的值。