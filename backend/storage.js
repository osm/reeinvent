// hash is the hash table that contains the synonym data. Each word will have
// its own key and the value will be an array of all the synonyms associated to
// the given word.
const hash = {}

function add(word, synonym) {
  // Construct an array of the given word and synonm.
  // We'll also include any existing synonyms for either the word or synonym.
  // I'm using the Set to deduplicate any values and then it's converted back
  // to an array and finally sorted.
  const synonyms = Array.from(new Set([
    word,
    synonym,
    ...(word in hash ? hash[word] : []),
    ...(synonym in hash ? hash[synonym] : []),
  ])).sort()

  for (const s of synonyms) {
    hash[s] = synonyms
  }

  return hash[word]
}

function remove(word) {
  if (!(word in hash)) {
    return
  }

  const remaining = hash[word].filter((w) => w !== word)

  delete hash[word]

  for (const r of remaining) {
    hash[r] = remaining
  }
}

function get(word) {
  return word in hash ? hash[word] : []
}

export { add, remove, get }
