const form = document.querySelector(".chat-form");
const input = form.querySelector("input");
const content = document.querySelector(".welcome-content");

let availableIngredients = [];
let shownDishNames = [];
let currentView = "suggestions";
let lastSuggestionsHTML = "";

const ingredientAliases = {
  rice: ["rice", "basmati"],
  tomato: ["tomatoes", "tomato"],
  onion: ["onions", "onion"],
  potato: ["potatoes", "potato"],
  carrot: ["carrots", "carrot"],
  beans: ["green beans", "beans"],
  peas: ["green peas", "peas"],
  spinach: ["spinach", "palak"],
  egg: ["eggs", "egg"],
  chicken: ["chicken"],
  coconut: ["coconut", "grated coconut"],
  lentils: ["lentils", "dal", "dhal", "toor dal", "moong dal"],
  chickpeas: ["chickpeas", "chana", "chole"],
  dosa_batter: ["dosa batter", "idli batter", "batter"],
  bread: ["bread"],
  lemon: ["lemon", "lemons"],
  garlic: ["garlic"],
  ginger: ["ginger"],
  capsicum: ["capsicum", "bell pepper", "bell peppers"],
  cauliflower: ["cauliflower"],
  aubergine: ["aubergine", "brinjal", "eggplant"],
  okra: ["okra", "lady's finger", "ladies finger"],
  fish: ["fish"],
  paneer: ["paneer"],
  oats: ["oats", "oatmeal"],
  green_chilli: ["green chillies", "green chilli", "green chilies", "green chili", "chilli", "chillies", "chili", "chilies"],
  coriander: ["fresh coriander", "coriander leaves", "coriander"],
  mint: ["mint leaves", "fresh mint", "mint"],
  curry_leaves: ["curry leaves"],
  cumin: ["cumin seeds", "cumin"],
  mustard_seeds: ["mustard seeds"],
  coriander_powder: ["coriander powder"],
  turmeric: ["turmeric powder", "turmeric"],
  garam_masala: ["garam masala"],
  oil: ["cooking oil", "oil"],
  salt: ["salt"]
};

