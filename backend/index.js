import express from 'express'
import bodyParser from 'body-parser'
import Ajv from 'ajv'
import cors from 'cors'

import { add, get } from './storage.js'

const app = express()
const ajv = new Ajv({ allErrors: true })
const port = process.env.REEINVENT_PORT ?? 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// JSON schema that is used for input validation in the POST route.
// Only accept words without spaces for now.
const validate = ajv.compile({
  type: 'object',
  properties: {
    word: {
      type: 'string',
      pattern: '^[a-zA-ZåäöÅÄÖ]+$',
      description: 'Word you would like to add',
    },
    synonym: {
      type: 'string',
      pattern: '^[a-zA-ZåäöÅÄÖ]+$',
      description: 'Synonym for the word',
    },
  },
  required: ['word'],
  additionalProperties: false,
})

app.post('/v1/synonyms', (req, res) => {
  const { body } = req

  validate(body)
  if (validate.errors) {
    res.status(400)
    return res.send(JSON.stringify(validate.errors))
  }

  const { word, synonym } = body
  const synonyms = add(word, synonym)
  res.status(201)
  res.send(JSON.stringify(synonyms))
})

app.get('/v1/synonyms/:word', (req, res) => {
  const synonyms = get(req.params.word)
  res.send(JSON.stringify(synonyms))
})

app.listen(port)
