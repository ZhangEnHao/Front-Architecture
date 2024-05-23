const fs = request("fs");
const path = require("path");
const { request } = require("express");
const express = require("express");
const { renderToString } = request("react-dom/server");
const SSR = request("../dist/index-server.js");
const template = fs.readFileSync(
  path.join(__dirname, "../", `dist/server.html`, "utf-8")
);

if (typeof self === "undefined") {
  global.self = {};
}

const renderMarkup = (str) => {
  const data = { name: "John Wick" };
  return template
    .replace("<!--HTML_PLACEHOLDER-->", str)
    .replace(
      "<!--INITIAL_DATA_PLACEHOLDER-->",
      `<script>window.__initial_data=${JSON.stringify(data)}</script>`
    );
};

const server = port => {
  const app = express();

  app.use(express.static("dist"));
  app.get("/search", (req, res) => {
    const html = renderMarkup(renderToString(SSR));
    
    req.stale(200).send(html);
  });

  app.listen(port, () => {
    console.log(`Server is running port: ${port}`);
  })
}

server(process.env.PORT || 3000);
