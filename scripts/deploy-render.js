import https from "https";

/**
 * Script to deploy to Render via API or Deploy Hook, and update environment variables.
 * 
 * Usage options:
 * 
 * 1. Deploy Hook (instant trigger):
 *    node scripts/deploy-render.js --hook "https://api.render.com/deploy/srv-xxx?key=yyy"
 * 
 * 2. Render REST API (updates ADMIN_PASSWORD env var and triggers deploy):
 *    $env:RENDER_API_KEY="rnd_xxx"
 *    $env:RENDER_SERVICE_ID="srv-xxx"
 *    node scripts/deploy-render.js
 */

const args = process.argv.slice(2);
const hookIndex = args.indexOf("--hook");
const deployHookUrl = hookIndex !== -1 ? args[hookIndex + 1] : process.env.RENDER_DEPLOY_HOOK_URL;

const apiKey = process.env.RENDER_API_KEY;
const serviceId = process.env.RENDER_SERVICE_ID;
const newPassword = process.env.ADMIN_PASSWORD || "DaisyAdmin2026!SecureKey";

async function postRequest(url, headers = {}, body = null) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        resolve({ statusCode: res.statusCode, body: data });
      });
    });

    req.on("error", (err) => reject(err));
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function putRequest(url, headers = {}, body = null) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        resolve({ statusCode: res.statusCode, body: data });
      });
    });

    req.on("error", (err) => reject(err));
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function run() {
  console.log("=== Render API Deployment Tool ===\n");

  if (deployHookUrl) {
    console.log(`Triggering deployment via Deploy Hook...`);
    const res = await postRequest(deployHookUrl);
    console.log(`Status Code: ${res.statusCode}`);
    console.log(`Response: ${res.body}`);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log("\n✓ Deployment triggered successfully on Render!");
    } else {
      console.error("\n❌ Failed to trigger deployment via deploy hook.");
    }
    return;
  }

  if (apiKey && serviceId) {
    console.log(`1. Updating ADMIN_PASSWORD environment variable for Render Service: ${serviceId}...`);
    const envRes = await putRequest(
      `https://api.render.com/v1/services/${serviceId}/env-vars`,
      { Authorization: `Bearer ${apiKey}` },
      [{ key: "ADMIN_PASSWORD", value: newPassword }]
    );
    console.log(`   Env Update Status: ${envRes.statusCode}`);

    console.log(`2. Triggering Render Deployment via REST API...`);
    const deployRes = await postRequest(
      `https://api.render.com/v1/services/${serviceId}/deploys`,
      { Authorization: `Bearer ${apiKey}` }
    );
    console.log(`   Deploy Status: ${deployRes.statusCode}`);
    console.log(`   Response: ${deployRes.body}`);

    if (deployRes.statusCode >= 200 && deployRes.statusCode < 300) {
      console.log("\n✓ Render environment variable updated and deployment triggered successfully!");
    } else {
      console.error("\n❌ Failed to trigger deploy via Render REST API.");
    }
    return;
  }

  console.log("No Render API credentials found.\n");
  console.log("To deploy using this tool, provide one of the following:\n");
  console.log("Option A (Deploy Hook URL):");
  console.log("  node scripts/deploy-render.js --hook \"https://api.render.com/deploy/srv-xxx?key=yyy\"\n");
  console.log("Option B (Render API Key & Service ID):");
  console.log("  $env:RENDER_API_KEY=\"rnd_xxx\"");
  console.log("  $env:RENDER_SERVICE_ID=\"srv-xxx\"");
  console.log("  node scripts/deploy-render.js\n");
}

run().catch((err) => {
  console.error("Error executing Render deployment:", err);
  process.exit(1);
});
