# Release Checklist — v0.1.0

## Cleanliness
- [ ] `git status` is clean (no uncommitted changes)
- [ ] `out/` and `*.tgz` are ignored and not tracked

## Provenance / Templates
- [ ] `npm run templates:manifest`
- [ ] `public/docs/narrative-series/templates.manifest.json` updated
- [ ] Manifest includes: `templatesVersion`, per-file `sha256`, `templatesMerkleRoot`, `generatedAt`

## Build / Demo
- [ ] `npm run build`
- [ ] `npm run demo:compile` -> produces `out/founding.ndjson`
- [ ] Start gateway: `BASIS=founding-v1 BASIS_HASH=0xdeadbeef npm start`
- [ ] `npm run demo:ingest` (or `npm run demo:founding`)
- [ ] Portal shows:
  - [ ] header provenance record
  - [ ] `synset_call` records
  - [ ] SAB UU/meta projection lights correct `w` column (e.g., `w=0.125` -> col 2)

## Packaging
- [ ] `npm pack --dry-run`
- [ ] Confirm shipped files are limited to:
  - [ ] `src/**`
  - [ ] selected `public/**` portal + PWA files
  - [ ] `scripts/**`
  - [ ] `bin/**`
  - [ ] `README.md`, `CHANGELOG.md` (and `LICENSE` if present)
  - [ ] template series: founding subsets only

## Publish Safety
- [ ] `package.json` has: `repository`, `homepage`, `bugs`, `license`, `engines.node`
- [ ] `publishConfig` set correctly (`access: public` or restricted as intended)
- [ ] Version bumped to `0.1.0`
- [ ] Tag created: `git tag v0.1.0`
- [ ] `npm publish`

## Post-publish
- [ ] Install from npm in a clean dir and run the demo end-to-end

