Baidu Baike Parser Server

# 1
`docker login --username=thegatheringstorm registry.cn-beijing.aliyuncs.com`

password: 1234abcd
# 2
`docker run -d --name baidu-baike-parser-server -p 1234:1234 registry.cn-beijing.aliyuncs.com/standbyme/baidu-baike-parser-server`

# 3
`curl -l -H "Content-type: application/json" -X POST -d '{"url":"https://baike.baidu.com/item/%E5%8D%8E%E6%98%A5%E8%8E%B9/1247543?fr=aladdin"}' http://127.0.0.1:1234/`

# Para
```
{
    "url":string
}
```

**Please Use https://baike.baidu.com/item/%E8%91%A3%E6%98%8E%E7%8F%A0/1133**

**Not https://baike.baidu.com/item/董明珠/1133**

**Chinese or others Must be URLEncoded**

# Return Value
```
{
    "abstract":string,
    "basic_info":{
        [string]:string
    },
    "desc":string,
    "pic_url":string,
    "title":string,
}
```
**Any Field Can Be Not Found Including Title(Yes,there is some page does not have page)(Very rare)**
*For example, there is no desc*
```
{
  "abstract": "华春莹（1970.04-），江苏淮安人，毕业于南京大学。2012年8月接替姜瑜出任中国外交部新闻司副司长。同年11月，担任外交部发言人。现为外交部新闻司副司长兼外交部发言人。",
  "title": "华春莹",
  "pic_url": "https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=67d24e3412dfa9ecfd2e51115aeb903e/b03533fa828ba61e3dd2e4074234970a304e59dd.jpg",
  "basic_info": {
    "中文名": "华春莹",
    "国籍": "中国",
    "出生地": "江苏",
    "出生日期": "1970年",
    "职业": "外交部新闻司副司长、新闻发言人",
    "毕业院校": "南京大学",
    "主要成就": "中国第五位女性外交部发言人",
    "性别": "女",
    "婚姻状况": "已婚"
  }
}
```