const dishes = [
  { name: "Tomato Thokku", main: ["tomato", "onion"], extras: ["green_chilli", "garlic", "oil", "salt"], time: "25 minutes", description: "A tangy tomato accompaniment for rice or dosa." },
  { name: "Tomato Rice", main: ["rice", "tomato", "onion"], extras: ["green_chilli", "garlic", "ginger", "curry_leaves", "mustard_seeds", "oil", "salt"], time: "25 minutes", description: "Tangy South Indian tomato rice." },
  { name: "Potato Masala", main: ["potato", "onion"], extras: ["green_chilli", "ginger", "turmeric", "mustard_seeds", "curry_leaves", "oil", "salt"], time: "25 minutes", description: "Soft potatoes cooked with onion and spices." },
  { name: "Potato Roast", main: ["potato"], extras: ["green_chilli", "garlic", "turmeric", "cumin", "oil", "salt"], time: "30 minutes", description: "A crispy, spiced potato side dish." },
  { name: "Tomato Rasam", main: ["tomato"], extras: ["garlic", "ginger", "green_chilli", "cumin", "coriander", "salt"], time: "20 minutes", description: "A comforting, tangy South Indian soup." },
  { name: "Vegetable Rice", main: ["rice", "carrot", "peas", "onion"], extras: ["green_chilli", "ginger", "garlic", "cumin", "oil", "salt"], time: "25 minutes", description: "Rice cooked with vegetables and spices." },
  { name: "Egg Fried Rice", main: ["rice", "egg", "onion"], extras: ["garlic", "ginger", "green_chilli", "oil", "salt"], time: "15 minutes", description: "A quick meal using cooked rice and eggs." },
  { name: "Chicken Tomato Curry", main: ["chicken", "tomato", "onion"], extras: ["garlic", "ginger", "green_chilli", "coriander", "turmeric", "garam_masala", "salt"], time: "40 minutes", description: "Homestyle chicken curry with tomato gravy." },
  { name: "Chana Masala", main: ["chickpeas", "tomato", "onion"], extras: ["garlic", "ginger", "green_chilli", "coriander", "cumin", "garam_masala", "salt"], time: "30 minutes", description: "Chickpeas in a spiced tomato sauce." },
  { name: "Spinach Dal", main: ["spinach", "lentils", "onion"], extras: ["garlic", "ginger", "green_chilli", "cumin", "turmeric", "salt"], time: "30 minutes", description: "Lentils cooked with spinach." },
  { name: "Carrot and Beans Poriyal", main: ["carrot", "beans"], extras: ["coconut", "green_chilli", "mustard_seeds", "curry_leaves", "oil", "salt"], time: "20 minutes", description: "A colourful South Indian vegetable side." },
  { name: "Capsicum Potato Fry", main: ["capsicum", "potato"], extras: ["green_chilli", "garlic", "cumin", "oil", "salt"], time: "25 minutes", description: "Pan-fried capsicum and potato." },
  { name: "Brinjal Curry", main: ["aubergine", "tomato", "onion"], extras: ["garlic", "green_chilli", "coriander", "cumin", "turmeric", "oil", "salt"], time: "30 minutes", description: "Brinjal cooked in a savoury tomato gravy." },
  { name: "Okra Poriyal", main: ["okra", "onion"], extras: ["green_chilli", "curry_leaves", "mustard_seeds", "oil", "salt"], time: "20 minutes", description: "A simple South Indian okra stir-fry." },
  { name: "Paneer Tomato Curry", main: ["paneer", "tomato", "onion"], extras: ["garlic", "ginger", "green_chilli", "coriander", "garam_masala", "salt"], time: "30 minutes", description: "Paneer in a gently spiced tomato gravy." },
  { name: "Coconut Chutney", main: ["coconut"], extras: ["green_chilli", "ginger", "salt", "mustard_seeds", "curry_leaves", "oil"], time: "10 minutes", description: "A classic accompaniment for idli and dosa." },
  { name: "Lemon Rice", main: ["rice", "lemon"], extras: ["green_chilli", "mustard_seeds", "curry_leaves", "turmeric", "oil", "salt"], time: "15 minutes", description: "Zesty rice with South Indian flavours." },
  { name: "Vegetable Kurma", main: ["carrot", "peas", "potato", "onion"], extras: ["coconut", "ginger", "garlic", "green_chilli", "mint", "coriander", "salt"], time: "35 minutes", description: "Mixed vegetables in coconut gravy." },
  { name: "Dosa", main: ["dosa_batter"], extras: ["oil"], time: "15 minutes", description: "Crispy dosa made from ready batter." },
  { name: "Bread Omelette", main: ["bread", "egg", "onion"], extras: ["green_chilli", "coriander", "oil", "salt"], time: "10 minutes", description: "A quick egg and bread meal." },
  { name: "Oats Porridge", main: ["oats"], extras: [], time: "10 minutes", description: "A simple, quick breakfast." },
  { name: "Fish Tomato Curry", main: ["fish", "tomato", "onion"], extras: ["garlic", "ginger", "green_chilli", "coriander", "turmeric", "salt"], time: "30 minutes", description: "Fish simmered in tangy tomato gravy." },
  { name: "Cauliflower Poriyal", main: ["cauliflower", "onion"], extras: ["green_chilli", "curry_leaves", "mustard_seeds", "turmeric", "oil", "salt"], time: "20 minutes", description: "A lightly spiced cauliflower stir-fry." }
];

