import html from "bun-plugin-html";

await Bun.build({
  entrypoints: ["./src/index.html", "./src/index.js"],
  outdir: "./dist",
  plugins: [html()],
  minify: true,
});
