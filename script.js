/* Enna Samayal — replacement script.js */
(() => {
  "use strict";

  const form = document.querySelector(".chat-form");
  const input = form?.querySelector("input");
  const content = document.querySelector(".welcome-content");

  if (!form || !input || !content) {
    console.error("Enna Samayal: Check that .chat-form and .welcome-content exist in your HTML.");
    return;
  }

  const aliases = {
    rice:["rice","basmati"],
    tomato:["tomato","tomatoes"],
    onion:["onion","onions"],
    potato:["potato","potatoes"],
    carrot:["carrot","carrots"],
    beans:["green beans","beans"],
    peas:["green peas","peas"],
    spinach:["spinach","palak"],
    egg:["egg","eggs"],
    chicken:["chicken"],
    coconut:["coconut","grated coconut"],
    lentils:["lentil","lentils","dal","dhal","toor dal","moong dal"],
    chickpeas:["chickpea","chickpeas","chana","chole"],
    dosa_batter:["dosa batter","idli batter","batter"],
    bread:["bread"],
    lemon:["lemon","lemons"],
    garlic:["garlic"],
    ginger:["ginger"],
    capsicum:["capsicum","bell pepper","bell peppers"],
    cauliflower:["cauliflower"],
    aubergine:["aubergine","brinjal","eggplant"],
    okra:["okra","lady's finger","ladies finger"],
    fish:["fish"],
    paneer:["paneer"],
    oats:["oats","oatmeal"],
    green_chilli:["green chilli","green chillies","green chili","green chilies","chilli","chillies","chili","chilies"],
    coriander:["fresh coriander","coriander leaves","coriander"],
    mint:["mint leaves","fresh mint","mint"],
    curry_leaves:["curry leaves"],
    cumin:["cumin seeds","cumin"],
    mustard_seeds:["mustard seeds"],
    coriander_powder:["coriander powder"],
    turmeric:["turmeric powder","turmeric"],
    garam_masala:["garam masala"],
    oil:["cooking oil","oil"],
    salt:["salt"]
  };

  // A dish can be suggested when at least one main ingredient matches.
  const dishes = [
    {name:"Tomato Thokku",main:["tomato","onion"],extras:["green_chilli","garlic","oil","salt"],time:"25 minutes",description:"A tangy tomato accompaniment for rice or dosa.",ingredients:["2 tomatoes, chopped","1 small onion, chopped","2 garlic cloves (optional)","1 green chilli (optional)","1½ tbsp oil","Salt to taste"],steps:["Heat oil in a pan over medium heat.","Add onion and cook until softened.","Add garlic and chilli if using.","Add tomatoes and salt; cook until thick.","Taste and serve with rice, dosa or idli."]},
    {name:"Tomato Rice",main:["rice","tomato","onion"],extras:["green_chilli","garlic","ginger","curry_leaves","mustard_seeds","oil","salt"],time:"25 minutes",description:"Tangy South Indian tomato rice.",ingredients:["150 g rice","2 tomatoes, chopped","1 small onion, sliced","1 green chilli (optional)","1 garlic clove (optional)","Mustard seeds and curry leaves (optional)","1 tbsp oil","Salt to taste"],steps:["Cook rice according to its packet and let it cool slightly.","Heat oil; add mustard seeds and curry leaves if available.","Add onion and cook until soft; add garlic and chilli if using.","Add tomatoes and salt; cook into a thick sauce.","Mix in cooked rice and heat through."]},
    {name:"Potato Masala",main:["potato","onion"],extras:["green_chilli","ginger","turmeric","mustard_seeds","curry_leaves","oil","salt"],time:"25 minutes",description:"Soft potatoes cooked with onion and spices.",ingredients:["2 potatoes, diced","1 onion, sliced","1 green chilli (optional)","1 tsp ginger (optional)","¼ tsp turmeric","1 tbsp oil","Salt to taste"],steps:["Boil potatoes until tender and drain.","Heat oil in a pan and cook onion until soft.","Add chilli, ginger and turmeric if using.","Add potatoes and salt; gently mix.","Cook for 2–3 minutes and serve."]},
    {name:"Potato Roast",main:["potato"],extras:["green_chilli","garlic","turmeric","cumin","oil","salt"],time:"30 minutes",description:"A crispy, spiced potato side dish.",ingredients:["3 potatoes, diced","1½ tbsp oil","½ tsp cumin (optional)","2 garlic cloves (optional)","¼ tsp turmeric","Salt and chilli to taste"],steps:["Boil or microwave potatoes until just tender; drain well.","Heat oil and add cumin and garlic if using.","Add potatoes, turmeric and salt.","Cook over medium heat, turning occasionally, until golden.","Adjust seasoning and serve."]},
    {name:"Tomato Rasam",main:["tomato"],extras:["garlic","ginger","green_chilli","cumin","coriander","salt"],time:"20 minutes",description:"A comforting, tangy South Indian soup.",ingredients:["2 tomatoes, chopped","2 garlic cloves (optional)","½ tsp cumin (optional)","500 ml water","Coriander (optional)","Salt to taste"],steps:["Put tomatoes, garlic, cumin and water in a saucepan.","Bring to a boil and simmer until tomatoes soften.","Lightly mash the tomatoes.","Season with salt and simmer for 2–3 minutes.","Add coriander if available and serve hot."]},
    {name:"Vegetable Rice",main:["rice","carrot","peas","onion"],extras:["green_chilli","ginger","garlic","cumin","oil","salt"],time:"25 minutes",description:"Rice cooked with vegetables and spices.",ingredients:["150 g rice","1 carrot, diced","75 g peas","1 small onion, sliced","1 tbsp oil","Cumin or ginger (optional)","Salt to taste"],steps:["Heat oil in a saucepan and cook onion until softened.","Add carrot, peas and optional spices; stir briefly.","Add rinsed rice, salt and the water recommended for your rice.","Bring to a boil, cover and cook on low until tender.","Rest for 5 minutes, fluff and serve."]},
    {name:"Egg Fried Rice",main:["rice","egg","onion"],extras:["garlic","ginger","green_chilli","oil","salt"],time:"15 minutes",description:"A quick meal using cooked rice and eggs.",ingredients:["300 g cooked, chilled rice","2 eggs","1 small onion, chopped","1 garlic clove (optional)","1 tbsp oil","Salt and pepper"],steps:["Use rice cooled promptly and refrigerated; break up clumps.","Scramble eggs in half the oil until fully cooked; set aside.","Cook onion and optional garlic in remaining oil.","Add rice and stir-fry until steaming hot throughout.","Return egg to the pan, season and mix."]},
    {name:"Chicken Tomato Curry",main:["chicken","tomato","onion"],extras:["garlic","ginger","green_chilli","coriander","turmeric","garam_masala","salt"],time:"40 minutes",description:"Homestyle chicken curry with tomato gravy.",ingredients:["300 g chicken pieces","2 tomatoes, chopped","1 onion, chopped","2 garlic cloves","1 tsp ginger","½ tsp turmeric","1 tsp garam masala (optional)","150 ml water","Oil and salt"],steps:["Cook onion in a little oil until soft.","Add garlic and ginger and stir briefly.","Add tomatoes, spices and salt; cook until softened.","Add chicken and water; cover and simmer, stirring occasionally.","Cook until chicken reaches 75°C internally and serve."]},
    {name:"Chana Masala",main:["chickpeas","tomato","onion"],extras:["garlic","ginger","green_chilli","coriander","cumin","garam_masala","salt"],time:"30 minutes",description:"Chickpeas in a spiced tomato sauce.",ingredients:["1 can chickpeas, drained","2 tomatoes, chopped","1 onion, chopped","2 garlic cloves","1 tsp ginger","1 tsp garam masala (optional)","Oil, water and salt"],steps:["Cook onion in oil until soft.","Add garlic and ginger; stir briefly.","Add tomatoes, spices and salt; cook until thick.","Add chickpeas and a splash of water; simmer 12–15 minutes.","Mash a few chickpeas to thicken, then serve."]},
    {name:"Spinach Dal",main:["spinach","lentils","onion"],extras:["garlic","ginger","green_chilli","cumin","turmeric","salt"],time:"30 minutes",description:"Lentils cooked with spinach.",ingredients:["150 g lentils","100–150 g spinach","1 onion, chopped","2 garlic cloves","¼ tsp turmeric","600 ml water","Oil and salt"],steps:["Rinse lentils and simmer with water and turmeric until soft.","Cook onion in a separate pan with a little oil.","Add garlic and optional cumin; stir briefly.","Add spinach and cook until wilted.","Mix into lentils, season and simmer for 3–5 minutes."]},
    {name:"Carrot and Beans Poriyal",main:["carrot","beans"],extras:["coconut","green_chilli","mustard_seeds","curry_leaves","oil","salt"],time:"20 minutes",description:"A colourful South Indian vegetable side.",ingredients:["1 carrot, diced","150 g green beans, chopped","1 tbsp oil","Mustard seeds and curry leaves (optional)","2 tbsp grated coconut (optional)","Salt and a little water"],steps:["Heat oil and add mustard seeds if available.","Add carrot, beans, salt and a splash of water.","Cover and cook 7–10 minutes until tender.","Remove lid and evaporate excess water.","Stir in coconut if using and serve."]},
    {name:"Capsicum Potato Fry",main:["capsicum","potato"],extras:["green_chilli","garlic","cumin","oil","salt"],time:"25 minutes",description:"Pan-fried capsicum and potato.",ingredients:["2 potatoes, diced","1 capsicum, chopped","1 tbsp oil","½ tsp cumin (optional)","Garlic (optional)","Salt and chilli to taste"],steps:["Boil or microwave potatoes until just tender; drain.","Heat oil and add cumin or garlic if using.","Add potatoes and cook for 5 minutes.","Add capsicum, salt and chilli to taste.","Cook until capsicum is tender but still holds its shape."]},
    {name:"Brinjal Curry",main:["aubergine","tomato","onion"],extras:["garlic","green_chilli","coriander","cumin","turmeric","oil","salt"],time:"30 minutes",description:"Brinjal cooked in a savoury tomato gravy.",ingredients:["1 aubergine, diced","2 tomatoes, chopped","1 onion, chopped","2 garlic cloves","¼ tsp turmeric","150 ml water","Oil and salt"],steps:["Cook onion in oil until softened.","Add garlic and stir briefly.","Add tomatoes, turmeric and salt; cook until soft.","Add aubergine and water; cover and simmer 12–15 minutes.","Cook until aubergine is tender and serve."]},
    {name:"Okra Poriyal",main:["okra","onion"],extras:["green_chilli","curry_leaves","mustard_seeds","oil","salt"],time:"20 minutes",description:"A simple South Indian okra stir-fry.",ingredients:["250 g okra, washed, dried and chopped","1 onion, sliced","1 tbsp oil","Mustard seeds and curry leaves (optional)","Salt and chilli to taste"],steps:["Ensure okra is dry before chopping.","Heat oil and add mustard seeds if using.","Add onion and chilli; cook briefly.","Add okra and cook uncovered for 8–12 minutes, stirring occasionally.","Season near the end and serve."]},
    {name:"Paneer Tomato Curry",main:["paneer","tomato","onion"],extras:["garlic","ginger","green_chilli","coriander","garam_masala","salt"],time:"30 minutes",description:"Paneer in a gently spiced tomato gravy.",ingredients:["200 g paneer, cubed","2 tomatoes, chopped","1 onion, chopped","2 garlic cloves","1 tsp ginger","Garam masala (optional)","Oil, water and salt"],steps:["Cook onion in oil until soft.","Add garlic and ginger; stir briefly.","Add tomatoes, seasoning and salt; cook until broken down.","Add a little water and simmer to make a sauce.","Add paneer and simmer gently for 4–5 minutes."]},
    {name:"Coconut Chutney",main:["coconut"],extras:["green_chilli","ginger","salt","mustard_seeds","curry_leaves","oil"],time:"10 minutes",description:"A classic accompaniment for idli and dosa.",ingredients:["100 g grated coconut","1 green chilli (optional)","1 tsp ginger (optional)","Water as needed","Salt","Mustard seeds and curry leaves (optional)"],steps:["Blend coconut, chilli, ginger, salt and water until smooth or textured.","Add water gradually to reach your preferred consistency.","For optional tempering, heat a little oil.","Add mustard seeds and curry leaves; allow seeds to pop.","Pour over chutney and serve fresh."]},
    {name:"Lemon Rice",main:["rice","lemon"],extras:["green_chilli","mustard_seeds","curry_leaves","turmeric","oil","salt"],time:"15 minutes",description:"Zesty rice with South Indian flavours.",ingredients:["300 g cooked rice","Juice of 1 lemon","1 tbsp oil","Mustard seeds and curry leaves (optional)","¼ tsp turmeric","Salt and chilli to taste"],steps:["Cook rice and let it cool slightly.","Heat oil; add mustard seeds and curry leaves if using.","Add chilli and turmeric and stir briefly.","Add rice and salt; mix gently until hot.","Turn off heat, add lemon juice, mix and serve."]},
    {name:"Vegetable Kurma",main:["carrot","peas","potato","onion"],extras:["coconut","ginger","garlic","green_chilli","mint","coriander","salt"],time:"35 minutes",description:"Mixed vegetables in coconut gravy.",ingredients:["1 carrot, diced","1 potato, diced","75 g peas","1 onion, chopped","50 g grated coconut","1 garlic clove","1 tsp ginger","350 ml water","Oil and salt"],steps:["Blend coconut, garlic, ginger and a little water into a paste.","Cook onion in oil until soft.","Add vegetables and stir for 2 minutes.","Add paste, water and salt.","Cover and simmer until vegetables are tender; adjust thickness and serve."]},
    {name:"Dosa",main:["dosa_batter"],extras:["oil"],time:"15 minutes",description:"Crispy dosa made from ready batter.",ingredients:["250–300 ml dosa batter","1–2 tsp oil","Water if needed"],steps:["Stir batter; thin with a little water if necessary.","Heat a flat pan over medium-high heat.","Pour in a ladle of batter and spread into a thin circle.","Drizzle oil around the edges and cook until golden underneath.","Flip briefly if desired, fold and serve."]},
    {name:"Bread Omelette",main:["bread","egg","onion"],extras:["green_chilli","coriander","oil","salt"],time:"10 minutes",description:"A quick egg and bread meal.",ingredients:["2 eggs","2 slices bread","¼ onion, finely chopped","Coriander or chilli (optional)","1 tsp oil","Salt and pepper"],steps:["Beat eggs with onion, optional coriander or chilli, salt and pepper.","Heat oil in a non-stick pan.","Pour in egg mixture and spread evenly.","Place bread on the wet egg, then carefully flip.","Cook until egg is fully set and serve."]},
    {name:"Oats Porridge",main:["oats"],extras:[],time:"10 minutes",description:"A simple, quick breakfast.",ingredients:["80 g oats","400 ml milk or water","Pinch of salt (optional)","Fruit or cinnamon (optional)"],steps:["Place oats and milk or water in a saucepan.","Bring to a gentle simmer, stirring regularly.","Cook for 4–6 minutes until creamy.","Add a pinch of salt if desired.","Serve with preferred toppings."]},
    {name:"Fish Tomato Curry",main:["fish","tomato","onion"],extras:["garlic","ginger","green_chilli","coriander","turmeric","salt"],time:"30 minutes",description:"Fish simmered in tangy tomato gravy.",ingredients:["300 g boneless fish pieces","2 tomatoes, chopped","1 onion, chopped","2 garlic cloves","1 tsp ginger","¼ tsp turmeric","150 ml water","Oil and salt"],steps:["Cook onion in oil until softened.","Add garlic and ginger and stir briefly.","Add tomatoes, turmeric and salt; cook into a sauce.","Add water and simmer for 5 minutes.","Add fish and simmer gently until opaque and flakes easily."]},
    {name:"Cauliflower Poriyal",main:["cauliflower","onion"],extras:["green_chilli","curry_leaves","mustard_seeds","turmeric","oil","salt"],time:"20 minutes",description:"A lightly spiced cauliflower stir-fry.",ingredients:["300 g cauliflower florets","1 onion, sliced","1 tbsp oil","Mustard seeds and curry leaves (optional)","¼ tsp turmeric","Salt and a little water"],steps:["Wash cauliflower and cut into small florets.","Heat oil; add mustard seeds and curry leaves if using.","Add onion and cook until soft.","Add cauliflower, turmeric, salt and a splash of water.","Cover and cook 7–10 minutes until tender; uncover to evaporate excess water."]}
  ];

  const labels = {
    tomato:"tomato", potato:"potato", lentils:"lentils / dal",
    dosa_batter:"dosa or idli batter", aubergine:"brinjal",
    green_chilli:"green chilli", curry_leaves:"curry leaves",
    mustard_seeds:"mustard seeds", garam_masala:"garam masala"
  };

  const label = key => labels[key] || key.replaceAll("_", " ");
  let available = [];
  let shown = new Set();
  let lastSuggestions = null;

  function containsPhrase(text, phrase) {
    const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp("(^|[^a-z])" + escaped + "([^a-z]|$)", "i").test(text);
  }

  function findIngredients(text) {
    return Object.entries(aliases)
      .filter(([, words]) => words.some(word => containsPhrase(text, word)))
      .map(([key]) => key);
  }

  function resultArea() {
    let result = content.querySelector(".chat-result");

    if (!result) {
      result = document.createElement("section");
      result.className = "chat-result";
      result.style.cssText =
        "grid-column:1/-1;width:100%;margin-top:24px;padding:20px;background:#f0f6ef;border-radius:14px;text-align:left;line-height:1.6;color:#234b35;box-sizing:border-box;";
      content.appendChild(result);
    }

    return result;
  }

  function makeButton(text, callback) {
    const el = document.createElement("button");
    el.type = "button";
    el.textContent = text;
    el.style.cssText =
      "padding:10px 16px;margin:8px 8px 0 0;border:0;border-radius:8px;background:#176b43;color:white;font-weight:600;cursor:pointer;";
    el.addEventListener("click", callback);
    return el;
  }

  function renderRecipe(dish) {
    const result = resultArea();
    result.replaceChildren();

    result.appendChild(makeButton("← Back to suggestions", () => {
      renderSuggestions();
    }));

    const heading = document.createElement("h2");
    heading.textContent = "🍲 " + dish.name;
    heading.style.color = "#176b43";
    result.appendChild(heading);

    const description = document.createElement("p");
    description.textContent = dish.description;
    result.appendChild(description);

    const meta = document.createElement("p");
    meta.textContent = "Serves 2 · Estimated total time: " + dish.time;
    result.appendChild(meta);

    const ingredientsHeading = document.createElement("h3");
    ingredientsHeading.textContent = "Ingredients";
    result.appendChild(ingredientsHeading);

    const note = document.createElement("p");
    note.textContent = "Tick ingredients as you prepare them.";
    result.appendChild(note);

    const list = document.createElement("div");
    list.style.cssText =
      "padding:12px 16px;background:white;border-radius:10px;border:1px solid #dce8da;";

    dish.ingredients.forEach(item => {
      const line = document.createElement("label");
      line.style.cssText =
        "display:flex;gap:10px;align-items:flex-start;margin:8px 0;cursor:pointer;";

      const check = document.createElement("input");
      check.type = "checkbox";

      const span = document.createElement("span");
      span.textContent = item;

      check.addEventListener("change", () => {
        span.style.textDecoration = check.checked ? "line-through" : "none";
        span.style.opacity = check.checked ? ".65" : "1";
      });

      line.append(check, span);
      list.appendChild(line);
    });

    result.appendChild(list);

    const stepsHeading = document.createElement("h3");
    stepsHeading.textContent = "Step-by-step instructions";
    result.appendChild(stepsHeading);

    const steps = document.createElement("ol");

    dish.steps.forEach(step => {
      const li = document.createElement("li");
      li.textContent = step;
      li.style.marginBottom = "10px";
      steps.appendChild(li);
    });

    result.appendChild(steps);
    result.scrollIntoView({ behavior:"smooth", block:"nearest" });
  }

  
function renderSuggestions() {
  const result = resultArea();
  result.replaceChildren();

  const heading = document.createElement("h2");
  heading.textContent = "Let's cook with what you have! 🍲";
  heading.style.cssText =
    "margin:0 0 10px;font-size:22px;color:#176b43;";
  result.appendChild(heading);

  const summary = document.createElement("p");
  summary.textContent =
    "Your ingredients: " + available.map(label).join(", ");
  result.appendChild(summary);

  // Compare every dish with the ingredients entered.
  const analysed = dishes.map(dish => {
    const matched = dish.main.filter(key => available.includes(key));
    const missing = dish.main.filter(key => !available.includes(key));

    return {
      ...dish,
      matched,
      missing,
      ratio: matched.length / dish.main.length
    };
  });

  // 1. Every main ingredient is available.
  const ready = analysed.filter(dish =>
    dish.matched.length > 0 && dish.missing.length === 0
  );

  // 2. At least one main ingredient matches and exactly
  // one main ingredient is missing.
  const nearlyReady = analysed.filter(dish =>
    dish.matched.length > 0 &&
    dish.missing.length === 1
  );

  // 3. Other relevant dishes, without duplicating the
  // dishes already shown in the first two sections.
  const readyNames = new Set(ready.map(dish => dish.name));
  const nearlyNames = new Set(nearlyReady.map(dish => dish.name));

  const suggestions = analysed
    .filter(dish =>
      dish.matched.length > 0 &&
      !readyNames.has(dish.name) &&
      !nearlyNames.has(dish.name)
    )
    .sort((a, b) =>
      b.ratio - a.ratio ||
      b.matched.length - a.matched.length
    )
    .slice(0, 4);

  // Create a heading for each section.
  function addSection(title, subtitle) {
    const section = document.createElement("section");
    section.style.marginTop = "24px";

    const h = document.createElement("h3");
    h.textContent = title;
    h.style.cssText = "color:#176b43;margin-bottom:6px;";

    const p = document.createElement("p");
    p.textContent = subtitle;

    section.append(h, p);
    result.appendChild(section);
    return section;
  }

  // Render one dish card.
  function addDishCard(section, dish, type) {
    const card = document.createElement("article");
    card.style.cssText =
      "padding:14px;margin:12px 0;background:white;" +
      "border:1px solid #dce8da;border-radius:12px;";

    const title = document.createElement("h4");
    title.textContent = dish.name;
    title.style.cssText =
      "margin:0 0 8px;font-size:18px;color:#176b43;";

    const description = document.createElement("p");
    description.textContent = dish.description;

    const have = document.createElement("p");
    have.textContent =
      "You have: " + dish.matched.map(label).join(", ");

    card.append(title, description, have);

    if (type === "ready") {
      const status = document.createElement("p");
      status.textContent =
        "✅ You have all the main ingredients.";
      card.appendChild(status);
    } else if (type === "nearly") {
      const missing = document.createElement("p");
      missing.textContent =
        "🛒 You need: " + dish.missing.map(label).join(", ");
      card.appendChild(missing);
    } else {
      const missing = document.createElement("p");
      missing.textContent = dish.missing.length
        ? "You may also need: " + dish.missing.map(label).join(", ")
        : "You have the main ingredients.";
      card.appendChild(missing);
    }

    const time = document.createElement("p");
    time.textContent = "Estimated time: " + dish.time;

    const view = makeButton("View full recipe →", () => {
      renderRecipe(dish);
    });

    card.append(time, view);
    section.appendChild(card);
  }

  // SECTION 1: dishes ready to make.
  const readySection = addSection(
    "1. 🍲 Dishes you can make",
    "These dishes have all their main ingredients in your list."
  );

  if (ready.length) {
    ready.forEach(dish => addDishCard(readySection, dish, "ready"));
  } else {
    const p = document.createElement("p");
    p.textContent =
      "No complete matches yet. Check the missing ingredients below.";
    readySection.appendChild(p);
  }

  // SECTION 2: dishes missing just one main ingredient.
  const nearlySection = addSection(
    "2. 🛒 Missing ingredients",
    "You're just one main ingredient away from making these dishes."
  );

  if (nearlyReady.length) {
    nearlyReady.forEach(dish =>
      addDishCard(nearlySection, dish, "nearly")
    );
  } else {
    const p = document.createElement("p");
    p.textContent =
      "No dishes are just one main ingredient away at the moment.";
    nearlySection.appendChild(p);
  }

  // SECTION 3: additional ideas based on available ingredients.
  const suggestionsSection = addSection(
    "3. 💡 My suggestions",
    "Here are a few more ideas using some of your ingredients."
  );

  if (suggestions.length) {
    suggestions.forEach(dish =>
      addDishCard(suggestionsSection, dish, "suggestion")
    );
  } else {
    const p = document.createElement("p");
    p.textContent =
      "Add another ingredient to discover more dishes.";
    suggestionsSection.appendChild(p);
  }

  const reset = makeButton("Start a new search", resetSearch);
  reset.style.background = "#52685a";
  result.appendChild(reset);

  result.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
}
  function resetSearch() {
    available = [];
    shown = new Set();
    lastSuggestions = null;

    const result = resultArea();
    result.replaceChildren();

    const message = document.createElement("p");
    message.textContent =
      "Let's start fresh! What ingredients do you have at home?";
    result.appendChild(message);

    input.value = "";
    input.placeholder = "Tell me what ingredients you have...";
    input.focus();
  }

  form.addEventListener("submit", event => {
    event.preventDefault();

    const question = input.value.trim().toLowerCase();

    if (!question) {
      input.focus();
      return;
    }

    if ([
      "start again",
      "new search",
      "clear ingredients",
      "clear search",
      "clear"
    ].includes(question)) {
      resetSearch();
      return;
    }

    const found = findIngredients(question);

    if (!found.length) {
      const result = resultArea();
      result.textContent =
        "I couldn't identify an ingredient. Try rice, tomato, onion, potato, garlic, ginger or green chilli.";
      input.value = "";
      input.focus();
      return;
    }

    found.forEach(key => {
      if (!available.includes(key)) {
        available.push(key);
      }
    });

    renderSuggestions();

    input.value = "";
    input.placeholder = "Tell me any other ingredients you have...";
    input.focus();
  });

  console.log("Enna Samayal JavaScript loaded successfully.");
})();
