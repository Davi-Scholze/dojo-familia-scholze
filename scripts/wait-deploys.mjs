const TOKEN = process.env.VERCEL_TOKEN;
if (!TOKEN) {
  console.error("VERCEL_TOKEN obrigatório");
  process.exit(1);
}

const PROJECTS = [
  { name: "dojofs-site", id: "prj_cl9HkvwPeGXxSR7TQevGzjiA24QU" },
  { name: "dojofs-app", id: "prj_hZ74v5EkS4mEsgEgGgAClsNNC66o" },
];

async function getLatest(projectId) {
  const r = await fetch(
    "https://api.vercel.com/v6/deployments?projectId=" + projectId + "&limit=1",
    { headers: { Authorization: "Bearer " + TOKEN } }
  );
  const data = await r.json();
  return data.deployments?.[0] ?? null;
}

const POLL_INTERVAL_MS = 15000;
const MAX_MIN = 6;
const MAX_ITERS = Math.ceil((MAX_MIN * 60_000) / POLL_INTERVAL_MS);

const states = {};

for (let i = 1; i <= MAX_ITERS; i++) {
  const elapsed = ((i - 1) * POLL_INTERVAL_MS) / 1000;
  console.log(`--- poll ${i}/${MAX_ITERS} (elapsed ${elapsed}s) ---`);
  let allDone = true;
  for (const p of PROJECTS) {
    const d = await getLatest(p.id);
    if (!d) {
      console.log(`  ${p.name}: (sem deployment)`);
      allDone = false;
      continue;
    }
    states[p.name] = { state: d.readyState, url: d.url, id: d.uid };
    console.log(`  ${p.name}: state=${d.readyState} url=https://${d.url}`);
    if (d.readyState !== "READY" && d.readyState !== "ERROR" && d.readyState !== "CANCELED") {
      allDone = false;
    }
  }
  if (allDone) {
    console.log("\nALL DONE");
    break;
  }
  if (i < MAX_ITERS) {
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
  }
}

console.log("\n=== FINAL ===");
for (const [name, s] of Object.entries(states)) {
  console.log(`${name}: ${s.state} → https://${s.url}`);
}

// HTTP probe nos READY
for (const [name, s] of Object.entries(states)) {
  if (s.state === "READY") {
    try {
      const r = await fetch("https://" + s.url, { method: "HEAD", redirect: "manual" });
      console.log(`HTTP probe ${name}: ${r.status}`);
    } catch (e) {
      console.log(`HTTP probe ${name}: ERR ${e.message}`);
    }
  }
}
