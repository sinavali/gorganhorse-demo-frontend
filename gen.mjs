import fs from "node:fs";
const NL = String.fromCharCode(10);
const DQ = String.fromCharCode(34);
const SQ = String.fromCharCode(39);
const pages = [["index",""],["dashboard","dashboard"],["horses","horses"],["members","members"],["events","events"],["health","health"],["finance","finance"],["reports","reports"],["notifications","notifications"],["audit","audit"],["settings","settings"],["portal","portal"]];
function at(n,v){ return n + "=" + DQ + v + DQ; }
for (const pair of pages) {
  const name = pair[0], gp = pair[1];
  const gpTag = gp ? "<script>window.GHF_PAGE=" + SQ + gp + SQ + ";</script>" + NL : "";
  const title = gp ? "Gorgan Horse Federation" : "Gorgan Horse Federation";
  const body =
    "<!DOCTYPE html>" + NL +
    "<html lang=" + DQ + "fa-IR" + DQ + " dir=" + DQ + "rtl" + DQ + ">" + NL +
    "<head>" + NL +
    "<meta charset=" + DQ + "UTF-8" + DQ + "/ >" + NL +
    "<meta name=" + DQ + "viewport" + DQ + " content=" + DQ + "width=device-width, initial-scale=1" + DQ + "/ >" + NL +
    "<title>" + title + "</title>" + NL +
    "<link rel=" + DQ + "stylesheet" + DQ + " href=" + DQ + "assets/app.css" + DQ + "/ >" + NL +
    "<link rel=" + DQ + "stylesheet" + DQ + " href=" + DQ + "assets/print.css" + DQ + " media=" + DQ + "print" + DQ + "/ >" + NL +
    "</head>" + NL +
    "<body>" + NL + gpTag +
    "<script src=" + DQ + "assets/i18n.js" + DQ + "></script>" + NL +
    "<script src=" + DQ + "assets/shell.js" + DQ + "></script>" + NL +
    "<script src=" + DQ + "assets/app.js" + DQ + "></script>" + NL +
    "</body>" + NL + "</html>" + NL;
  fs.writeFileSync(name + ".html", body, "utf8");
}
console.log("regenerated " + pages.length + " pages");
