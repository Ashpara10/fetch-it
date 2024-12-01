import axios from "axios";
import { load } from "cheerio";
import cors from "cors";
import Express from "express";

const app = Express();

const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

function isValidUrl(url: string): boolean {
  return urlRegex.test(url);
}

app.use(cors());

app.get("/", (req, res) => {
  res.status(201).json({ health: "ok" });
});

app.get("/fetch", async (req, res) => {
  const url = req.query.url as string;
  const isValid = isValidUrl(url);
  if (!isValid) {
    console.log("herre");
    res.status(400).json({ data: null, error: "Invalid URL" });
  }
  const { data } = await axios.get(url);
  const $ = load(data);
  $("script").remove();
  $("style").remove();
  $("svg").remove();
  $("footer").remove();
  $("header").remove();
  $("aside").remove();
  $("picture").remove();
  $("video").remove();
  $("media").remove();
  $("*").removeAttr("class");
  $("*").removeAttr("style");

  const bodyHtml = $.root().find("body");
  bodyHtml.find("img").each((_, elem) => {
    $(elem).addClass("editor-image");
  });
  res.json({ data: bodyHtml.html(), error: null });
});

app.listen(8000, () => {
  console.log("Server is running on port http://localhost:8000");
});
