#!/usr/bin/awk -f
# Semantic Basis Protocol — POSIX AWK consumer
# Compatible with mawk, nawk, gawk (POSIX match only — no 3-arg arrays).
# Reads NDJSON stream line by line.
# Each line is one atomic record (committed at \n boundary).
#
# Usage:
#   node stream.js emit multigraph.json | awk -f process.awk
#
# For richer parsing pipe through jq first:
#   node stream.js emit multigraph.json | jq -c '{type,id,face,sabIndex}' | awk -f process.awk

function extract(src, key,    pat, val, s, e) {
  # Extract value of "key":"value" or "key":number from JSON string.
  # POSIX-compatible: uses substr + index, no 3-arg match.
  pat = "\"" key "\":\"?"
  s = index(src, "\"" key "\":")
  if (s == 0) return ""
  s = s + length("\"" key "\":")
  # skip optional opening quote
  if (substr(src, s, 1) == "\"") s++
  val = substr(src, s)
  # find end: quote, comma, or brace
  e = length(val)
  for (i = 1; i <= length(val); i++) {
    c = substr(val, i, 1)
    if (c == "\"" || c == "," || c == "}" || c == "]") { e = i - 1; break }
  }
  return substr(val, 1, e)
}

BEGIN {
  basis = ""
  print "\u2500\u2500 Semantic Basis Protocol NDJSON Consumer (AWK/POSIX) \u2500\u2500"
}

/"type":"header"/ {
  basis = extract($0, "basisHash")
  print "BASIS: " substr(basis, 1, 16) "..."
  next
}

/"basisHash"/ {
  rec_basis = extract($0, "basisHash")
  if (rec_basis != basis && basis != "") {
    print "REJECTED (basis mismatch): " substr($0, 1, 60)
    next
  }
}

/"type":"node"/ {
  id     = extract($0, "id")
  face   = extract($0, "face")
  sab    = extract($0, "sabIndex")
  golden = extract($0, "isGoldenRoot")
  printf "NODE  sab=%-4s face=%-8s golden=%-5s id=%s\n", sab, face, golden, id
  next
}

/"type":"edge"/ {
  id    = extract($0, "id")
  drift = extract($0, "driftType")
  etype = extract($0, "edgeType")
  printf "EDGE  drift=%-12s type=%-10s id=%s\n", drift, etype, id
  next
}

/"sentinel":"STREAM_COMPLETE"/ {
  print "\u2500\u2500 STREAM COMPLETE \u2500\u2500"
  exit
}
