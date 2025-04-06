const quotes = [
  {
    quote: "The greatest risk is the risk of riskless living.",
    author: "Stephen Covey",
  },
  {
    quote: "Well begun is half done.",
    author: "Aristotle",
  },
  {
    quote: "Wheresoever you go, go with all your heart.",
    author: "Confucius",
  },
  {
    quote: "Better a diamond with a flaw than a pebble without.",
    author: "Confucius",
  },
  { quote: "While there's life, there's hope.", author: "Cicero" },
  {
    quote: "Keep your face to the sunshine and you cannot see the shadow.",
    author: "Helen Keller",
  },
  {
    quote: "Those who cannot remember the past are condemned to repeat it.",
    author: "George Santayana",
  },
  {
    quote: "In the field of observation, chance favors only the prepared mind.",
    author: "Louis Pasteur",
  },
  {
    quote: "True life is lived when tiny changes occur.",
    author: "Leo Tolstoy",
  },
  {
    quote: "It's not how much we give, but how much love we put into giving.",
    author: "Mother Teresa",
  },
  {
    quote: "We can only learn to love by loving.",
    author: "Iris Murdoch",
  },
];

const quote = document.querySelector("#quote");
const spanBox = document.querySelector("#quote div");
const quoteSpan = document.querySelector("#quote div span");
const author = document.querySelector("#quote div span#author");

function showAuthor() {
  author.classList.remove("hidden");
}
function hideAuthor() {
  author.classList.add("hidden");
}

function random() {
  const num = Math.floor(Math.random() * quotes.length);
  quoteSpan.innerText = `"${quotes[num].quote}"`;
  author.innerText = quotes[num].author;
}

random();
spanBox.addEventListener("mouseenter", showAuthor);
spanBox.addEventListener("mouseleave", hideAuthor);
