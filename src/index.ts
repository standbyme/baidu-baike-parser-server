import baidu_baike_parser from 'baidu-baike-parser'
import axios from 'axios'
import { Option } from 'funfix-core'

// tslint:disable-next-line:variable-name
const Koa = require('koa')
const app = new Koa()
const koaBody = require('koa-body')
const cors = require('koa-cors')

app.use(koaBody())
app.use(cors())

async function get_html(url: string): Promise<string> {
    // @ts-ignore
    const { data } = await axios.get(url)
    return data
}

async function get_from_link(link: string) {
    const html__str = await get_html(link)
    return baidu_baike_parser(html__str)
}

function strMapToObj(strMap: Map<string, any>) {
    let obj = Object.create(null);
    for (let [k, v] of strMap) {
        obj[k] = v;
    }
    return obj;
}


// tslint:disable-next-line:no-any
app.use(async (ctx: any) => {
    try {
        const url = ctx.request.body.url
        const result = await get_from_link(url)
        let body = Object.create(null);
        const { abstract__opt, basic_info__opt, desc__opt, pic_url__opt, title__opt } = result
        if (abstract__opt.nonEmpty()) body.abstract = abstract__opt.get()
        if (desc__opt.nonEmpty()) body.desc = desc__opt.get()
        if (title__opt.nonEmpty()) body.title = title__opt.get()
        if (pic_url__opt.nonEmpty()) body.pic_url = pic_url__opt.get()
        if (basic_info__opt.nonEmpty()) {
            body.basic_info = strMapToObj(basic_info__opt.get())
        }

        ctx.body = body
    } catch (e) {
        console.log(e)
        ctx.body = {}
    }
})

app.listen(1234)
