const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs-extra");
const puppeteer = require("puppeteer");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("form");
});

app.post("/generate", async (req, res) => {
  const { name, father_name, property_size, sale_amount, date } = req.body;

  const templatePath = path.join(__dirname, "templates", "deed-template.html");
  let html = await fs.readFile(templatePath, "utf8");

  html = html
    .replace("{{name}}", name)
    .replace("{{father_name}}", father_name)
    .replace("{{property_size}}", property_size)
    .replace("{{sale_amount}}", sale_amount)
    .replace("{{date}}", date);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfPath = path.join(__dirname, "generated", `${Date.now()}_deed.pdf`);
  await page.pdf({ path: pdfPath, format: "A4" });

  await browser.close();

  res.download(pdfPath, "Sale-Deed.pdf", () => {
    fs.unlink(pdfPath); // delete after download
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
