## 定义

- `$addFields`

  版本3.4中的新功能。向文档添加新字段。`$addFields`输出包含输入文档和新添加字段中所有现有字段的文档。该[`$addFields`](https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/#pipe._S_addFields)阶段等效于 [`$project`](https://docs.mongodb.com/manual/reference/operator/aggregation/project/#pipe._S_project)显式指定输入文档中所有现有字段并添加新字段的阶段。[`$addFields`](https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/#pipe._S_addFields) 有以下形式：`{ $addFields: { <newField>: <expression>, ... } }`指定要添加的每个字段的名称，并将其值设置为 [聚合表达式](https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#aggregation-expressions)。有关表达式的更多信息，请参阅[表达式](https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#aggregation-expressions)。重要如果新字段的名称与现有字段名称（包括`_id`）相同`$addFields`，则使用指定表达式的值覆盖该字段的现有值。

## 行为

`$addFields`将新字段附加到现有文档。您可以`$addFields`在聚合操作中包含一个或多个阶段。

要向嵌入文档（包括数组中的文档）添加字段或字段，请使用点表示法。见[例子](https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/#add-field-to-embedded)。

注意

无法将元素添加到现有数组字段中`$addFields`。

## 示例

### 使用两个`$addFields`阶段

调用的集合`scores`包含以下文档：

```
{
  _id: 1,
  student: "Maya",
  homework: [ 10, 5, 10 ],
  quiz: [ 10, 8 ],
  extraCredit: 0
}
{
  _id: 2,
  student: "Ryan",
  homework: [ 5, 6, 5 ],
  quiz: [ 8, 8 ],
  extraCredit: 8
}


以下操作使用两个$addFields阶段在输出文档中包含三个新字段：
db.scores.aggregate( [
   {
     $addFields: {
       totalHomework: { $sum: "$homework" } ,
       totalQuiz: { $sum: "$quiz" }
     }
   },
   {
     $addFields: { totalScore:
       { $add: [ "$totalHomework", "$totalQuiz", "$extraCredit" ] } }
   }
] )


该操作返回以下文档：
{
  "_id" : 1,
  "student" : "Maya",
  "homework" : [ 10, 5, 10 ],
  "quiz" : [ 10, 8 ],
  "extraCredit" : 0,
  "totalHomework" : 25,
  "totalQuiz" : 18,
  "totalScore" : 43
}
{
  "_id" : 2,
  "student" : "Ryan",
  "homework" : [ 5, 6, 5 ],
  "quiz" : [ 8, 8 ],
  "extraCredit" : 8,
  "totalHomework" : 16,
  "totalQuiz" : 16,
  "totalScore" : 40
}
```

### 向嵌入文档添加字段

使用点表示法向嵌入文档添加新字段。调用的集合`vehicles`包含以下文档：

```
{ _id: 1, type: "car", specs: { doors: 4, wheels: 4 } }
{ _id: 2, type: "motorcycle", specs: { doors: 0, wheels: 2 } }
{ _id: 3, type: "jet ski" }

以下聚合操作会fuel_type向嵌入文档添加新字段specs。
db.vehicles.aggregate( [
        {
           $addFields: {
              "specs.fuel_type": "unleaded"
           }
        }
   ] )
   
 该操作返回以下结果： 
{ _id: 1, type: "car",
   specs: { doors: 4, wheels: 4, fuel_type: "unleaded" } }
{ _id: 2, type: "motorcycle",
   specs: { doors: 0, wheels: 2, fuel_type: "unleaded" } }
{ _id: 3, type: "jet ski",
   specs: { fuel_type: "unleaded" } }
```

### 覆盖现有字段

在`$addFields`操作中指定现有字段名称会导致替换原始字段。

调用的集合`animals`包含以下文档：

```
{ _id: 1, dogs: 10, cats: 15 }

以下$addFields操作指定该cats字段。
db.animals.aggregate( [
  {
    $addFields: { "cats": 20 }
  }
] )

该操作返回以下文档：
{ _id: 1, dogs: 10, cats: 20 }
```

可以用另一个字段替换一个字段。在以下示例中，该`item`字段替换该`_id`字段。

调用的集合`fruit`包含以下文档：

```
{ "_id" : 1, "item" : "tangerine", "type" : "citrus" }
{ "_id" : 2, "item" : "lemon", "type" : "citrus" }
{ "_id" : 3, "item" : "grapefruit", "type" : "citrus" }

以下聚合操作用于$addFields将_id每个文档的字段替换为字段的值item ，并使用item静态值替换该字段。
db.fruit.aggregate( [
  {
    $addFields: {
      _id : "$item",
      item: "fruit"
    }
  }
] )

该操作返回以下文档：
{ "_id" : "tangerine", "item" : "fruit", "type" : "citrus" }
{ "_id" : "lemon", "item" : "fruit", "type" : "citrus" }
{ "_id" : "grapefruit", "item" : "fruit", "type" : "citrus" }
```