// Recipes are designed for approximately 2 servings.
// Adjust salt, chilli and cooking time to taste and ingredient size.
const recipes = {
  "Tomato Thokku": {
    prep: "10 minutes", cook: "15 minutes",
    ingredients: ["2 medium tomatoes, finely chopped", "1 small onion, chopped", "2 garlic cloves, crushed (optional)", "1 green chilli, chopped (optional)", "1½ tbsp oil", "Salt to taste"],
    steps: ["Heat the oil in a pan over medium heat.", "Add the onion and cook for 3–4 minutes until softened.", "Add garlic and green chilli, if using, and stir briefly.", "Add the tomatoes and salt. Cook, stirring regularly, until the tomatoes break down and the mixture thickens.", "Taste, adjust the seasoning and serve with rice, dosa or idli."]
  },
  "Tomato Rice": {
    prep: "10 minutes", cook: "15 minutes",
    ingredients: ["150 g uncooked rice, rinsed", "2 medium tomatoes, chopped", "1 small onion, sliced", "1 green chilli, slit (optional)", "1 garlic clove, chopped (optional)", "½ tsp mustard seeds (optional)", "6–8 curry leaves (optional)", "1 tbsp oil", "¼ tsp turmeric (optional)", "Salt to taste", "Water according to your rice packet"],
    steps: ["Cook the rice according to its packet instructions. Spread it out and allow it to cool slightly.", "Heat oil in a pan. Add mustard seeds and curry leaves if available.", "Add onion and cook until softened. Stir in garlic and chilli if using.", "Add tomatoes, turmeric and salt. Cook until the tomatoes form a thick sauce.", "Add the cooked rice and gently mix until evenly coated. Heat through and serve."]
  },
  "Potato Masala": {
    prep: "10 minutes", cook: "15 minutes",
    ingredients: ["2 medium potatoes, peeled and diced", "1 medium onion, sliced", "1 green chilli, chopped (optional)", "1 tsp grated ginger (optional)", "¼ tsp turmeric", "½ tsp mustard seeds (optional)", "6 curry leaves (optional)", "1 tbsp oil", "Salt to taste", "Water as needed"],
    steps: ["Boil the potatoes in water until tender, then drain.", "Heat oil in a pan. Add mustard seeds and curry leaves if using.", "Add onion, chilli and ginger. Cook until the onion softens.", "Add turmeric, salt and the cooked potatoes.", "Gently break up a few potato pieces and mix. Add a splash of water if needed, cook for 2–3 minutes and serve."]
  },
  "Potato Roast": {
    prep: "10 minutes", cook: "20 minutes",
    ingredients: ["3 medium potatoes, diced small", "1½ tbsp oil", "½ tsp cumin seeds (optional)", "2 garlic cloves, chopped (optional)", "¼ tsp turmeric", "½ tsp chilli powder or 1 green chilli (optional)", "Salt to taste"],
    steps: ["Boil or microwave the diced potatoes until just tender; drain well.", "Heat oil in a wide pan. Add cumin and garlic if using.", "Add potatoes, turmeric and salt. Stir to coat.", "Cook over medium heat for 12–18 minutes, turning occasionally, until golden and crisp in places.", "Add chilli to taste, check the seasoning and serve."]
  },
  "Tomato Rasam": {
    prep: "5 minutes", cook: "15 minutes",
    ingredients: ["2 medium tomatoes, chopped", "2 garlic cloves, crushed (optional)", "½ tsp cumin seeds (optional)", "1 green chilli, slit (optional)", "¼ tsp turmeric (optional)", "500 ml water", "1 tbsp chopped coriander (optional)", "Salt to taste"],
    steps: ["Place tomatoes, garlic, cumin, chilli, turmeric and water in a saucepan.", "Bring to a boil, then simmer for 10–12 minutes until the tomatoes soften.", "Lightly mash the tomatoes with a spoon.", "Add salt and simmer for another 2–3 minutes. Add a little more water if you prefer a thinner rasam.", "Stir in coriander if available and serve hot."]
  },
  "Vegetable Rice": {
    prep: "10 minutes", cook: "20 minutes",
    ingredients: ["150 g uncooked rice, rinsed", "1 medium carrot, diced", "75 g peas", "1 small onion, sliced", "1 tbsp oil", "½ tsp cumin seeds (optional)", "1 tsp grated ginger (optional)", "Salt to taste", "Water according to your rice packet"],
    steps: ["Heat oil in a saucepan and add cumin if available.", "Add onion and ginger; cook for 2–3 minutes.", "Add carrot and peas and stir for another 2 minutes.", "Add the rinsed rice, salt and the amount of water recommended for your rice.", "Bring to a boil, cover and cook on low heat until the rice and vegetables are tender. Rest for 5 minutes before fluffing and serving."]
  },
  "Egg Fried Rice": {
    prep: "5 minutes", cook: "10 minutes",
    ingredients: ["300 g cooked, chilled rice", "2 eggs", "1 small onion, finely chopped", "1 garlic clove, chopped (optional)", "1 tsp grated ginger (optional)", "1 tbsp oil", "Salt and pepper to taste"],
    steps: ["Use rice that has been cooled promptly and refrigerated; break up any clumps.", "Heat half the oil in a pan. Beat the eggs, scramble until fully cooked, then transfer to a plate.", "Add the remaining oil and cook the onion until softened. Add garlic and ginger if using.", "Add the rice and stir-fry until steaming hot throughout.", "Return the cooked egg to the pan, season and mix. Serve immediately."]
  },
  "Chicken Tomato Curry": {
    prep: "10 minutes", cook: "30 minutes",
    ingredients: ["300 g boneless chicken, cut into small pieces", "2 medium tomatoes, chopped", "1 medium onion, chopped", "2 garlic cloves, crushed", "1 tsp grated ginger", "½ tsp turmeric", "1 tsp garam masala (optional)", "1 tbsp oil", "150 ml water, plus more if needed", "Salt and chilli to taste", "Fresh coriander (optional)"],
    steps: ["Heat oil in a saucepan. Cook the onion until softened and lightly golden.", "Add garlic and ginger and stir for 30 seconds.", "Add tomatoes, turmeric, garam masala, chilli if using and salt. Cook until the tomatoes soften.", "Add the chicken and stir to coat. Add water, cover and simmer gently, stirring occasionally.", "Cook until the chicken is fully cooked through with no pink in the centre; a thermometer should reach 75°C. Add a splash of water if needed.", "Check the seasoning, garnish with coriander if available and serve."]
  },
  "Chana Masala": {
    prep: "10 minutes", cook: "20 minutes",
    ingredients: ["1 × 400 g can chickpeas, drained and rinsed", "2 medium tomatoes, chopped", "1 medium onion, chopped", "2 garlic cloves, crushed", "1 tsp grated ginger", "½ tsp cumin seeds (optional)", "1 tsp garam masala (optional)", "1 tbsp oil", "150 ml water", "Salt and chilli to taste", "Fresh coriander (optional)"],
    steps: ["Heat oil in a pan. Add cumin if using, then cook the onion until soft.", "Add garlic and ginger and stir for 30 seconds.", "Add tomatoes, garam masala, chilli if using and salt. Cook until thick and soft.", "Stir in the chickpeas and water. Simmer for 12–15 minutes.", "Mash a few chickpeas against the side of the pan to thicken the sauce.", "Taste, adjust the seasoning and garnish with coriander if available."]
  },
  "Spinach Dal": {
    prep: "10 minutes", cook: "25 minutes",
    ingredients: ["150 g dried red lentils, rinsed", "100–150 g spinach, washed", "1 small onion, chopped", "2 garlic cloves, chopped", "¼ tsp turmeric", "½ tsp cumin (optional)", "600 ml water, plus more if needed", "1 tbsp oil", "Salt to taste", "Green chilli or ginger (optional)"],
    steps: ["Rinse the lentils and place in a saucepan with water and turmeric.", "Bring to a boil, reduce the heat and simmer until the lentils are soft, about 15–20 minutes. Add water if needed.", "In a separate pan, heat oil and cook the onion until softened.", "Add garlic and cumin, plus chilli or ginger if using. Stir briefly.", "Add the spinach and cook until wilted.", "Mix the spinach mixture into the cooked lentils, season with salt and simmer for 3–5 minutes."]
  },
  "Carrot and Beans Poriyal": {
    prep: "10 minutes", cook: "10 minutes",
    ingredients: ["1 medium carrot, diced", "150 g green beans, trimmed and chopped", "1 tbsp oil", "½ tsp mustard seeds (optional)", "6 curry leaves (optional)", "1 green chilli, chopped (optional)", "2 tbsp grated coconut (optional)", "Salt to taste", "3 tbsp water"],
    steps: ["Heat oil in a pan and add mustard seeds. When they pop, add curry leaves and chilli if using.", "Add the carrot, beans, salt and water.", "Cover and cook on low-medium heat for 7–10 minutes, stirring occasionally, until tender but not mushy.", "Remove the lid and allow excess water to evaporate.", "Stir in grated coconut if available and cook for another minute. Serve as a side dish."]
  },
  "Capsicum Potato Fry": {
    prep: "10 minutes", cook: "15 minutes",
    ingredients: ["2 medium potatoes, diced", "1 large capsicum, chopped", "1 small onion, sliced (optional)", "1 tbsp oil", "½ tsp cumin (optional)", "1 garlic clove, chopped (optional)", "Salt and chilli to taste"],
    steps: ["Boil or microwave the potatoes until just tender, then drain.", "Heat oil in a pan and add cumin and garlic if using.", "Add onion if using and cook until softened.", "Add the potatoes and cook for 5 minutes, stirring gently.", "Add capsicum, salt and chilli to taste. Cook for another 5–7 minutes until the capsicum is tender but still holds its shape."]
  },
  "Brinjal Curry": {
    prep: "10 minutes", cook: "20 minutes",
    ingredients: ["1 medium aubergine, diced", "2 medium tomatoes, chopped", "1 small onion, chopped", "2 garlic cloves, chopped", "½ tsp cumin (optional)", "¼ tsp turmeric", "1 tbsp oil", "150 ml water", "Salt and chilli to taste", "Fresh coriander (optional)"],
    steps: ["Heat oil in a pan and cook the onion until softened.", "Add garlic and cumin if using; stir briefly.", "Add tomatoes, turmeric, chilli if using and salt. Cook until the tomatoes soften.", "Add aubergine and water. Stir, cover and simmer for 12–15 minutes, stirring occasionally.", "Cook until the aubergine is tender and the sauce has thickened. Add a splash of water if it becomes too dry.", "Garnish with coriander if available and serve."]
  },
  "Okra Poriyal": {
    prep: "10 minutes", cook: "10 minutes",
    ingredients: ["250 g okra, washed and thoroughly dried", "1 small onion, sliced", "1 tbsp oil", "½ tsp mustard seeds (optional)", "6 curry leaves (optional)", "1 green chilli (optional)", "Salt to taste"],
    steps: ["Cut the dry okra into small pieces. Keeping it dry helps reduce sliminess.", "Heat oil in a wide pan. Add mustard seeds and curry leaves if using.", "Add onion and chilli and cook for 2–3 minutes.", "Add okra and stir gently. Cook uncovered over medium heat for 8–12 minutes, turning occasionally.", "Season with salt near the end and cook until the okra is tender. Avoid adding water."]
  },
  "Paneer Tomato Curry": {
    prep: "10 minutes", cook: "20 minutes",
    ingredients: ["200 g paneer, cubed", "2 medium tomatoes, chopped", "1 small onion, chopped", "2 garlic cloves, crushed", "1 tsp grated ginger", "½ tsp garam masala (optional)", "1 tbsp oil", "100 ml water", "Salt and chilli to taste", "Fresh coriander (optional)"],
    steps: ["Heat oil in a pan and cook the onion until soft.", "Add garlic and ginger and stir briefly.", "Add tomatoes, garam masala, chilli if using and salt. Cook until the tomatoes break down.", "Add water and simmer for 4–5 minutes to make a sauce.", "Add paneer and simmer gently for 4–5 minutes until heated through. Avoid prolonged boiling, which can make paneer firm.", "Garnish with coriander if available and serve."]
  },
  "Coconut Chutney": {
    prep: "5 minutes", cook: "5 minutes",
    ingredients: ["100 g grated coconut, fresh or frozen and thawed", "1 small green chilli (optional)", "1 tsp grated ginger (optional)", "60–100 ml water, as needed", "Salt to taste", "½ tsp mustard seeds (optional)", "4–6 curry leaves (optional)", "1 tsp oil (optional)"],
    steps: ["Blend the coconut, chilli, ginger, salt and enough water to make a smooth or slightly textured chutney.", "Add more water a little at a time until it reaches your preferred consistency.", "For an optional tempering, heat the oil in a small pan.", "Add mustard seeds and allow them to pop, then add curry leaves.", "Pour the tempering over the chutney and serve fresh with dosa or idli. Refrigerate leftovers promptly."]
  },
  "Lemon Rice": {
    prep: "5 minutes", cook: "10 minutes",
    ingredients: ["300 g cooked rice, cooled slightly", "1 lemon, juiced", "1 tbsp oil", "½ tsp mustard seeds (optional)", "6 curry leaves (optional)", "1 green chilli, chopped (optional)", "¼ tsp turmeric", "Salt to taste"],
    steps: ["If cooking rice fresh, cook it first and let it cool slightly so the grains remain separate.", "Heat oil in a pan. Add mustard seeds and curry leaves if using.", "Add chilli and turmeric and stir for a few seconds.", "Add the rice and salt. Mix gently until evenly coated and hot.", "Turn off the heat, add lemon juice and mix well.", "Taste and adjust the lemon and salt before serving."]
  },
  "Vegetable Kurma": {
    prep: "15 minutes", cook: "20 minutes",
    ingredients: ["1 medium carrot, diced", "1 medium potato, diced", "75 g peas", "1 small onion, chopped", "50 g grated coconut", "1 garlic clove", "1 tsp grated ginger", "1 tbsp oil", "350 ml water, approximately", "Salt and chilli to taste", "Fresh mint or coriander (optional)"],
    steps: ["Blend the coconut, garlic, ginger and a little water into a smooth paste.", "Heat oil in a saucepan and cook the onion until softened.", "Add carrot, potato and peas. Stir for 2 minutes.", "Add the coconut paste, water, salt and chilli if using.", "Bring to a gentle boil, then cover and simmer for 12–18 minutes until all the vegetables are tender.", "Adjust the thickness with water and garnish with mint or coriander if available."]
  },
  "Dosa": {
    prep: "2 minutes", cook: "10–15 minutes",
    ingredients: ["250–300 ml ready dosa batter", "1–2 tsp oil for cooking", "Water, only if needed to thin the batter"],
    steps: ["Stir the batter. If it is very thick, add a little water until it pours easily.", "Heat a flat non-stick or seasoned pan over medium-high heat.", "Lightly grease the pan. Pour a ladle of batter into the centre and spread it in circles to form a thin round.", "Drizzle a little oil around the edges and cook until the underside is golden and the top looks set.", "Flip for 30–60 seconds if you prefer both sides cooked, or fold when crisp. Repeat with the remaining batter."]
  },
  "Bread Omelette": {
    prep: "3 minutes", cook: "7 minutes",
    ingredients: ["2 eggs", "2 slices of bread", "¼ small onion, finely chopped", "1 tbsp chopped coriander (optional)", "1 green chilli, finely chopped (optional)", "1 tsp oil", "Salt and pepper to taste"],
    steps: ["Beat the eggs in a bowl with onion, coriander if using, chilli if using, salt and pepper.", "Heat oil in a non-stick frying pan over medium heat.", "Pour in the egg mixture and tilt the pan so it spreads evenly.", "Place the bread slices on the egg while it is still wet, then carefully flip the omelette so the bread side meets the pan.", "Cook until the egg is fully set. Fold the omelette around the bread and serve hot."]
  },
  "Oats Porridge": {
    prep: "1 minute", cook: "5 minutes",
    ingredients: ["80 g rolled oats", "400 ml milk or water", "Pinch of salt (optional)", "Fruit, cinnamon or a little honey (optional)"],
    steps: ["Place the oats and milk or water in a saucepan.", "Bring to a gentle simmer, stirring regularly.", "Cook for 4–6 minutes until creamy, adding a little more liquid if needed.", "Add a small pinch of salt if desired.", "Serve warm with your preferred toppings."]
  },
  "Fish Tomato Curry": {
    prep: "10 minutes", cook: "20 minutes",
    ingredients: ["300 g boneless fish fillets, cut into large pieces", "2 medium tomatoes, chopped", "1 small onion, chopped", "2 garlic cloves, crushed", "1 tsp grated ginger", "¼ tsp turmeric", "1 tbsp oil", "150 ml water", "Salt and chilli to taste", "Fresh coriander (optional)"],
    steps: ["Heat oil in a pan and cook the onion until softened.", "Add garlic and ginger and stir briefly.", "Add tomatoes, turmeric, chilli if using and salt. Cook until the tomatoes form a thick sauce.", "Add water and simmer for 5 minutes.", "Gently add the fish pieces and spoon sauce over them. Simmer gently until the fish is opaque and flakes easily, usually 5–10 minutes depending on thickness.", "Avoid stirring roughly so the fish stays in pieces. Garnish with coriander if available and serve."]
  },
  "Cauliflower Poriyal": {
    prep: "10 minutes", cook: "10 minutes",
    ingredients: ["300 g cauliflower florets", "1 small onion, sliced", "1 tbsp oil", "½ tsp mustard seeds (optional)", "6 curry leaves (optional)", "¼ tsp turmeric", "1 green chilli (optional)", "Salt to taste", "2–3 tbsp water"],
    steps: ["Wash the cauliflower and cut it into small florets.", "Heat oil in a pan. Add mustard seeds and curry leaves if using.", "Add onion and chilli and cook until the onion softens.", "Add cauliflower, turmeric, salt and water.", "Cover and cook for 7–10 minutes, stirring occasionally, until tender but not mushy.", "Remove the lid and cook off any remaining water. Taste and serve."]
  }
};

