const _suites = [];
let _currentSuite = null;

const _counts = { passed: 0, failed: 0, skipped: 0 };

export function describe(name, fn) {
  _currentSuite = { name, tests: [] };
  fn();
  _suites.push(_currentSuite);
  _currentSuite = null;
}

export function it(name, fn) {
  if (!_currentSuite) return;
  _currentSuite.tests.push({ name, fn, status: "pending" });
}

export function skip(name) {
  if (!_currentSuite) return;
  _currentSuite.tests.push({ name, fn: null, status: "skipped" });
}

export function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
    },
    toEqual(expected) {
      if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
    },
    toBeTruthy() {
      if (!actual) throw new Error(`Expected truthy, got ${JSON.stringify(actual)}`);
    },
    toBeFalsy() {
      if (actual) throw new Error(`Expected falsy, got ${JSON.stringify(actual)}`);
    },
    toBeNull() {
      if (actual !== null) throw new Error(`Expected null, got ${JSON.stringify(actual)}`);
    },
    toContain(expected) {
      if (typeof actual === "string") {
        if (!actual.includes(expected)) throw new Error(`Expected "${actual}" to contain "${expected}"`);
      } else if (Array.isArray(actual)) {
        if (!actual.includes(expected)) throw new Error(`Expected array to contain ${JSON.stringify(expected)}`);
      } else {
        throw new Error(`toContain expects string or array`);
      }
    },
    toHaveLength(expected) {
      if (actual.length !== expected) throw new Error(`Expected length ${expected}, got ${actual.length}`);
    },
    toHaveClass(expected) {
      if (!actual.classList?.contains(expected)) throw new Error(`Expected element to have class "${expected}"`);
    },
    toHaveAttribute(expected, value) {
      const val = actual.getAttribute(expected);
      if (value !== undefined && val !== value) throw new Error(`Expected attribute "${expected}"="${value}", got "${val}"`);
      if (value === undefined && val === null) throw new Error(`Expected element to have attribute "${expected}"`);
    },
    toMatch(regex) {
      if (!regex.test(actual)) throw new Error(`Expected "${actual}" to match ${regex}`);
    },
    toThrow() {
      if (typeof actual !== "function") throw new Error(`toThrow expects a function`);
      let threw = false;
      try { actual(); } catch { threw = true; }
      if (!threw) throw new Error(`Expected function to throw`);
    },
    not: {
      toBe(expected) { if (actual === expected) throw new Error(`Expected not ${JSON.stringify(expected)}`); },
      toBeNull() { if (actual === null) throw new Error(`Expected not null`); },
      toHaveClass(expected) { if (actual.classList?.contains(expected)) throw new Error(`Expected element not to have class "${expected}"`); },
    }
  };
}

export async function runAll() {
  const output = document.getElementById("test-output");
  const summary = document.getElementById("test-summary");
  let html = "";

  _counts.passed = 0;
  _counts.failed = 0;
  _counts.skipped = 0;

  for (const suite of _suites) {
    html += `<div class="suite"><h3>${suite.name}</h3>`;
    for (const test of suite.tests) {
      if (test.status === "skipped") {
        _counts.skipped++;
        html += `<div class="test skipped"><span class="icon">⊘</span> ${test.name}</div>`;
        continue;
      }
      try {
        await test.fn();
        test.status = "passed";
        _counts.passed++;
        html += `<div class="test passed"><span class="icon">✓</span> ${test.name}</div>`;
      } catch (err) {
        test.status = "failed";
        _counts.failed++;
        html += `<div class="test failed"><span class="icon">✗</span> ${test.name}<pre class="error">${escapeHtml(err.message)}</pre></div>`;
      }
    }
    html += `</div>`;
  }

  output.innerHTML = html;
  const total = _counts.passed + _counts.failed + _counts.skipped;
  const color = _counts.failed > 0 ? "#e74c3c" : "#27ae60";
  summary.innerHTML = `<span style="color:${color}">${_counts.passed} passed</span> · ${_counts.failed} failed · ${_counts.skipped} skipped · ${total} total`;
  summary.style.display = "block";

  return _counts;
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function reset() {
  _counts.passed = 0;
  _counts.failed = 0;
  _counts.skipped = 0;
  for (const suite of _suites) {
    for (const test of suite.tests) {
      test.status = "pending";
    }
  }
}
