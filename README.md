# HexAba 阿巴语翻译器

HexAba是一个有趣的编码解码工具，可以将普通文本转换为"阿巴语"，并支持将"阿巴语"翻译回普通文本。这个项目基于十六进制编码原理，结合了中文趣味音节，创造了一种独特的编码方式。

## 编码原理

HexAba的编码原理非常简单：

1. 将每个字符转换为其Unicode十六进制值
2. 用特定的中文音节替换十六进制字符
3. 在每个字符编码前添加"阿"作为分隔符

编码映射表如下：

| 十六进制 | 阿巴语 |
|---------|-------|
| 0 | 巴 |
| 1 | 啊 |
| 2 | 呜 |
| 3 | 哈 |
| 4 | 嘿 |
| 5 | 呵 |
| 6 | 嘻 |
| 7 | 哇 |
| 8 | 咿 |
| 9 | 呀 |
| a | 咕 |
| b | 喵 |
| c | 汪 |
| d | 哞 |
| e | 咩 |
| f | 吱 |

例如，字符"你"的Unicode编码为U+4F60，十六进制表示为"4f60"。转换为阿巴语即为：
"阿嘿阿咕阿嘻阿巴"

## Python实现

以下是用Python实现的编码和解码功能：

```python
def encode_hexaba(text):
    hex_to_aba = {
        '0': '巴', '1': '啊', '2': '呜', '3': '哈', '4': '嘿',
        '5': '呵', '6': '嘻', '7': '哇', '8': '咿', '9': '呀',
        'a': '咕', 'b': '喵', 'c': '汪', 'd': '哞', 'e': '咩', 'f': '吱'
    }
    
    result = ""
    for char in text:
        # 获取字符的十六进制Unicode值（去掉前缀'0x'）
        hex_value = format(ord(char), 'x')
        # 转换每个十六进制字符为对应的阿巴语
        aba_char = '阿' + ''.join([hex_to_aba[h] for h in hex_value])
        result += aba_char
    
    return result

def decode_hexaba(text):
    aba_to_hex = {
        '巴': '0', '啊': '1', '呜': '2', '哈': '3', '嘿': '4',
        '呵': '5', '嘻': '6', '哇': '7', '咿': '8', '呀': '9',
        '咕': 'a', '喵': 'b', '汪': 'c', '哞': 'd', '咩': 'e', '吱': 'f'
    }
    
    result = ""
    # 以'阿'分割文本
    parts = text.split('阿')
    for part in parts:
        if not part:  # 跳过空字符串
            continue
        # 将阿巴语字符转换回十六进制
        hex_value = ''.join([aba_to_hex[char] for char in part])
        # 将十六进制转换为Unicode字符
        result += chr(int(hex_value, 16))
    
    return result

# 测试示例
text = "你好，世界！"
encoded = encode_hexaba(text)
print(f"编码: {encoded}")
decoded = decode_hexaba(encoded)
print(f"解码: {decoded}")
```

## 项目功能

- 文本编码：将任意文本转换为阿巴语
- 文本解码：将阿巴语转换回原始文本
- 语音朗读：支持朗读编码和解码结果
- 复制到剪贴板：一键复制结果
- 本地存储：记录编码和解码的次数

## 部署方式

### 本地开发

1. 克隆项目到本地
2. 安装依赖
```
npm install
```
3. 启动开发服务器
```
npm start
```
4. 构建生产版本
```
npm run build
```

### Docker部署

可以直接使用预构建的Docker镜像：

```
sudo docker run -p 3000:80 liuhetian/hexaba:v0.1.0
```

或者自行构建Docker镜像：

1. 构建React应用
```
npm run build
```

2. 构建Docker镜像
```
docker build -t hexaba:latest .
```

3. 运行Docker容器
```
docker run -p 3000:80 hexaba:latest
```

访问 http://localhost:3000 即可使用阿巴语翻译器。

## 技术栈

- React
- JavaScript
- HTML/CSS
- Docker
- Nginx (用于Docker部署)

## 许可证

MIT 