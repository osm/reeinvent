import React from 'react'
import { Button, Form, Input, Row, Col } from 'reactstrap'

const Synonyms: React.FC = () => {
  // TODO: Move add to its own component.
  const [word, setWord] = React.useState('')
  const [synonym, setSynonym] = React.useState('')
  const [addFeedback, setAddFeedback] = React.useState('')

  // TODO: Move search to its own component.
  const [searchTerm, setSearchTerm] = React.useState('')
  const [searchResult, setSearchResult] = React.useState<string[] | null>(null)
  const [searchFeedback, setSearchFeedback] = React.useState('')

  const add = async (e: React.MouseEvent) => {
    e.preventDefault()

    if (!word || !synonym) {
      setAddFeedback('You need to submit both a word and a synonym!')
      return
    }

    try {
      const payload = { word, synonym }
      await fetch('https://api.reeinvent.recv.se/v1/synonyms', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-type': 'application/json',
        },
      })
      setWord('')
      setSynonym('')
      setSearchTerm('')
      setSearchResult(null)
      setAddFeedback(`The word and synonym were added to the dictionary`)
      setTimeout(() => setAddFeedback(''), 2000)
    } catch (_) {
      // FIXME: Add better error handling
      setAddFeedback('There was an error when API was contacted. Please try again in a while.')
    }
  }

  const search = async (e: React.MouseEvent) => {
    e.preventDefault()

    if (!searchTerm) {
      setSearchFeedback('You need to submit a search term')
      return
    }

    try {
      const res = await fetch(`https://api.reeinvent.recv.se/v1/synonyms/${searchTerm}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      })
      setSearchResult(await res.json())
      setSearchFeedback('')
    } catch (_) {
      // FIXME: Add better error handling
      setSearchFeedback('There was an error when API was contacted. Please try again in a while.')
    }
  }

  return (
    <>
      <Row>
        <Col>
          <h1>Synonyms</h1>
        </Col>
      </Row>

      <Row style={{ marginTop: '2em' }}>
        <Col>
          <h3>Add synonyms</h3>
        </Col>
      </Row>
      <Form>
        <Row className="row-cols-lg-auto g-3 align-items-center">
          <Col sm={{ size: 2 }}>
            <Input placeholder="word" type="text" value={word} onChange={({ target }) => setWord(target.value)} />
          </Col>
          <Col sm={{ size: 2 }}>
            <Input
              placeholder="synonym"
              type="text"
              value={synonym}
              onChange={({ target }) => setSynonym(target.value)}
            />
          </Col>
          <Col sm={{ size: 2 }}>
            <Button type="submit" outline color="success" onClick={add}>
              Add
            </Button>
          </Col>
        </Row>
      </Form>
      {addFeedback && <p style={{ marginTop: '1em' }}>{addFeedback}</p>}

      <Row style={{ marginTop: '2em' }}>
        <Col>
          <h3>Search synonyms</h3>
        </Col>
      </Row>
      <Form style={{ marginBottom: '1em' }}>
        <Row className="row-cols-lg-auto g-3 align-items-center">
          <Col sm={{ size: 2 }}>
            <Input
              placeholder="search for word"
              type="text"
              value={searchTerm}
              onChange={({ target }) => setSearchTerm(target.value)}
            />
          </Col>
          <Col sm={{ size: 2 }}>
            <Button type="submit" outline color="primary" onClick={search}>
              Search
            </Button>
          </Col>
        </Row>
      </Form>
      {Array.isArray(searchResult) && searchResult?.length === 0 && (
        <Row>
          <Col>Nothing found</Col>
        </Row>
      )}
      {Array.isArray(searchResult) && searchResult?.length > 0 && (
        <>
          <Row>
            <Col>
              <h4>Results:</h4>
            </Col>
          </Row>
          {searchResult.map((sr) => (
            <Row key={sr}>
              <Col>{sr}</Col>
            </Row>
          ))}
        </>
      )}
      {searchFeedback && <p style={{ marginTop: '1em' }}>{searchFeedback}</p>}
    </>
  )
}

export default Synonyms
