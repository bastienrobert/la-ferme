import express from 'express'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json())

app.get('/', (_, res) => {
  res.json({
    status: 'ok',
    version: '1.0.0'
  })
})

const foo: Foo.Bar = { foo: 'hello' }

app.listen(3000, () =>
  console.log('Server is running on http://localhost:3000')
)
