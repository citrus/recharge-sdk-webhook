import http from 'http'

http.createServer((req, res) => {
  console.log('> REQUEST RECEIVED <', req.method)
  if (req.method === 'POST') {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => {
      const data = Buffer.concat(chunks)
      console.log('Data: ', JSON.stringify(JSON.parse(data.toString()), null, 2))
    })
  }
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.write('Hello World!')
  res.end()
}).listen(8080)
