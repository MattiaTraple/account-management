import { Hono } from "hono";
const app = new Hono<{ Bindings: Env }>();

app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

app.all("/api/auth/*", async (c) => {
  const url = new URL(c.req.url);
  const authPath = c.req.path.replace("/api/auth", "/auth");
  const backendUrl = `https://taskedsocial.it/api/v1${authPath}${url.search}`;

  const headers = new Headers();
  const contentType = c.req.header("content-type");
  if (contentType) headers.set("content-type", contentType);

  return fetch(backendUrl, {
    method: c.req.method,
    headers,
    body: c.req.method !== "GET" && c.req.method !== "HEAD" ? c.req.raw.body : undefined,
  });
});

export default app;
