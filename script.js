const quotes = [
  { text: "작은 것들을 소중히 여기는 사람에게 큰 행복이 찾아온다.", author: "윌리엄 모리스", category: "마음" },
  { text: "성공은 열정을 잃지 않고 실패를 거듭하는 능력이다.", author: "윈스턴 처칠", category: "성장" },
  { text: "시작이 반이다.", author: "아리스토텔레스", category: "도전" },
  { text: "오늘 할 수 있는 일을 내일로 미루지 마라.", author: "벤저민 프랭클린", category: "실천" },
  { text: "삶이 있는 곳에 희망이 있다.", author: "마르쿠스 툴리우스 키케로", category: "희망" },
  { text: "배움에는 끝이 없다.", author: "공자", category: "배움" },
  { text: "가장 큰 영광은 결코 넘어지지 않는 것이 아니라, 넘어질 때마다 일어나는 데 있다.", author: "넬슨 만델라", category: "회복" },
  { text: "행복은 습관이다. 그것을 몸에 지녀라.", author: "엘버트 허버드", category: "행복" },
  { text: "꿈을 꿀 수 있다면, 그것을 이룰 수도 있다.", author: "월트 디즈니", category: "꿈" },
  { text: "사랑은 모든 것을 이긴다.", author: "베르길리우스", category: "사랑" },
  { text: "아무것도 시도하지 않으면 아무것도 얻을 수 없다.", author: "헬렌 켈러", category: "용기" },
  { text: "시간은 가장 현명한 조언자다.", author: "페리클레스", category: "시간" },
  { text: "자신을 믿어라. 그러면 이미 절반은 성공한 것이다.", author: "시어도어 루스벨트", category: "자신감" },
  { text: "좋은 일을 하는 데는 늦은 때란 없다.", author: "랠프 왈도 에머슨", category: "선의" },
  { text: "변화는 모든 진정한 배움의 최종 결과다.", author: "레오 버스카글리아", category: "변화" },
  { text: "한 걸음씩 내딛으면 길이 된다.", author: "노자", category: "여정" },
  { text: "우리가 생각하는 대로 우리는 된다.", author: "붓다", category: "생각" },
  { text: "미래는 오늘 무엇을 하는가에 달려 있다.", author: "마하트마 간디", category: "미래" },
  { text: "고난은 가끔 위장된 축복이다.", author: "오스카 와일드", category: "관점" },
  { text: "읽는 것은 마음의 여행이다.", author: "메리 셸리", category: "책" },
  { text: "내일은 오늘보다 더 나은 날이 될 것이다.", author: "존 웨인", category: "낙관" },
  { text: "단순함이 궁극의 정교함이다.", author: "레오나르도 다 빈치", category: "단순함" },
  { text: "인내는 쓰지만 그 열매는 달다.", author: "장 자크 루소", category: "인내" },
  { text: "자유는 책임을 의미한다. 그것이 대부분의 사람들이 자유를 두려워하는 이유다.", author: "조지 버나드 쇼", category: "자유" }
];

const quoteElement = document.querySelector("#quote");
const authorElement = document.querySelector("#author");
const categoryElement = document.querySelector("#category");
const countElement = document.querySelector("#quote-count");
const cardElement = document.querySelector(".quote-card");
const newQuoteButton = document.querySelector("#new-quote-button");
const copyButton = document.querySelector("#copy-button");
const toastElement = document.querySelector("#toast");
const lightThemeButton = document.querySelector("#light-theme-button");
const darkThemeButton = document.querySelector("#dark-theme-button");

let currentIndex = 0;
let shownCount = 1;
let toastTimer;

function setTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark-theme", isDark);
  lightThemeButton.classList.toggle("active", !isDark);
  darkThemeButton.classList.toggle("active", isDark);
  lightThemeButton.setAttribute("aria-pressed", String(!isDark));
  darkThemeButton.setAttribute("aria-pressed", String(isDark));
  localStorage.setItem("quote-theme", theme);
}

function getRandomIndex() {
  let nextIndex;
  do {
    nextIndex = Math.floor(Math.random() * quotes.length);
  } while (nextIndex === currentIndex && quotes.length > 1);
  return nextIndex;
}

function renderQuote(index) {
  const quote = quotes[index];
  quoteElement.textContent = quote.text;
  authorElement.textContent = `— ${quote.author}`;
  categoryElement.textContent = quote.category;
  countElement.textContent = String(shownCount).padStart(2, "0");
}

function showNewQuote() {
  currentIndex = getRandomIndex();
  shownCount = (shownCount % quotes.length) + 1;
  cardElement.classList.remove("fade-in");
  cardElement.classList.add("fade-out");

  window.setTimeout(() => {
    renderQuote(currentIndex);
    cardElement.classList.remove("fade-out");
    cardElement.classList.add("fade-in");
  }, 180);
}

async function copyQuote() {
  const quote = quotes[currentIndex];
  const textToCopy = `“${quote.text}” — ${quote.author}`;

  try {
    await navigator.clipboard.writeText(textToCopy);
    showToast("명언을 복사했어요.");
  } catch {
    showToast("복사하지 못했어요.");
  }
}

function showToast(message) {
  toastElement.textContent = message;
  toastElement.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toastElement.classList.remove("show"), 2200);
}

newQuoteButton.addEventListener("click", showNewQuote);
copyButton.addEventListener("click", copyQuote);
lightThemeButton.addEventListener("click", () => setTheme("light"));
darkThemeButton.addEventListener("click", () => setTheme("dark"));
setTheme(localStorage.getItem("quote-theme") || "light");
