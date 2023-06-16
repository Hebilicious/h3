import { createApp, createRouter, eventHandler, adapterFetch } from "../src";

const main = async () => {
  const app = createApp();
  const router = createRouter();
  router.get(
    "/hello",
    eventHandler((event) => {
      const request = event.request; // Request object, from the fetch API
      return new Response(`hello ${request.method}`);
    })
  );
  app.use(router);
  const fetchResponse = adapterFetch(app);
  const response = await fetchResponse(
    new Request(new URL("http://localhost/hello"))
  );
  console.log(await response.text()); // hello GET
  return response;
};
main();
