// Utility: handle fetch with error display
async function apiRequest(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options
  });

  let data;
  try {
    data = await res.json();
  } catch (e) {
    throw new Error("Invalid server response");
  }

  if (!data.success) {
    throw new Error(data.error || "Unknown error");
  }

  return data;
}

// Navigation tabs
const navButtons = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".section");

navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const targetId = btn.dataset.target;
    navButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    sections.forEach(sec => {
      sec.classList.toggle("active", sec.id === targetId);
    });
  });
});

// Numbers logic (safe)
const numMinInput = document.getElementById("num-min");
const numMaxInput = document.getElementById("num-max");
const numCountInput = document.getElementById("num-count");
const numResultEl = document.getElementById("num-result");
const btnGenerateNum = document.getElementById("btn-generate-num");

if (btnGenerateNum) {
  btnGenerateNum.addEventListener("click", async () => {
    numResultEl.classList.remove("error");
    numResultEl.textContent = "Generating...";

    const min = numMinInput.value || "1";
    const max = numMaxInput.value || "100";
    const count = numCountInput.value || "1";

    const query = new URLSearchParams({ min, max, count }).toString();

    try {
      const data = await apiRequest(`/api/random/int?${query}`);
      numResultEl.textContent = data.results.join(", ");
    } catch (err) {
      numResultEl.classList.add("error");
      numResultEl.textContent = err.message;
    }
  });
}

// Lists logic
const listItemsInput = document.getElementById("list-items");
const listCountInput = document.getElementById("list-count");
const listUniqueInput = document.getElementById("list-unique");
const listResultEl = document.getElementById("list-result");
const btnPickList = document.getElementById("btn-pick-list");
const btnShuffleList = document.getElementById("btn-shuffle-list");

function parseListItems(raw) {
  return raw
    .split("\n")
    .map(x => x.trim())
    .filter(x => x.length > 0);
}

btnPickList.addEventListener("click", async () => {
  listResultEl.classList.remove("error");
  listResultEl.textContent = "Picking...";

  const items = parseListItems(listItemsInput.value);
  const count = listCountInput.value || "1";
  const unique = listUniqueInput.checked;

  try {
    const data = await apiRequest("/api/random/choice", {
      method: "POST",
      body: JSON.stringify({ items, count, unique })
    });

    listResultEl.textContent = data.results.join("\n");
  } catch (err) {
    listResultEl.classList.add("error");
    listResultEl.textContent = err.message;
  }
});

btnShuffleList.addEventListener("click", async () => {
  listResultEl.classList.remove("error");
  listResultEl.textContent = "Shuffling...";

  const items = parseListItems(listItemsInput.value);
  try {
    const data = await apiRequest("/api/random/shuffle", {
      method: "POST",
      body: JSON.stringify({ items })
    });

    listResultEl.textContent = data.results.join("\n");
  } catch (err) {
    listResultEl.classList.add("error");
    listResultEl.textContent = err.message;
  }
});

// Coin logic
const btnCoin = document.getElementById("btn-coin");
const coinResultEl = document.getElementById("coin-result");

if (btnCoin) {
btnCoin.addEventListener("click", async () => {
  coinResultEl.classList.remove("error");
  coinResultEl.textContent = "Flipping...";

  try {
    const data = await apiRequest("/api/random/coin");
    coinResultEl.textContent = data.result;
  } catch (err) {
    coinResultEl.classList.add("error");
    coinResultEl.textContent = err.message;
  }
});

}

// Dice logic
const diceFacesInput = document.getElementById("dice-faces");
const diceCountInput = document.getElementById("dice-count");
const diceResultEl = document.getElementById("dice-result");
const btnDice = document.getElementById("btn-dice");

btnDice.addEventListener("click", async () => {
  diceResultEl.classList.remove("error");
  diceResultEl.textContent = "Rolling...";

  const faces = diceFacesInput.value || "6";
  const count = diceCountInput.value || "1";
  const query = new URLSearchParams({ faces, count }).toString();

  try {
    const data = await apiRequest(`/api/random/dice?${query}`);
    diceResultEl.textContent = data.results.join(", ");
  } catch (err) {
    diceResultEl.classList.add("error");
    diceResultEl.textContent = err.message;
  }
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Set first nav button as active on load
navButtons[0].classList.add("active");

// Random Integer Generator (20k + columns)
const rngMin = document.getElementById("rng-min");
const rngMax = document.getElementById("rng-max");
const rngCount = document.getElementById("rng-count");
const rngCols = document.getElementById("rng-cols");
const rngResult = document.getElementById("rng-result");
const btnRng = document.getElementById("btn-rng-generate");

// format results into columns
function formatColumns(list, cols) {
  cols = Math.max(1, Math.min(cols, 20));
  const lines = [];
  for (let i = 0; i < list.length; i += cols) {
    lines.push(list.slice(i, i + cols).join("   "));
  }
  return lines.join("\n");
}

if (btnRng) {
  btnRng.addEventListener("click", async () => {
    rngResult.classList.remove("error");
    rngResult.textContent = "Generating...";

    const min = rngMin.value;
    const max = rngMax.value;
    const count = rngCount.value;

    const query = new URLSearchParams({ min, max, count }).toString();

    try {
      const data = await apiRequest(`/api/random/int?${query}`);
      const cols = parseInt(rngCols.value) || 1;
      rngResult.textContent = formatColumns(data.results, cols);
    } catch (err) {
      rngResult.classList.add("error");
      rngResult.textContent = err.message;
    }
  });
}

