var PAGES = [
  { name: "Base", file: "../components/base.html" },
  { name: "Botones", file: "../components/buttons.html" },
  { name: "Formularios", file: "../components/forms.html" },
  { name: "Navegacion", file: "../components/navigation.html" },
  { name: "Feedback", file: "../components/feedback.html" },
  { name: "Contenedores", file: "../components/contenedores.html" },
  { name: "Datos", file: "../components/datos.html" },
  { name: "Interactivos", file: "../components/interactivos.html" }
];

function buildCleanDoc(html) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(html, "text/html");
  doc.querySelectorAll("script").forEach(function(s) { s.remove(); });
  var lang = doc.documentElement.getAttribute("lang") || "es";
  var bodyContent = doc.body.innerHTML;
  var origin = location.origin;
  var cleanHtml = "<!DOCTYPE html><html lang=\"" + lang + "\"><head><meta charset=\"UTF-8\"><link rel=\"stylesheet\" href=\"" + origin + "/CSS-Components/assets/css/master.css\"></head><body>" + bodyContent + "</body></html>";
  var cleanDoc = new DOMParser().parseFromString(cleanHtml, "text/html");
  return cleanDoc;
}

function renderViolation(v) {
  var h = '<div class="violation">';
  h += '<h4><span class="impact ' + v.impact + '">' + v.impact + '</span> ' + v.id + '</h4>';
  h += '<p>' + v.description + '</p>';
  if (v.help) h += '<p><em>' + v.help + '</em></p>';
  if (v.nodes && v.nodes.length > 0) {
    h += '<div class="nodes">' + v.nodes.length + ' element' + (v.nodes.length > 1 ? 's' : '') + ' affected';
    if (v.nodes[0] && v.nodes[0].html) h += '<br><code>' + v.nodes[0].html.substring(0, 120) + '</code>';
    h += '</div>';
  }
  h += '</div>';
  return h;
}

document.getElementById("audit-btn").addEventListener("click", function() {
  var btn = document.getElementById("audit-btn");
  var resultsEl = document.getElementById("results");
  var summaryEl = document.getElementById("summary");
  btn.disabled = true;
  btn.textContent = "Auditing...";
  resultsEl.innerHTML = "";
  summaryEl.style.display = "none";
  var totalViolations = 0;
  var pageIndex = 0;

  function auditNext() {
    if (pageIndex >= PAGES.length) {
      summaryEl.style.display = "block";
      summaryEl.innerHTML = PAGES.length + " pages audited - " + totalViolations + " total violations";
      btn.disabled = false;
      btn.textContent = "Run A11y Audit";
      return;
    }
    var page = PAGES[pageIndex];
    pageIndex++;
    btn.textContent = "Auditing " + page.name + "...";

    fetch(page.file)
      .then(function(resp) {
        if (!resp.ok) throw new Error("HTTP " + resp.status);
        return resp.text();
      })
      .then(function(html) {
        var cleanDoc = buildCleanDoc(html);
        return axe.run(cleanDoc);
      })
      .then(function(axeResults) {
        var violations = axeResults.violations;
        totalViolations += violations.length;
        var badgeClass = violations.length === 0 ? "pass" : "fail";
        var badgeText = violations.length === 0 ? "PASS" : violations.length + " issue" + (violations.length > 1 ? "s" : "");

        var inner = '<div class="page-header"><span>' + page.name + '</span><span class="badge ' + badgeClass + '">' + badgeText + '</span></div>';
        if (violations.length === 0) {
          inner += '<div class="no-violations">No violations found</div>';
        } else {
          for (var i = 0; i < violations.length; i++) inner += renderViolation(violations[i]);
        }

        var container = document.createElement("div");
        container.className = "page-result";
        container.innerHTML = inner;
        resultsEl.appendChild(container);
        auditNext();
      })
      .catch(function(e) {
        var container = document.createElement("div");
        container.className = "page-result";
        container.innerHTML = '<div class="page-header"><span>' + page.name + '</span><span class="badge fail">ERROR</span></div><div class="violation"><p>' + e.message + '</p></div>';
        resultsEl.appendChild(container);
        auditNext();
      });
  }

  auditNext();
});