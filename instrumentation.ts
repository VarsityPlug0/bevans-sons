export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { runFollowUps } = await import("./lib/followups");
    const { syncProductsFromJson } = await import("./lib/db");

    // Sync all committed products from data/products.json after startup.
    // Runs asynchronously so it never blocks the health check.
    setTimeout(() => {
      try { syncProductsFromJson(); } catch { /* non-fatal */ }
    }, 2_000);

    const run = async () => {
      try {
        const result = await runFollowUps();
        console.log("[scheduler] follow-ups:", result);
      } catch (e) {
        console.error("[scheduler] error:", e);
      }
    };

    // First run after 60s (let DB initialise)
    setTimeout(run, 60_000);

    // Then every 2 hours
    setInterval(run, 2 * 60 * 60 * 1000);
  }
}