function containsWord(text, phrase) {
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp("(^|[^a-z])" + escaped + "([^a-z]|$)", "i").test(text);
}

function findIngredients(question) {
  return Object.entries(ingredientAliases)
    .filter(([, aliases]) => aliases.some(alias => containsWord(question, alias)))
    .map(([ingredient]) => ingredient);
}

function ingredientLabel(ingredient) {
  const labels = {
    tomato: "tomatoes",
    potato: "potatoes",
    lentils: "lentils / dal",
    dosa_batter: "dosa or idli batter",
    aubergine: "brinjal",
    green_chilli: "green chillies",
    coriander: "fresh coriander",
    mint: "fresh mint",
    curry_leaves: "curry leaves",
    cumin: "cumin seeds",
    mustard_seeds: "mustard seeds",
    coriander_powder: "coriander powder",
    garam_masala: "garam masala"
  };
  return labels[ingredient] || ingredient.replaceAll("_", " ");
}

function getAvailableDishes() {
  return dishes.filter(dish =>
    dish.main.every(ingredient => availableIngredients.includes(ingredient))
  );
}

function createResultArea() {
  let result = content.querySelector(".chat-result");

  if (!result) {
    result = document.createElement("div");
    result.className = "chat-result";
    result.style.cssText =
      "margin-top:24px;padding:20px;background:#f0f6ef;border-radius:14px;text-align:left;line-height:1.6;color:#234b35;";
    content.appendChild(result);
  }

  return result;
}

