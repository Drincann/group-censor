# 涩图识别及撤回

## 使用

- 配置

  修改 `./config.json.template` 并更名 `./config.json` 。

- 运行

  ```shell
    node .
  ```

## 配置

`./config.json.template`

```json
{
  // bot 配置
    "botconfig": {
        "baseUrl": "http://example",
        "authKey": "authkey",
        "qq": 1019933576
    },
  // 百度 api key
    "apikey": "apikey",
  // secretkey
    "secretkey": "secretkey",
  // 作用于群聊
    "groups": [
        730757181
    ],
  // 撤回后发给
    "sendTo": 1019933576,
  // 撤回延时 (s)
    "recalldelay": 5
}
```
