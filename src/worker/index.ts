import { Hono } from "hono";
const app = new Hono<{ Bindings: Env }>();

app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

// Gestione separata per verify-email: il backend risponde con redirect 302
app.get("/api/auth/verify-email", async (c) => {
  const url = new URL(c.req.url);
  const backendUrl = `https://taskedsocial.it/api/v1/auth/verify-email${url.search}`;

  const response = await fetch(backendUrl, {
    method: "GET",
    redirect: "manual",
  });

  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get("Location") ?? "/email-verification-error";
    return c.redirect(location, response.status as 301 | 302 | 303 | 307 | 308);
  }

  if (response.status === 400) {
    return c.redirect("/email-verification-error");
  }

  return response;
});

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
