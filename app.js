// app.js
import { Hono } from "https://deno.land/x/hono/mod.ts";
import { serveStatic } from "https://deno.land/x/hono/middleware.ts";

// Initialize Hono app
const app = new Hono();

// Middleware for setting security headers
app.use('*', async (c, next) => {
  c.header(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'self'; font-src 'self'; frame-ancestors 'none'; form-action 'self';"
  );
  c.header('X-Content-Type-Options', 'nosniff');
  await next();
});

// Middleware for serving static files
app.use('/static/*', async (c, next) => {
  c.header(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'self'; font-src 'self'; frame-ancestors 'none'; form-action 'self';"
  );
  c.header('X-Content-Type-Options', 'nosniff');
  await serveStatic({ root: '.' })(c, next);
});

// Route for the index page
app.get('/', async (c) => {
  c.header(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'self'; font-src 'self'; frame-ancestors 'none'; form-action 'self';"
  );
  c.header('X-Content-Type-Options', 'nosniff');
  return c.html(await Deno.readTextFile('./views/index.html'));
});

// Route for the registration page
app.get('/register', async (c) => {
  c.header(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'self'; font-src 'self'; frame-ancestors 'none'; form-action 'self';"
  );
  c.header('X-Content-Type-Options', 'nosniff');
  return c.html(await Deno.readTextFile('./views/register.html'));
});

// Start the Deno server
Deno.serve(app.fetch);

// Run the app using the command:
// deno run --allow-net --allow-env --allow-read --watch app.js
