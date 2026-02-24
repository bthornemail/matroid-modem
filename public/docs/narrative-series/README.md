# Narrative Series Templates

These markdown files are bootstrap narrative templates for the semantic runtime demo.

Scope:
- `America Constitution Series/`
- `When Wisdom, Law, and the Tribe Sat Down Together/`

How to compile:

```bash
npm run civic:compile -- "public/docs/narrative-series/America Constitution Series/Declaration of Independence.md" --basis founding-v1 --emit-synset --max 40 > civic.ndjson
```

Then ingest `civic.ndjson` via:
- the portal ingest box, or
- `POST /ingest` on the gateway.

These templates are editable starting points, not authoritative source-of-truth documents.

