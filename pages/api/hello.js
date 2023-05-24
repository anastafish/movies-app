// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const {id} = req.query
  const response = await fetch(`https://api.kinocheck.de/movies?imdb_id=${id}`)
  const data = await response.json()
  res.json(data)
}
