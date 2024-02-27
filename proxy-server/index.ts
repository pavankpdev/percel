import express from "express"
import cors from "cors"
import httpProxy from "http-proxy"

const app = express()
const proxy = httpProxy.createProxy()
const BASE_PATH = 'https://percel.s3.ap-south-1.amazonaws.com'

app.use(cors())
app.use(express.json())
const PORT = 8000

app.use((req, res) => {
    const hostname = req.hostname;
    const subdomain = hostname.split('.')[0];

    const resolvesTo = `${BASE_PATH}/${subdomain}`

    console.log(resolvesTo)

    return proxy.web(req, res, {target: resolvesTo, changeOrigin: true})
})

proxy.on('proxyReq', (proxyReq, req, res) => {
    const url = req.url;
    if (url === '/')
        proxyReq.path += 'index.html'

})

app.listen(PORT, () => console.log(`Reverse Proxy Running..${PORT}`))