function makeButton(label, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.style.cssText =
    "padding:10px 16px;margin:8px 8px 0 0;border:0;border-radius:8px;background:#176b43;color:white;font-weight:600;cursor:pointer;";
  button.addEventListener("click", onClick);
  return button;
}

function showRecipe(dish) {
  const recipe = recipes[dish.name];
  const result = createResultArea();

  if (!recipe) {
    result.textContent = "Sorry, the full recipe for this dish is not available yet.";
    return;
  }

  currentView = "recipe";
  result.replaceChildren();

const back = makeButton("← Back to suggestions", () => {
  result.innerHTML = lastSuggestionsHTML;
  currentView = "suggestions";
  result.scrollIntoView({ behavior: "smooth", block: "nearest" });
});
back.style.marginTop = "0";
result.appendChild(back);

  const title = document.createElement("h2");
  title.textContent = "🍲 " + dish.name;
  title.style.cssText = "margin:18px 0 8px;color:#176b43;font-size:26px;";
  result.appendChild(title);

  const intro = document.createElement("p");
  intro.textContent = dish.description;
  result.appendChild(intro);

  const timing = document.createElement("p");
  timing.style.cssText = "font-weight:600;";
  timing.textContent =
    "Serves 2 · Preparation: " + recipe.prep + " · Cooking: " + recipe.cook;
  result.appendChild(timing);

  const ingredientHeading = document.createElement("h3");
  ingredientHeading.textContent = "Ingredients";
  ingredientHeading.style.color = "#176b43";
  result.appendChild(ingredientHeading);

  const ingredientNote = document.createElement("p");
  ingredientNote.textContent =
    "Tick ingredients as you prepare them. Optional ingredients are labelled.";
  result.appendChild(ingredientNote);

  const ingredientList = document.createElement("div");
  ingredientList.style.cssText =
    "padding:12px 16px;background:white;border-radius:10px;border:1px solid #dce8da;";

  recipe.ingredients.forEach(item => {
    const label = document.createElement("label");
    label.style.cssText =
      "display:flex;gap:10px;align-items:flex-start;margin:8px 0;cursor:pointer;";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.style.marginTop = "6px";

    const text = document.createElement("span");
    text.textContent = item;

    checkbox.addEventListener("change", () => {
      text.style.textDecoration = checkbox.checked ? "line-through" : "none";
      text.style.opacity = checkbox.checked ? "0.65" : "1";
    });

    label.append(checkbox, text);
    ingredientList.appendChild(label);
  });

  result.appendChild(ingredientList);

  const stepsHeading = document.createElement("h3");
  stepsHeading.textContent = "Step-by-step instructions";
  stepsHeading.style.cssText = "margin-top:22px;color:#176b43;";
  result.appendChild(stepsHeading);

  recipe.steps.forEach((step, index) => {
    const stepCard = document.createElement("div");
    stepCard.style.cssText =
      "display:flex;gap:12px;align-items:flex-start;margin:10px 0;padding:14px;background:white;border:1px solid #dce8da;border-radius:10px;";

    const number = document.createElement("span");
    number.textContent = String(index + 1);
    number.style.cssText =
      "flex:0 0 28px;height:28px;border-radius:50%;background:#176b43;color:white;display:flex;align-items:center;justify-content:center;font-weight:700;";

    const instruction = document.createElement("p");
    instruction.textContent = step;
    instruction.style.margin = "2px 0";

    stepCard.append(number, instruction);
    result.appendChild(stepCard);
  });

  const finish = document.createElement("p");
  finish.style.cssText = "margin-top:18px;font-weight:600;";
  finish.textContent = "💚 Taste, adjust the seasoning and enjoy your homemade meal!";
  result.appendChild(finish);

  result.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function showSuggestions(result) {
  currentView = "suggestions";
  const matchingDishes = getAvailableDishes();
  const newDishes = matchingDishes.filter(
    dish => !shownDishNames.includes(dish.name)
  );

  result.replaceChildren();

  const heading = document.createElement("h2");
  heading.textContent = "Let's cook with what you have! 🍲";
  heading.style.cssText = "margin:0 0 10px;font-size:22px;color:#176b43;";
  result.appendChild(heading);

  const summary = document.createElement("p");
  summary.textContent = "Ingredients you've told me about: " +
    availableIngredients.map(ingredientLabel).join(", ");
  result.appendChild(summary);

  if (newDishes.length) {
    const intro = document.createElement("p");
    intro.textContent = "Choose a dish to see its full recipe:";
    result.appendChild(intro);

    newDishes.forEach(dish => {
      const card = document.createElement("div");
      card.style.cssText =
        "padding:14px;margin-top:12px;background:white;border:1px solid #dce8da;border-radius:12px;";

      const title = document.createElement("h3");
      title.textContent = dish.name;
      title.style.cssText = "margin:0 0 6px;font-size:18px;color:#176b43;";

      const description = document.createElement("p");
      description.textContent = dish.description;

      const main = document.createElement("p");
      main.textContent = "Main ingredients: " +
        dish.main.map(ingredientLabel).join(", ");

      const missingExtras = dish.extras.filter(
        ingredient => !availableIngredients.includes(ingredient)
      );

      const extras = document.createElement("p");
      extras.textContent = missingExtras.length
        ? "Optional flavourings to check: " + missingExtras.map(ingredientLabel).join(", ")
        : "You've listed the supporting ingredients for this dish too.";

      const time = document.createElement("p");
      time.textContent = "Estimated total time: " + dish.time;
      time.style.fontWeight = "600";

      const recipeButton = makeButton("View full recipe →", () => showRecipe(dish));

      card.append(title, description, main, extras, time, recipeButton);
      result.appendChild(card);

      shownDishNames.push(dish.name);
    });
  } else {
    const noMatch = document.createElement("p");
    noMatch.textContent =
      "I haven't found any new dishes matching your main ingredients. Tell me about any other ingredients you have, and I'll check again.";
    result.appendChild(noMatch);
  }

  const relevantExtras = [
    ...new Set(matchingDishes.flatMap(dish => dish.extras))
  ].filter(ingredient => !availableIngredients.includes(ingredient));

  const followUp = document.createElement("div");
  followUp.style.cssText =
    "margin-top:22px;padding:16px;background:white;border-radius:12px;border:1px solid #dce8da;";

  const question = document.createElement("p");
  question.style.fontWeight = "600";
  question.textContent = "💚 Do you have any of these additional ingredients at home?";

  const extrasList = document.createElement("p");
  extrasList.textContent = relevantExtras.length
    ? relevantExtras.map(ingredientLabel).join(", ") + "."
    : "You've already listed the supporting ingredients for these dishes.";

  const instruction = document.createElement("p");
  instruction.textContent =
    "Tell me which ones you have, and I'll check for more suitable dishes.";

  followUp.append(question, extrasList, instruction);
  result.appendChild(followUp);
  lastSuggestionsHTML = result.innerHTML;

  result.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const question = input.value.trim().toLowerCase();

  if (!question) {
    input.focus();
    return;
  }

  if (["start again", "new search", "clear ingredients"].includes(question)) {
    availableIngredients = [];
    shownDishNames = [];
    currentView = "suggestions";
    createResultArea().textContent =
      "Let's start fresh! What ingredients do you have at home?";
    input.value = "";
    input.placeholder = "Tell me what ingredients you have...";
    input.focus();
    return;
  }

  const found = findIngredients(question);

  if (!found.length) {
    createResultArea().textContent =
      "I couldn't identify any ingredients in that message. Try rice, tomato, onion, potato, garlic, ginger or green chilli. Type 'start again' for a new search.";
    input.value = "";
    input.focus();
    return;
  }

  found.forEach(ingredient => {
    if (!availableIngredients.includes(ingredient)) {
      availableIngredients.push(ingredient);
    }
  });

  showSuggestions(createResultArea());

  input.value = "";
  input.placeholder = "Tell me any other ingredients you have...";
  input.focus();
});
