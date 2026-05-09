const recipes = [
    // ==================== INDIAN ====================
    { name: "Butter Chicken", cuisine: "indian", vegetarian: false, egg: false, time: 50, emoji: "🍗",
      desc: "Creamy, rich tomato-based curry with tender chicken pieces — a true North Indian classic.",
      ingredients: ["500g chicken (boneless, cubed)", "3 tbsp butter (45g)", "3 medium tomatoes (or 1 can crushed)", "1/2 cup cream (120ml)", "2 medium onions, diced", "5 cloves garlic, minced", "1 inch ginger, grated", "1 tsp garam masala", "1 tsp cumin", "1/2 tsp turmeric", "1 tsp chili powder", "1 tsp dried fenugreek leaves"],
      spices: ["garam masala", "cumin", "turmeric", "chili powder", "fenugreek", "coriander"],
      steps: ["Marinate chicken in yogurt and spices for 30 minutes.", "Sear chicken in butter until golden.", "Sauté onions, garlic, ginger in butter.", "Add tomato puree, cook until oil separates.", "Add spices, cream, and fenugreek leaves.", "Simmer chicken in sauce for 15 minutes.", "Finish with butter and serve with naan."] },

    { name: "Palak Paneer", cuisine: "indian", vegetarian: true, egg: false, time: 35, emoji: "🧀",
      desc: "Cottage cheese cubes in a velvety spinach gravy, spiced to perfection.",
      ingredients: ["250g paneer (cubed)", "500g fresh spinach", "2 medium onions, diced", "3 medium tomatoes (or 1 can crushed)", "5 cloves garlic, minced", "1 inch ginger, grated", "1/2 cup cream (120ml)", "1 tsp cumin", "1 tsp garam masala"],
      spices: ["cumin", "garam masala", "turmeric", "coriander", "chili"],
      steps: ["Blanch spinach and blend to a smooth puree.", "Sauté onion, garlic, ginger until golden.", "Add tomatoes and cook down.", "Add spinach puree and spices.", "Add paneer cubes, simmer 10 minutes.", "Finish with cream and serve."] },

    { name: "Chole Bhature", cuisine: "indian", vegetarian: true, egg: false, time: 60, emoji: "🫘",
      desc: "Spicy chickpea curry paired with fluffy deep-fried bread — iconic Punjabi street food.",
      ingredients: ["1.5 cups chickpeas (or 1 can, drained)", "2 medium onions, diced", "3 medium tomatoes (or 1 can crushed)", "1 inch ginger, grated", "5 cloves garlic, minced", "3 tbsp neutral oil", "2.5 cups flour (300g)", "1 cup yogurt (240ml)"],
      spices: ["cumin", "coriander", "garam masala", "amchur", "chili", "turmeric"],
      steps: ["Soak chickpeas overnight, pressure cook until tender.", "Sauté onions until deep golden.", "Add ginger-garlic paste, cook 2 minutes.", "Add tomatoes, all spices, cook until oil separates.", "Add chickpeas, mash some for thickness.", "Knead dough with flour, yogurt, oil. Rest 30 minutes.", "Roll and deep fry bhature until puffed golden."] },

    { name: "Egg Curry", cuisine: "indian", vegetarian: false, egg: true, time: 30, emoji: "🥚",
      desc: "Hard-boiled eggs simmered in a rich, spiced onion-tomato gravy.",
      ingredients: ["3 large eggs", "2 medium onions, diced", "3 medium tomatoes (or 1 can crushed)", "5 cloves garlic, minced", "1 inch ginger, grated", "3 tbsp neutral oil", "1 cup yogurt (240ml)"],
      spices: ["turmeric", "chili", "cumin", "coriander", "garam masala"],
      steps: ["Hard boil eggs, peel and make slits.", "Fry eggs lightly until golden, set aside.", "Sauté onions until deep brown.", "Add ginger-garlic paste, tomatoes, spices.", "Cook until oil separates, add yogurt.", "Add eggs, simmer in gravy 10 minutes.", "Garnish with cilantro and serve with rice."] },

    { name: "Dal Tadka", cuisine: "indian", vegetarian: true, egg: false, time: 30, emoji: "🍲",
      desc: "Comfort lentil soup tempered with cumin, garlic, and ghee — everyday Indian soul food.",
      ingredients: ["1 cup lentils (200g)", "2 medium onions, diced", "3 medium tomatoes (or 1 can crushed)", "5 cloves garlic, minced", "2 tbsp ghee", "1/2 cup fresh cilantro"],
      spices: ["cumin", "turmeric", "chili", "mustard seeds", "asafoetida"],
      steps: ["Cook lentils with turmeric until soft.", "Heat ghee, add cumin and mustard seeds.", "Add garlic, onion, sauté until golden.", "Add tomatoes, chili, cook down.", "Pour tempering over cooked lentils.", "Garnish with cilantro and serve."] },

    { name: "Aloo Gobi", cuisine: "indian", vegetarian: true, egg: false, time: 35, emoji: "🥔",
      desc: "A dry-style potato and cauliflower stir-fry spiced with turmeric and cumin.",
      ingredients: ["3 medium potatoes", "1 medium cauliflower", "2 medium onions, diced", "3 medium tomatoes (or 1 can crushed)", "1 inch ginger, grated", "3 tbsp neutral oil"],
      spices: ["turmeric", "cumin", "coriander", "chili", "garam masala"],
      steps: ["Cut potato and cauliflower into florets.", "Heat oil, add cumin seeds.", "Add onion, ginger, sauté.", "Add tomatoes, spices, cook 3 minutes.", "Add vegetables, cover and cook on low.", "Stir occasionally until tender.", "Finish with garam masala."] },

    { name: "Masala Dosa", cuisine: "indian", vegetarian: true, egg: false, time: 45, emoji: "🫓",
      desc: "Crispy fermented rice crepe filled with spiced potato filling — South Indian masterpiece.",
      ingredients: ["1 cup rice (200g)", "1/2 cup urad dal", "3 medium potatoes", "2 medium onions, diced", "1 tsp mustard seeds", "10-12 curry leaves", "3 tbsp neutral oil"],
      spices: ["mustard seeds", "turmeric", "chili", "cumin", "asafoetida"],
      steps: ["Soak rice and urad dal, grind to batter, ferment overnight.", "Boil and mash potatoes.", "Make tempering with mustard seeds, curry leaves, onion.", "Mix tempering with mashed potato and turmeric.", "Spread thin batter on hot griddle.", "Cook until crispy, add potato filling.", "Fold and serve with chutney and sambar."] },

    { name: "Biryani", cuisine: "indian", vegetarian: false, egg: false, time: 90, emoji: "🍚",
      desc: "Fragrant layered rice dish with marinated meat, saffron, and aromatic whole spices.",
      ingredients: ["500g chicken (boneless, cubed)", "1.5 cups basmati rice (300g)", "2 medium onions, diced", "1 cup yogurt (240ml)", "a pinch of saffron threads", "1/2 cup milk (120ml)", "2 tbsp ghee", "1/4 cup fresh mint", "1/2 cup fresh cilantro"],
      spices: ["cardamom", "cinnamon", "bay leaf", "clove", "cumin", "coriander", "chili", "garam masala"],
      steps: ["Marinate chicken in yogurt and spices 2 hours.", "Parboil basmati rice with whole spices.", "Fry onions until deep golden (birista).", "Layer marinated chicken, then rice in heavy pot.", "Add saffron milk, fried onions, ghee, herbs.", "Seal pot tightly, cook on low 25 minutes.", "Let rest 10 minutes before opening. Serve with raita."] },

    // ==================== ASIAN ====================
    { name: "Fried Rice", cuisine: "asian", vegetarian: false, egg: true, time: 15, emoji: "🍳",
      desc: "Quick wok-tossed day-old rice with vegetables, egg, and soy sauce — the ultimate leftover hack.",
      ingredients: ["1 cup rice (200g)", "3 large eggs", "3 tbsp soy sauce", "5 cloves garlic, minced", "2 medium onions, diced", "2 medium carrots", "1 cup peas", "3 tbsp neutral oil", "4 green onions, sliced"],
      spices: ["white pepper", "sesame oil"],
      steps: ["Heat oil in wok on high heat.", "Scramble eggs, set aside.", "Stir-fry garlic, onion, vegetables.", "Add cold rice, toss on high heat.", "Add soy sauce, pepper, sesame oil.", "Mix in scrambled eggs.", "Garnish with green onions."] },

    { name: "Kung Pao Chicken", cuisine: "asian", vegetarian: false, egg: false, time: 25, emoji: "🌶️",
      desc: "Spicy, tangy stir-fried chicken with peanuts and dried chilies — Sichuan classic.",
      ingredients: ["500g chicken (boneless, cubed)", "1/2 cup peanuts", "4-5 dried chilies", "3 tbsp soy sauce", "2 tbsp vinegar", "5 cloves garlic, minced", "1 inch ginger, grated", "4 green onions, sliced", "3 tbsp neutral oil"],
      spices: ["sichuan peppercorn", "chili flakes", "white pepper"],
      steps: ["Cut chicken into cubes, marinate in soy sauce and cornstarch.", "Mix sauce: soy sauce, vinegar, sugar, cornstarch.", "Wok-fry dried chilies and Sichuan peppercorns.", "Stir-fry chicken until cooked.", "Add garlic, ginger, vegetables.", "Pour in sauce, toss until glossy.", "Add peanuts and green onions."] },

    { name: "Vegetable Stir Fry", cuisine: "asian", vegetarian: true, egg: false, time: 15, emoji: "🥦",
      desc: "Colorful crisp-tender vegetables tossed in garlic-ginger soy glaze — quick and healthy.",
      ingredients: ["1 head broccoli", "2 bell peppers", "2 medium carrots", "150g snap peas", "5 cloves garlic, minced", "1 inch ginger, grated", "3 tbsp soy sauce", "3 tbsp neutral oil"],
      spices: ["sesame oil", "white pepper", "chili flakes"],
      steps: ["Prep all vegetables into even pieces.", "Heat oil in wok until smoking.", "Add garlic and ginger, 30 seconds.", "Add firm vegetables first (carrot, broccoli).", "Add softer vegetables (bell pepper, snap peas).", "Add soy sauce and sesame oil.", "Toss until glazed and crisp-tender."] },

    { name: "Ramen", cuisine: "asian", vegetarian: false, egg: true, time: 45, emoji: "🍜",
      desc: "Rich pork bone broth with springy noodles, soft-boiled egg, and all the toppings.",
      ingredients: ["2 servings ramen noodles", "400g pork", "3 large eggs", "3 tbsp soy sauce", "3 tbsp miso paste", "4 green onions, sliced", "4 nori sheets", "5 cloves garlic, minced", "1 inch ginger, grated"],
      spices: ["white pepper", "sesame oil", "chili oil"],
      steps: ["Simmer pork bones for rich broth (or use stock).", "Season broth with soy sauce, miso, garlic.", "Cook ramen noodles per package.", "Soft-boil eggs (6.5 minutes), marinate in soy.", "Slice chashu pork thinly.", "Assemble: noodles, hot broth, toppings.", "Garnish with nori, green onions, sesame."] },

    { name: "Dim Sum Dumplings", cuisine: "asian", vegetarian: false, egg: false, time: 40, emoji: "🥟",
      desc: "Delicate steamed parcels filled with seasoned pork and shrimp — Cantonese tea house staple.",
      ingredients: ["400g pork", "300g shrimp (peeled)", "20 dumpling wrappers", "1 inch ginger, grated", "3 tbsp soy sauce", "1 tsp toasted sesame oil", "4 green onions, sliced"],
      spices: ["white pepper", "five spice"],
      steps: ["Mince pork and shrimp finely.", "Mix with ginger, soy sauce, sesame oil, pepper.", "Place filling in center of wrapper.", "Pleat edges to seal into half-moon shape.", "Line steamer with cabbage leaves.", "Steam dumplings 8-10 minutes.", "Serve with soy-vinegar dipping sauce."] },

    // ==================== ITALIAN ====================
    { name: "Spaghetti Carbonara", cuisine: "italian", vegetarian: false, egg: true, time: 20, emoji: "🍝",
      desc: "Silky egg and pecorino sauce coating perfectly al dente spaghetti with crispy guanciale.",
      ingredients: ["400g spaghetti", "3 large eggs", "60g pecorino (grated)", "100g guanciale (diced)", "freshly cracked black pepper"],
      spices: ["black pepper"],
      steps: ["Boil spaghetti in salted water until al dente.", "Crisp guanciale in a pan, set aside.", "Whisk eggs with pecorino and black pepper.", "Toss hot pasta with guanciale in pan (off heat).", "Add egg mixture, toss quickly (don't scramble).", "Add pasta water for silky consistency.", "Serve with extra pecorino and pepper."] },

    { name: "Margherita Pizza", cuisine: "italian", vegetarian: true, egg: false, time: 30, emoji: "🍕",
      desc: "The OG pizza — San Marzano tomato sauce, fresh mozzarella, basil on a charred crust.",
      ingredients: ["2.5 cups flour (300g)", "2 tsp active dry yeast", "3 medium tomatoes (or 1 can crushed)", "200g fresh mozzarella", "1/2 cup fresh basil", "3 tbsp extra-virgin olive oil", "salt to taste"],
      spices: ["oregano", "salt"],
      steps: ["Mix flour, yeast, water, salt into dough.", "Knead 10 minutes, let rise 1 hour.", "Stretch dough into thin round.", "Spread crushed tomato sauce.", "Tear fresh mozzarella over top.", "Bake at highest oven temp 8-10 minutes.", "Top with fresh basil and olive oil drizzle."] },

    { name: "Risotto ai Funghi", cuisine: "italian", vegetarian: true, egg: false, time: 40, emoji: "🍄",
      desc: "Creamy arborio rice slowly stirred with porcini mushrooms, white wine, and parmesan.",
      ingredients: ["1.5 cups arborio rice (300g)", "300g mushrooms", "2 medium onions, diced", "1/2 cup white wine (120ml)", "50g parmesan (grated)", "3 tbsp butter (45g)", "4 cups vegetable stock (1L)"],
      spices: ["black pepper", "thyme"],
      steps: ["Soak dried porcini, reserve liquid.", "Sauté onion in butter until translucent.", "Add arborio rice, toast 2 minutes.", "Deglaze with white wine.", "Add warm stock one ladle at a time, stirring.", "Add mushrooms halfway through cooking.", "Finish with parmesan, butter, and pepper."] },

    { name: "Penne Arrabbiata", cuisine: "italian", vegetarian: true, egg: false, time: 20, emoji: "🌶️",
      desc: "Angry pasta — penne in fiery tomato sauce with garlic and red chili flakes.",
      ingredients: ["400g penne", "3 medium tomatoes (or 1 can crushed)", "5 cloves garlic, minced", "3 tbsp extra-virgin olive oil", "1 cup fresh parsley, chopped"],
      spices: ["red chili flakes", "black pepper"],
      steps: ["Boil penne until al dente.", "Sauté garlic and chili flakes in olive oil.", "Add crushed tomatoes, simmer 10 minutes.", "Season with salt and pepper.", "Toss pasta in sauce.", "Garnish with fresh parsley.", "Serve with grated parmesan."] },

    { name: "Eggplant Parmigiana", cuisine: "italian", vegetarian: true, egg: true, time: 60, emoji: "🍆",
      desc: "Layers of breaded eggplant, tomato sauce, and melted mozzarella — Italian comfort food.",
      ingredients: ["2 medium eggplants", "3 medium tomatoes (or 1 can crushed)", "200g fresh mozzarella", "50g parmesan (grated)", "3 large eggs", "1 cup breadcrumbs", "1/2 cup fresh basil", "2.5 cups flour (300g)"],
      spices: ["oregano", "black pepper", "garlic powder"],
      steps: ["Slice eggplant, salt and drain 30 minutes.", "Dip in flour, egg, then breadcrumbs.", "Fry slices until golden.", "Make tomato sauce with garlic and basil.", "Layer: sauce, eggplant, mozzarella, parmesan.", "Repeat layers.", "Bake at 180°C for 25 minutes until bubbly."] },

    { name: "Minestrone Soup", cuisine: "italian", vegetarian: true, egg: false, time: 40, emoji: "🥣",
      desc: "Hearty vegetable soup with beans and pasta — every Italian nonna's recipe is different.",
      ingredients: ["1.5 cups mixed beans", "400g pasta", "3 medium tomatoes (or 1 can crushed)", "2 medium carrots", "2 stalks celery", "2 medium onions, diced", "2 medium zucchinis", "3 medium potatoes", "500g fresh spinach", "3 tbsp extra-virgin olive oil"],
      spices: ["bay leaf", "oregano", "black pepper", "thyme"],
      steps: ["Sauté onion, carrot, celery in olive oil.", "Add potato, zucchini, tomatoes.", "Add stock and bay leaf, simmer 20 minutes.", "Add beans and small pasta.", "Cook until pasta is tender.", "Add spinach at the end.", "Serve with crusty bread and parmesan."] },

    // ==================== TURKISH ====================
    { name: "Iskender Kebab", cuisine: "turkish", vegetarian: false, egg: false, time: 50, emoji: "🥩",
      desc: "Sliced döner meat over pita bread, doused in tomato sauce and browned butter with yogurt.",
      ingredients: ["400g lamb (cubed)", "4 pita breads", "3 medium tomatoes (or 1 can crushed)", "1 cup yogurt (240ml)", "3 tbsp butter (45g)", "2 medium onions, diced", "5 cloves garlic, minced"],
      spices: ["cumin", "paprika", "oregano", "black pepper", "sumac"],
      steps: ["Season lamb with cumin, paprika, oregano.", "Grill or roast lamb, slice thinly.", "Make tomato sauce with garlic and butter.", "Cube pita bread, place on plate.", "Layer sliced meat over bread.", "Pour hot tomato sauce over meat.", "Add yogurt on side, drizzle browned butter."] },

    { name: "Lentil Soup (Mercimek)", cuisine: "turkish", vegetarian: true, egg: false, time: 30, emoji: "🥣",
      desc: "Velvety red lentil soup with a squeeze of lemon — Turkey's beloved everyday starter.",
      ingredients: ["1 cup red lentils", "2 medium onions, diced", "2 medium carrots", "3 medium potatoes", "2 tbsp tomato paste", "3 tbsp butter (45g)", "2 lemons"],
      spices: ["cumin", "paprika", "black pepper", "mint"],
      steps: ["Sauté onion and carrot in butter.", "Add lentils, potato, tomato paste, water.", "Simmer until lentils are very soft.", "Blend until smooth and velvety.", "Season with cumin, paprika, salt.", "Make mint-paprika butter for topping.", "Serve with lemon wedge and crusty bread."] },

    { name: "Menemen", cuisine: "turkish", vegetarian: true, egg: true, time: 15, emoji: "🍳",
      desc: "Turkish-style scrambled eggs with tomatoes, peppers, and spices — perfect breakfast.",
      ingredients: ["3 large eggs", "3 medium tomatoes (or 1 can crushed)", "2 green peppers", "2 medium onions, diced", "3 tbsp extra-virgin olive oil"],
      spices: ["paprika", "chili flakes", "black pepper", "cumin"],
      steps: ["Sauté onion and peppers in olive oil.", "Add diced tomatoes, cook until soft.", "Season with paprika and chili flakes.", "Crack eggs directly into the pan.", "Gently stir, keeping eggs slightly runny.", "Remove from heat (carryover will finish cooking).", "Serve in the pan with crusty bread."] },

    { name: "Karniyarik", cuisine: "turkish", vegetarian: false, egg: false, time: 55, emoji: "🍆",
      desc: "Split-belly eggplants stuffed with spiced ground meat, tomatoes, and peppers.",
      ingredients: ["2 medium eggplants", "400g ground beef", "2 medium onions, diced", "3 medium tomatoes (or 1 can crushed)", "2 green peppers", "5 cloves garlic, minced", "1 cup fresh parsley, chopped", "3 tbsp neutral oil"],
      spices: ["cumin", "paprika", "black pepper", "allspice"],
      steps: ["Peel eggplants in stripes, fry until soft.", "Brown ground beef with onions and garlic.", "Add diced tomatoes, peppers, spices.", "Slit eggplants lengthwise to create pocket.", "Stuff with meat mixture.", "Arrange in baking dish, add tomato slices.", "Bake at 180°C for 25 minutes."] },

    { name: "Imam Bayildi", cuisine: "turkish", vegetarian: true, egg: false, time: 60, emoji: "🍆",
      desc: "Whole eggplants stuffed with sweet onions and tomatoes braised in olive oil — so good the imam fainted.",
      ingredients: ["2 medium eggplants", "2 medium onions, diced", "3 medium tomatoes (or 1 can crushed)", "5 cloves garlic, minced", "1 cup fresh parsley, chopped", "3 tbsp extra-virgin olive oil"],
      spices: ["black pepper", "sugar", "allspice"],
      steps: ["Peel eggplants in stripes.", "Fry until golden, drain.", "Slowly cook sliced onions in olive oil until sweet.", "Add garlic, tomatoes, parsley.", "Slit eggplants, stuff with onion mixture.", "Place in deep pan, add water and olive oil.", "Cook on low 40 minutes until meltingly tender."] },

    // ==================== LEBANESE ====================
    { name: "Hummus", cuisine: "lebanese", vegetarian: true, egg: false, time: 15, emoji: "🫘",
      desc: "Ultra-smooth chickpea and tahini dip — the real Lebanese way with ice-cold water and extra tahini.",
      ingredients: ["1.5 cups chickpeas (or 1 can, drained)", "1/3 cup tahini", "2 lemons", "5 cloves garlic, minced", "3 tbsp extra-virgin olive oil", "1/4 cup ice water"],
      spices: ["cumin", "paprika", "salt"],
      steps: ["Cook chickpeas until very soft (or use canned).", "Remove skins for extra smoothness.", "Blend tahini with lemon juice and garlic first.", "Add chickpeas, blend with ice water.", "Process for 5 minutes until ultra smooth.", "Plate in a swirl, drizzle olive oil.", "Garnish with paprika and whole chickpeas."] },

    { name: "Falafel", cuisine: "lebanese", vegetarian: true, egg: false, time: 30, emoji: "🧆",
      desc: "Crispy herb-packed chickpea fritters — the king of Lebanese street food.",
      ingredients: ["1.5 cups chickpeas (or 1 can, drained)", "2 medium onions, diced", "5 cloves garlic, minced", "1 cup fresh parsley, chopped", "1/2 cup fresh cilantro", "2.5 cups flour (300g)", "3 tbsp neutral oil"],
      spices: ["cumin", "coriander", "cardamom", "black pepper", "baking powder"],
      steps: ["Soak dried chickpeas overnight (never canned).", "Blend with herbs, onion, garlic, spices.", "Chill mixture 1 hour.", "Form into balls or patties.", "Deep fry at 180°C until deep golden.", "Drain on paper towels.", "Serve in pita with tahini, pickles, vegetables."] },

    { name: "Fattoush", cuisine: "lebanese", vegetarian: true, egg: false, time: 15, emoji: "🥗",
      desc: "Crunchy pita chip salad with fresh vegetables and tangy sumac-lemon dressing.",
      ingredients: ["4 pita breads", "3 medium tomatoes (or 1 can crushed)", "1 large cucumber", "5-6 radishes", "1 head lettuce", "1/4 cup fresh mint", "1 cup fresh parsley, chopped", "3 tbsp extra-virgin olive oil", "2 lemons"],
      spices: ["sumac", "salt", "black pepper"],
      steps: ["Fry or bake pita pieces until crispy.", "Chop tomatoes, cucumber, radish, lettuce.", "Make dressing: olive oil, lemon, sumac, salt.", "Toss vegetables with herbs.", "Add crispy pita chips.", "Pour dressing over salad.", "Serve immediately while pita is crispy."] },

    { name: "Shawarma", cuisine: "lebanese", vegetarian: false, egg: false, time: 40, emoji: "🌯",
      desc: "Marinated spiced meat shaved off a vertical spit, wrapped in warm flatbread with garlic sauce.",
      ingredients: ["500g chicken (boneless, cubed)", "4 pita breads", "5 cloves garlic, minced", "1 cup yogurt (240ml)", "2 lemons", "2 medium onions, diced", "3 medium tomatoes (or 1 can crushed)", "1/2 cup pickles"],
      spices: ["cumin", "paprika", "turmeric", "cinnamon", "cardamom", "allspice", "black pepper"],
      steps: ["Marinate chicken in yogurt, lemon, and spices.", "Stack and press meat, refrigerate 4 hours.", "Grill or roast at high heat.", "Slice thinly once charred.", "Make garlic sauce (toum): garlic, oil, lemon.", "Warm pita bread.", "Wrap meat with pickles, tomato, garlic sauce."] },

    { name: "Tabbouleh", cuisine: "lebanese", vegetarian: true, egg: false, time: 20, emoji: "🌿",
      desc: "A mountain of finely chopped parsley with bulgur wheat, tomato, and lemon — refreshingly green.",
      ingredients: ["1 cup fresh parsley, chopped", "1 cup bulgur wheat", "3 medium tomatoes (or 1 can crushed)", "2 medium onions, diced", "2 lemons", "3 tbsp extra-virgin olive oil", "1/4 cup fresh mint"],
      spices: ["allspice", "salt", "black pepper"],
      steps: ["Soak bulgur wheat in hot water 15 minutes.", "Finely chop a large bunch of parsley.", "Dice tomatoes and onion very small.", "Drain bulgur thoroughly.", "Mix everything with olive oil and lemon juice.", "Season with allspice, salt, pepper.", "Let sit 10 minutes for flavors to meld."] },

    { name: "Kibbeh", cuisine: "lebanese", vegetarian: false, egg: false, time: 50, emoji: "🫒",
      desc: "Crispy bulgur shell stuffed with spiced lamb, pine nuts, and onions — the national dish.",
      ingredients: ["1 cup bulgur wheat", "400g lamb (cubed)", "2 medium onions, diced", "1/4 cup pine nuts", "3 tbsp butter (45g)", "3 tbsp neutral oil"],
      spices: ["allspice", "cinnamon", "cumin", "black pepper", "nutmeg"],
      steps: ["Soak fine bulgur, squeeze dry.", "Mix bulgur with seasoned ground lamb for shell.", "Brown pine nuts in butter for filling.", "Sauté onion and lamb with spices for filling.", "Form torpedo shapes, stuff with filling.", "Seal ends smoothly.", "Deep fry until golden brown and crispy."] },

    // ==================== THAI ====================
    { name: "Pad Thai", cuisine: "thai", vegetarian: false, egg: true, time: 20, emoji: "🍜",
      desc: "Stir-fried rice noodles with shrimp, egg, bean sprouts, and tamarind sauce — Thailand's gift to the world.",
      ingredients: ["200g rice noodles", "300g shrimp (peeled)", "3 large eggs", "1 cup bean sprouts", "4 green onions, sliced", "1/2 cup peanuts", "2 limes", "300g tofu (cubed)"],
      spices: ["tamarind", "fish sauce", "chili flakes", "sugar"],
      steps: ["Soak rice noodles in warm water.", "Make sauce: tamarind, fish sauce, sugar.", "Stir-fry shrimp and tofu in hot wok.", "Push aside, scramble eggs.", "Add drained noodles and sauce.", "Toss until noodles absorb sauce.", "Serve with bean sprouts, peanuts, lime."] },

    { name: "Green Curry", cuisine: "thai", vegetarian: false, egg: false, time: 25, emoji: "🥘",
      desc: "Aromatic coconut milk curry with Thai basil, bamboo shoots, and vibrant green curry paste.",
      ingredients: ["500g chicken (boneless, cubed)", "1 can coconut milk (400ml)", "3 tbsp green curry paste", "1 cup bamboo shoots", "1/4 cup thai basil", "2 medium eggplants", "2 tbsp fish sauce"],
      spices: ["lemongrass", "galangal", "kaffir lime", "chili"],
      steps: ["Fry green curry paste in coconut cream.", "Add chicken, cook until sealed.", "Pour in coconut milk.", "Add eggplant and bamboo shoots.", "Season with fish sauce and palm sugar.", "Simmer until chicken is cooked through.", "Finish with Thai basil leaves."] },

    { name: "Tom Yum Soup", cuisine: "thai", vegetarian: false, egg: false, time: 20, emoji: "🍲",
      desc: "Hot and sour soup with shrimp, mushrooms, and explosive lemongrass-galangal aroma.",
      ingredients: ["300g shrimp (peeled)", "300g mushrooms", "2 stalks lemongrass", "1 inch galangal", "2 limes", "1 tsp chili powder", "1/2 cup fresh cilantro", "2 tbsp fish sauce"],
      spices: ["lemongrass", "galangal", "kaffir lime leaves", "chili"],
      steps: ["Boil stock with lemongrass, galangal, lime leaves.", "Add mushrooms, cook 3 minutes.", "Add shrimp, cook until pink.", "Season with fish sauce and lime juice.", "Add chili paste for color and heat.", "Remove from heat.", "Garnish with cilantro and fresh chilies."] },

    { name: "Mango Sticky Rice", cuisine: "thai", vegetarian: true, egg: false, time: 35, emoji: "🥭",
      desc: "Sweet coconut sticky rice with ripe mango slices — Thailand's most beloved dessert.",
      ingredients: ["1 cup sticky rice", "1 can coconut milk (400ml)", "2 ripe mangoes", "2 tbsp sugar", "salt to taste"],
      spices: ["salt"],
      steps: ["Soak sticky rice 4 hours or overnight.", "Steam rice until translucent and chewy.", "Heat coconut milk with sugar and salt.", "Pour most of coconut sauce over hot rice.", "Let rice absorb sauce 15 minutes.", "Slice ripe mango.", "Serve rice with mango and remaining sauce."] },

    // ==================== JAPANESE ====================
    { name: "Chicken Katsu Curry", cuisine: "japanese", vegetarian: false, egg: true, time: 40, emoji: "🍛",
      desc: "Crispy panko-crusted chicken cutlet with thick, sweet Japanese curry sauce over rice.",
      ingredients: ["500g chicken (boneless, cubed)", "1 cup panko", "3 large eggs", "2.5 cups flour (300g)", "3 medium potatoes", "2 medium carrots", "2 medium onions, diced", "1 cup rice (200g)", "1/2 pack curry roux blocks"],
      spices: ["garam masala", "turmeric", "black pepper"],
      steps: ["Flatten chicken breast, season.", "Dredge in flour, egg, then panko.", "Deep fry until golden and crispy.", "Sauté onion, carrot, potato for curry.", "Add water and curry roux blocks.", "Simmer until thick and vegetables tender.", "Serve katsu sliced over rice with curry."] },

    { name: "Miso Soup", cuisine: "japanese", vegetarian: true, egg: false, time: 10, emoji: "🥣",
      desc: "Simple, warm dashi broth with dissolved miso paste, tofu cubes, and wakame seaweed.",
      ingredients: ["3 tbsp miso paste", "300g tofu (cubed)", "2 tbsp dried wakame", "4 cups dashi stock (1L)", "4 green onions, sliced"],
      spices: [],
      steps: ["Heat dashi stock (don't boil).", "Add wakame seaweed, rehydrate.", "Cut tofu into small cubes.", "Add tofu, heat through.", "Remove from heat, dissolve miso paste.", "Never boil after adding miso.", "Serve with sliced green onions."] },

    { name: "Teriyaki Salmon", cuisine: "japanese", vegetarian: false, egg: false, time: 20, emoji: "🐟",
      desc: "Glazed salmon fillet with sweet-savory teriyaki sauce — simple elegance.",
      ingredients: ["2 salmon fillets (180g each)", "3 tbsp soy sauce", "2 tbsp mirin", "2 tbsp sake", "2 tbsp sugar", "1 inch ginger, grated", "1 cup rice (200g)"],
      spices: ["sesame seeds", "ginger"],
      steps: ["Mix soy sauce, mirin, sake, sugar for teriyaki.", "Season salmon with salt and pepper.", "Pan-sear salmon skin-side down.", "Flip, add teriyaki sauce to pan.", "Baste salmon as sauce thickens.", "Cook until glazed and caramelized.", "Serve over rice with steamed vegetables."] },

    { name: "Onigiri", cuisine: "japanese", vegetarian: false, egg: false, time: 15, emoji: "🍙",
      desc: "Hand-formed rice triangles with savory fillings wrapped in nori — Japan's perfect snack.",
      ingredients: ["1.5 cups sushi rice", "4 nori sheets", "2 salmon fillets (180g each)", "200g tuna", "4 umeboshi plums", "salt to taste"],
      spices: ["sesame seeds", "furikake"],
      steps: ["Cook sushi rice, season with salt.", "Wet hands with salted water.", "Place rice in palm, add filling in center.", "Form into triangle shape firmly.", "Wrap with strip of nori seaweed.", "Sprinkle with sesame or furikake.", "Eat immediately or wrap for later."] },

    // ==================== MEXICAN ====================
    { name: "Tacos al Pastor", cuisine: "mexican", vegetarian: false, egg: false, time: 35, emoji: "🌮",
      desc: "Marinated pork with pineapple on warm corn tortillas — Mexico City street food royalty.",
      ingredients: ["400g pork", "1/2 pineapple (sliced)", "8 corn tortillas", "2 medium onions, diced", "1/2 cup fresh cilantro", "2 limes"],
      spices: ["achiote", "cumin", "oregano", "chili", "paprika", "garlic powder"],
      steps: ["Marinate pork in achiote, chili, pineapple juice.", "Grill or roast pork until charred edges.", "Grill pineapple slices until caramelized.", "Dice pork and pineapple.", "Warm corn tortillas.", "Assemble tacos with meat, pineapple, onion, cilantro.", "Squeeze lime and add salsa."] },

    { name: "Guacamole", cuisine: "mexican", vegetarian: true, egg: false, time: 10, emoji: "🥑",
      desc: "Chunky smashed avocado with lime, cilantro, and jalapeño — the dip that needs no introduction.",
      ingredients: ["2 ripe avocados", "2 limes", "1/2 cup fresh cilantro", "2 medium onions, diced", "3 medium tomatoes (or 1 can crushed)", "1-2 jalapeños", "salt to taste"],
      spices: ["cumin", "salt", "black pepper"],
      steps: ["Halve avocados, remove pit.", "Scoop into bowl, mash to desired texture.", "Add diced onion, tomato, jalapeño.", "Squeeze in fresh lime juice.", "Chop and add cilantro.", "Season with salt and cumin.", "Serve immediately with tortilla chips."] },

    { name: "Enchiladas", cuisine: "mexican", vegetarian: false, egg: false, time: 40, emoji: "🫔",
      desc: "Rolled tortillas stuffed with chicken and cheese, smothered in rich red chili sauce.",
      ingredients: ["8 corn tortillas", "500g chicken (boneless, cubed)", "150g cheese (shredded)", "2 medium onions, diced", "1/2 cup sour cream", "3 medium tomatoes (or 1 can crushed)"],
      spices: ["chili powder", "cumin", "oregano", "garlic powder", "paprika"],
      steps: ["Shred cooked chicken, mix with cheese and onion.", "Make red enchilada sauce with dried chilies.", "Dip tortillas in sauce to soften.", "Fill tortillas with chicken mixture, roll.", "Place seam-down in baking dish.", "Pour remaining sauce over, top with cheese.", "Bake at 190°C for 20 minutes until bubbly."] },

    { name: "Churros", cuisine: "mexican", vegetarian: true, egg: true, time: 25, emoji: "🍩",
      desc: "Crispy ridged fried dough sticks rolled in cinnamon sugar — irresistible with chocolate sauce.",
      ingredients: ["2.5 cups flour (300g)", "3 tbsp butter (45g)", "3 large eggs", "2 tbsp sugar", "1 cinnamon stick", "3 tbsp neutral oil", "100g dark chocolate"],
      spices: ["cinnamon", "vanilla"],
      steps: ["Boil water with butter and salt.", "Add flour all at once, stir vigorously.", "Cool slightly, beat in eggs one at a time.", "Pipe through star tip into hot oil.", "Fry until golden and crispy.", "Roll in cinnamon sugar while warm.", "Serve with melted chocolate for dipping."] },

    { name: "Black Bean Soup", cuisine: "mexican", vegetarian: true, egg: false, time: 35, emoji: "🫘",
      desc: "Smoky, earthy black bean soup with cumin, lime, and all the fixings.",
      ingredients: ["1.5 cups black beans (or 1 can)", "2 medium onions, diced", "5 cloves garlic, minced", "3 medium tomatoes (or 1 can crushed)", "1-2 jalapeños", "2 limes", "1/2 cup fresh cilantro", "1/2 cup sour cream"],
      spices: ["cumin", "chili powder", "oregano", "smoked paprika", "black pepper"],
      steps: ["Sauté onion, garlic, jalapeño.", "Add black beans, tomatoes, stock.", "Season with cumin, chili, smoked paprika.", "Simmer 20 minutes.", "Blend half for creamy texture.", "Season with lime juice and salt.", "Serve with sour cream, cilantro, tortilla chips."] },
];
// ========================================
// AI PROCEDURAL RECIPE GENERATOR
// Generates a unique recipe every time by mixing techniques,
// proteins, vegetables, spices, herbs, and finishing touches.
// ========================================
const aiPools = {
    techniques: {
        creative: [
            { type: "Cloud Risotto", emoji: "✨", time: 45, difficulty: "Advanced", base: "arborio rice", style: "italian-modern", method: "stirred slowly with warm stock until each grain blooms" },
            { type: "Confit", emoji: "🌿", time: 90, difficulty: "Intermediate", base: "olive oil", style: "french-modern", method: "slow-cooked submerged in fat at 90°C" },
            { type: "Sous Vide & Sear", emoji: "🔬", time: 60, difficulty: "Advanced", base: "vacuum bag", style: "modernist", method: "cooked precisely at 63°C, finished with a screaming-hot sear" },
            { type: "Cloud Foam", emoji: "☁️", time: 30, difficulty: "Advanced", base: "lecithin", style: "molecular", method: "aerated into a weightless foam" },
            { type: "Smoked & Glazed", emoji: "💨", time: 50, difficulty: "Intermediate", base: "applewood smoke", style: "fusion", method: "smoked low-and-slow then finished with a glaze" },
            { type: "Crispy Tower", emoji: "🗼", time: 40, difficulty: "Intermediate", base: "phyllo", style: "modernist", method: "stacked into architectural layers with crisp shards" },
            { type: "Carpaccio", emoji: "🪄", time: 20, difficulty: "Intermediate", base: "thin slices", style: "italian-modern", method: "shaved paper-thin and dressed with citrus oil" },
            { type: "Black Garlic Galette", emoji: "🌑", time: 55, difficulty: "Advanced", base: "buttery dough", style: "french-fusion", method: "wrapped rustically and roasted until deeply caramelized" }
        ],
        traditional: [
            { type: "Slow-Simmered Curry", emoji: "🍛", time: 60, difficulty: "Simple (patience)", base: "tomato-onion masala", style: "indian-classic", method: "simmered low until oil separates and flavors deepen" },
            { type: "Sunday Ragu", emoji: "🍅", time: 180, difficulty: "Simple (patience)", base: "San Marzano tomatoes", style: "italian-classic", method: "simmered for hours over the lowest flame" },
            { type: "Dum Biryani", emoji: "🍚", time: 120, difficulty: "Advanced", base: "aged basmati", style: "indian-classic", method: "layered and steam-sealed under dough" },
            { type: "Tagine", emoji: "🥘", time: 90, difficulty: "Intermediate", base: "preserved lemon", style: "moroccan", method: "braised under a conical lid for tenderness" },
            { type: "Stuffed Vegetables", emoji: "🫑", time: 75, difficulty: "Intermediate", base: "rice & herb filling", style: "lebanese-classic", method: "hollowed, stuffed, and baked in a tomato bath" },
            { type: "Hearth Bread", emoji: "🍞", time: 90, difficulty: "Intermediate", base: "high-hydration dough", style: "rustic", method: "long-fermented and baked on a hot stone" },
            { type: "Country Stew", emoji: "🍲", time: 110, difficulty: "Simple (patience)", base: "root vegetables", style: "rustic", method: "braised in stock with bay and thyme" },
            { type: "Clay Pot Rice", emoji: "🍯", time: 45, difficulty: "Intermediate", base: "jasmine rice", style: "asian-classic", method: "cooked in a clay pot to develop crispy bottom crust" }
        ],
        fusion: [
            { type: "Miso Butter Pasta", emoji: "🌊", time: 20, difficulty: "Simple", base: "spaghetti", style: "italo-japanese", method: "tossed in emulsified miso butter sauce" },
            { type: "Korean-Spiced Tacos", emoji: "🔥", time: 35, difficulty: "Intermediate", base: "corn tortillas", style: "kor-mex", method: "glazed in gochujang and tucked into charred tortillas" },
            { type: "Tandoori Pizza", emoji: "🍕", time: 40, difficulty: "Intermediate", base: "naan-style dough", style: "indo-italian", method: "blistered in a screaming-hot oven, topped with tandoor flavors" },
            { type: "Banh Mi Bowl", emoji: "🥖", time: 30, difficulty: "Simple", base: "jasmine rice", style: "viet-fusion", method: "deconstructed into a bowl with pickles and herbs" },
            { type: "Sushi Burrito", emoji: "🌯", time: 35, difficulty: "Intermediate", base: "nori sheet", style: "jap-mex", method: "rolled into an oversized handheld feast" },
            { type: "Curry Pizza", emoji: "🍛", time: 35, difficulty: "Intermediate", base: "thin crust", style: "indo-italian", method: "spread with curry-spiced base and topped" },
            { type: "Mediterranean Ramen", emoji: "🌿", time: 30, difficulty: "Intermediate", base: "ramen noodles", style: "med-japanese", method: "in a herb-and-olive-infused broth" },
            { type: "Tahini Tiramisu", emoji: "🍮", time: 30, difficulty: "Simple", base: "ladyfingers", style: "italo-mediterranean", method: "layered with tahini-spiked mascarpone" }
        ],
        healthy: [
            { type: "Buddha Bowl", emoji: "🌈", time: 25, difficulty: "Simple", base: "quinoa", style: "wellness", method: "arranged in vibrant sections with a creamy dressing" },
            { type: "Grain Salad", emoji: "🌾", time: 25, difficulty: "Simple", base: "farro", style: "mediterranean", method: "tossed warm with herbs, citrus, and crunch" },
            { type: "Steamed Bowl", emoji: "🍵", time: 20, difficulty: "Simple", base: "brown rice", style: "asian-clean", method: "steamed gently and dressed lightly" },
            { type: "Roasted Veg Platter", emoji: "🥗", time: 35, difficulty: "Simple", base: "seasonal vegetables", style: "mediterranean", method: "roasted at high heat until edges char and centers caramelize" },
            { type: "Lentil Power Bowl", emoji: "💪", time: 30, difficulty: "Simple", base: "puy lentils", style: "mediterranean-clean", method: "simmered with aromatics and bowled with greens" },
            { type: "Spiralized Veggie Pasta", emoji: "🥒", time: 20, difficulty: "Simple", base: "zucchini noodles", style: "wellness", method: "spiralized raw and tossed with a vibrant sauce" },
            { type: "Sheet-Pan Roast", emoji: "🔥", time: 30, difficulty: "Simple", base: "mixed vegetables", style: "wellness", method: "spread on a single tray and roasted high heat" },
            { type: "Smoothie Bowl", emoji: "🥣", time: 10, difficulty: "Simple", base: "frozen fruit", style: "wellness", method: "blended thick and topped with crunch" }
        ]
    },
    proteins: ["paneer", "halloumi", "extra-firm tofu", "tempeh", "smoked tofu", "ricotta", "burrata", "feta", "labneh", "lentils", "chickpeas", "black beans", "edamame", "seitan", "jackfruit", "tofu skin (yuba)", "soft-boiled egg", "ricotta dumplings"],
    heroVeg: ["king oyster mushrooms", "porcini", "shiitake", "morel mushrooms", "roasted cauliflower", "charred eggplant", "smoked carrots", "blistered shishitos", "heirloom tomatoes", "roasted beets", "delicata squash", "kabocha squash", "globe artichokes", "fennel bulb", "leeks", "white asparagus", "purple sweet potato", "celeriac", "kohlrabi", "romanesco"],
    aromatics: ["shallots", "spring onion", "leeks", "fennel", "ginger", "garlic confit", "lemongrass", "galangal", "kaffir lime leaves", "curry leaves", "preserved lemon", "Thai basil"],
    spices: ["saffron", "smoked paprika", "Aleppo pepper", "sumac", "Urfa biber", "fennel pollen", "Sichuan pepper", "long pepper", "grains of paradise", "black cardamom", "green cardamom", "Tellicherry pepper", "Espelette pepper", "Kashmiri chili", "ras el hanout", "zaatar", "garam masala", "Chinese five-spice", "shichimi togarashi"],
    herbs: ["fresh thyme", "lemon thyme", "tarragon", "chervil", "lovage", "fresh basil", "Thai basil", "Italian parsley", "cilantro", "fresh mint", "dill", "chives", "marjoram", "shiso leaves", "sorrel", "fresh oregano"],
    sauces: ["brown butter", "tahini-yogurt", "salsa verde", "harissa-honey glaze", "miso-maple glaze", "chimichurri", "romesco", "saffron aioli", "preserved lemon dressing", "tahini-lemon drizzle", "yuzu vinaigrette", "pomegranate molasses reduction", "black garlic crema", "sesame-soy emulsion", "cashew cream", "smoked tomato coulis"],
    crunch: ["toasted pine nuts", "candied walnuts", "crispy shallots", "panko breadcrumbs", "nori shards", "puffed quinoa", "sumac croutons", "spiced chickpeas", "everything bagel seeds", "pomegranate seeds", "candied pistachios", "dukkah", "hazelnut praline"],
    finishers: ["microgreens", "edible flowers", "lemon zest", "olive oil drizzle", "flaky sea salt", "cracked Tellicherry pepper", "shaved parmesan", "fresh herb oil", "smoked olive oil", "truffle salt", "yuzu kosho", "chili crisp"],
    adjectives: ["Saffron-Kissed", "Smoky", "Charred", "Velvet", "Midnight", "Sunset", "Heirloom", "Whispering", "Golden", "Garden", "Crystal", "Twilight", "Ember", "Aurora", "Moonlit", "Cloud", "Forest", "Coastal", "Marbled", "Burnished", "Wildflower", "Citrus", "Rose-Hued", "Honey-Glazed", "Sage-Brushed"],
    feelings: ["feels like coming home", "transcends seasons", "stops time for a moment", "rewards patience", "tastes like a memory", "makes the room go quiet", "brings everyone to the table"],
    textures: ["cloud", "ribbon", "tower", "tangle", "drift", "cascade", "halo", "pool", "swirl"],
    textureAdjs: ["silken", "shatteringly crisp", "buttery", "feather-light", "deeply caramelized", "luxuriously creamy", "delicately layered", "richly glossed"],
    styleShorts: { "italian-modern": "Italian", "french-modern": "French", "modernist": "Modernist", "molecular": "Molecular Gastronomy", "fusion": "Fusion", "italian-classic": "Italian", "indian-classic": "Indian", "moroccan": "Moroccan", "lebanese-classic": "Lebanese", "rustic": "Rustic", "asian-classic": "Asian", "italo-japanese": "Italo-Japanese", "kor-mex": "Korean-Mexican", "indo-italian": "Indo-Italian", "viet-fusion": "Vietnamese", "jap-mex": "Japanese-Mexican", "med-japanese": "Mediterranean-Japanese", "italo-mediterranean": "Italo-Mediterranean", "wellness": "Clean & Green", "mediterranean": "Mediterranean", "asian-clean": "Asian-Clean", "mediterranean-clean": "Mediterranean", "french-fusion": "French-Fusion" },
    taglineTemplates: [
        "A dish that {feeling} — {hero} meets {sauceShort} in a {texture} of {styleShort} perfection.",
        "{styleShort} done right: {feeling}, {textureAdj}, and impossible to put down.",
        "The kind of {type} that {feeling}. Built around {hero} and finished with {finisher}.",
        "Where {hero} meets {sauceShort}: a love letter to {styleShort} cooking.",
        "Comfort, evolved. {hero} carries the soul; {finisher} carries the moment.",
        "{textureAdj} layers of {hero}, {herb}, and {sauceShort} — a quiet kind of magic.",
        "If craving had a recipe, this would be it. {hero}, {sauceShort}, and a whisper of {spice}."
    ],
    tipTemplates: [
        "The secret is {ingredient} — it does the heavy lifting and bridges every other flavor in the dish.",
        "Don't rush the {step}. That's where the depth lives.",
        "{ingredient} is non-negotiable here. Substitute it and you lose the soul of the dish.",
        "Temperature matters more than time: keep your {liquid} just below a simmer.",
        "Finish with cold {fat} off the heat — it adds gloss and richness without breaking the sauce.",
        "Toast your spices in {fat} before anything else. 30 seconds. You'll smell when it's ready.",
        "Salt early, salt often, taste constantly. That's the entire secret to seasoning."
    ]
};

function aiPick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// Add a sensible measurement prefix to an AI-generated ingredient.
// If the ingredient already starts with a digit/quantity, leave it alone.
function addMeasurement(ing) {
    if (!ing) return ing;
    if (/^\d/.test(ing)) return ing;            // already has a number
    if (/^(a |an )/i.test(ing)) return ing;     // already has an article
    const lower = ing.toLowerCase();

    // Specific known starters
    const starts = (s) => lower.startsWith(s);
    const has = (s) => lower.includes(s);

    // Salt / pepper / oil
    if (lower === 'flaky sea salt' || lower === 'salt') return 'salt to taste';
    if (lower === 'flaky salt' || lower === 'sea salt') return 'flaky sea salt to taste';
    if (lower === 'extra-virgin olive oil' || lower === 'olive oil') return '3 tbsp extra-virgin olive oil';
    if (has('truffle oil') || has('chili oil') || has('sesame oil')) return `1 tsp ${ing}`;

    // Grains / starches / bases
    if (has('arborio') || has('basmati') || has('jasmine rice')) return `1.5 cups ${ing}`;
    if (lower === 'rice' || has('brown rice') || has('sticky rice') || has('sushi rice')) return `1 cup ${ing}`;
    if (has('quinoa') || has('couscous') || has('farro') || has('bulgur')) return `1 cup ${ing}`;
    if (has('lentils')) return `1 cup ${ing}`;
    if (has('chickpeas') || has('beans')) return `1.5 cups ${ing}`;
    if (has('pasta') || has('spaghetti') || has('penne') || has('noodles') || has('tortillas')) return `400g ${ing}`;
    if (has('phyllo') || has('dough') || has('crust') || has('pastry') || has('bread') || has('tortilla') || has('wrapper') || has('flatbread') || has('nori')) {
        if (has('nori')) return `4 sheets ${ing}`;
        return `300g ${ing}`;
    }

    // Proteins / dairy
    if (has('paneer') || has('halloumi') || has('feta') || has('ricotta') || has('mozzarella') || has('burrata') || has('parmesan') || has('pecorino')) return `200g ${ing}`;
    if (has('tofu') || has('tempeh') || has('seitan')) return `300g ${ing}`;
    if (has('jackfruit') || has('yuba') || has('labneh')) return `200g ${ing}`;
    if (has('egg')) return has('soft-boiled') || has('63°c') || has('boiled') ? `2 ${ing}` : `3 large ${ing}`;
    if (has('chickpeas')) return `1.5 cups ${ing}`;

    // Vegetables / hero items
    if (has('mushroom') || has('porcini') || has('shiitake') || has('morel') || has('oyster mushroom')) return `300g ${ing}`;
    if (has('cauliflower') || has('artichoke') || has('romanesco') || has('kabocha') || has('squash')) return `1 medium ${ing}`;
    if (has('eggplant') || has('aubergine')) return `2 medium ${ing}`;
    if (has('carrot')) return `2 medium ${ing}`;
    if (has('beet')) return `3 medium ${ing}`;
    if (has('sweet potato')) return `2 medium ${ing}`;
    if (has('potato')) return `3 medium ${ing}`;
    if (has('tomato')) return `3 medium ${ing}`;
    if (has('shishito') || has('asparagus') || has('snap pea') || has('edamame')) return `200g ${ing}`;
    if (has('leek') || has('fennel bulb')) return `2 ${ing}`;
    if (has('shallot')) return `3 ${ing}`;
    if (has('onion')) return `2 medium ${ing}`;
    if (has('garlic')) return `4 cloves ${ing}`;
    if (has('ginger') || has('galangal')) return `1 inch ${ing}`;
    if (has('lemongrass')) return `2 stalks ${ing}`;
    if (has('lime leaves') || has('curry leaves') || has('kaffir lime')) return `8 ${ing}`;
    if (has('preserved lemon')) return `1 ${ing}`;

    // Sauces / dressings / liquids (ml/cups)
    if (has('butter')) return `3 tbsp ${ing}`;
    if (has('coconut milk')) return `1 can (400ml) ${ing}`;
    if (has('stock') || has('broth') || has('dashi')) return `4 cups ${ing}`;
    if (has('wine')) return `1/2 cup ${ing}`;
    if (has('miso paste') || has('miso')) return `2 tbsp ${ing}`;
    if (has('tahini')) return `1/3 cup ${ing}`;
    if (has('cream') || has('crema') || has('coulis')) return `1/2 cup ${ing}`;
    if (has('molasses')) return `2 tbsp ${ing}`;
    if (has('vinaigrette') || has('drizzle') || has('emulsion') || has('aioli') || has('chimichurri') || has('romesco') || has('salsa') || has('glaze')) return `1/3 cup ${ing}`;
    if (has('yogurt')) return `1 cup ${ing}`;

    // Spices / dry seasonings
    const spiceKeywords = ['saffron','paprika','aleppo','sumac','urfa biber','fennel pollen','sichuan','peppercorn','grains of paradise','cardamom','tellicherry','espelette','kashmiri','ras el hanout','zaatar','garam masala','five-spice','shichimi','togarashi','cumin','turmeric','coriander','chili','chili flakes','chili powder','mustard seeds','asafoetida','allspice','nutmeg','cinnamon stick','clove','bay leaf','tamarind'];
    if (spiceKeywords.some(k => lower.includes(k))) {
        if (has('saffron')) return `a pinch of ${ing}`;
        if (has('cinnamon stick') || has('bay leaf') || has('cardamom') || has('clove')) return `4 ${ing}`;
        return `1 tsp ${ing}`;
    }

    // Herbs (fresh)
    const herbKeywords = ['thyme','tarragon','chervil','lovage','basil','parsley','cilantro','mint','dill','chives','marjoram','shiso','sorrel','oregano'];
    if (herbKeywords.some(k => lower.includes(k))) return `2 tbsp ${ing}`;

    // Crunch / nuts / seeds / topping garnishes
    const crunchKeywords = ['pine nuts','walnuts','panko','breadcrumbs','sesame seeds','pistachios','hazelnut','dukkah','quinoa','croutons','chickpeas','seeds','almonds','peanuts'];
    if (crunchKeywords.some(k => lower.includes(k))) return `1/4 cup ${ing}`;

    // Finishers / garnishes (small amounts)
    const finisherKeywords = ['microgreens','edible flowers','lemon zest','lime zest','herb oil','chili crisp','yuzu kosho','truffle salt','smoked olive oil'];
    if (finisherKeywords.some(k => lower.includes(k))) return `to taste, ${ing}`;

    // Sweeteners
    if (has('honey') || has('maple') || has('sugar')) return `2 tbsp ${ing}`;

    // Default fallback — moderate amount
    return `${ing} (to taste)`;
}
function aiPickN(arr, n) {
    const copy = [...arr];
    const out = [];
    for (let i = 0; i < n && copy.length; i++) {
        out.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
    }
    return out;
}

// Keyword → dish-type override. When the prompt mentions one of these,
// the AI uses a matching technique and tunes the recipe accordingly.
const aiKeywordTechniques = {
    sandwich: { type: "Sandwich", emoji: "🥪", time: 15, difficulty: "Simple", base: "rustic sourdough", style: "modern", method: "layered between toasted bread with care", isHandheld: true },
    burger: { type: "Veggie Burger", emoji: "🍔", time: 25, difficulty: "Simple", base: "homemade veggie patty", style: "modern", method: "stacked tall in a brioche bun" },
    pizza: { type: "Pizza", emoji: "🍕", time: 35, difficulty: "Intermediate", base: "thin crust dough", style: "italian-modern", method: "blistered in a screaming-hot oven" },
    pasta: { type: "Pasta", emoji: "🍝", time: 20, difficulty: "Simple", base: "fresh pasta", style: "italian-modern", method: "tossed in an emulsified sauce off the heat" },
    soup: { type: "Soup", emoji: "🍲", time: 35, difficulty: "Simple", base: "vegetable stock", style: "rustic", method: "simmered until flavors meld and deepen" },
    stew: { type: "Stew", emoji: "🥘", time: 75, difficulty: "Simple (patience)", base: "tomato base", style: "rustic", method: "braised low and slow until silky" },
    curry: { type: "Curry", emoji: "🍛", time: 45, difficulty: "Intermediate", base: "coconut milk", style: "asian-classic", method: "simmered with aromatics until rich and glossy" },
    salad: { type: "Salad", emoji: "🥗", time: 15, difficulty: "Simple", base: "mixed greens", style: "wellness", method: "tossed gently with a bright dressing" },
    bowl: { type: "Bowl", emoji: "🥣", time: 25, difficulty: "Simple", base: "grain base", style: "wellness", method: "arranged with sections of color and texture" },
    rice: { type: "Rice Bowl", emoji: "🍚", time: 30, difficulty: "Simple", base: "jasmine rice", style: "asian-clean", method: "served over fluffy rice with bold toppings" },
    noodle: { type: "Noodles", emoji: "🍜", time: 20, difficulty: "Simple", base: "fresh noodles", style: "asian-classic", method: "stir-fried over high heat in a screaming-hot wok" },
    ramen: { type: "Ramen", emoji: "🍜", time: 35, difficulty: "Intermediate", base: "ramen noodles", style: "italo-japanese", method: "served in a deeply umami broth" },
    taco: { type: "Tacos", emoji: "🌮", time: 25, difficulty: "Simple", base: "corn tortillas", style: "kor-mex", method: "tucked into charred tortillas with bright toppings" },
    burrito: { type: "Burrito", emoji: "🌯", time: 30, difficulty: "Simple", base: "flour tortilla", style: "modern", method: "rolled tight with fillings packed end to end" },
    wrap: { type: "Wrap", emoji: "🌯", time: 15, difficulty: "Simple", base: "warm flatbread", style: "modern", method: "rolled with crisp vegetables and creamy sauce" },
    risotto: { type: "Risotto", emoji: "🍚", time: 45, difficulty: "Intermediate", base: "arborio rice", style: "italian-modern", method: "stirred slowly with warm stock until each grain blooms" },
    biryani: { type: "Biryani", emoji: "🍚", time: 90, difficulty: "Advanced", base: "aged basmati", style: "indian-classic", method: "layered and steam-sealed under dough" },
    cake: { type: "Cake", emoji: "🍰", time: 60, difficulty: "Intermediate", base: "buttery batter", style: "modern", method: "baked until just set with a tender crumb" },
    cookie: { type: "Cookies", emoji: "🍪", time: 25, difficulty: "Simple", base: "butter dough", style: "modern", method: "baked until edges crisp and centers stay chewy" },
    bread: { type: "Bread", emoji: "🍞", time: 90, difficulty: "Intermediate", base: "high-hydration dough", style: "rustic", method: "long-fermented and baked on a hot stone" },
    pancake: { type: "Pancakes", emoji: "🥞", time: 20, difficulty: "Simple", base: "buttermilk batter", style: "modern", method: "ladled onto a hot griddle and flipped once" },
    omelette: { type: "Omelette", emoji: "🍳", time: 10, difficulty: "Simple", base: "whisked eggs", style: "french-modern", method: "swirled in butter until just set with a creamy center" },
    smoothie: { type: "Smoothie Bowl", emoji: "🥣", time: 10, difficulty: "Simple", base: "frozen fruit", style: "wellness", method: "blended thick and topped with crunch" },
    dumpling: { type: "Dumplings", emoji: "🥟", time: 45, difficulty: "Intermediate", base: "thin wrapper dough", style: "asian-classic", method: "pleated and steamed until tender" },
    "stir fry": { type: "Stir Fry", emoji: "🥦", time: 15, difficulty: "Simple", base: "mixed vegetables", style: "asian-classic", method: "tossed over screaming-hot heat in a wok" },
    quesadilla: { type: "Quesadilla", emoji: "🫓", time: 15, difficulty: "Simple", base: "flour tortilla", style: "modern", method: "pan-toasted until cheese melts and crust crisps" },
    casserole: { type: "Casserole", emoji: "🥘", time: 60, difficulty: "Simple", base: "layered vegetables", style: "rustic", method: "baked under a golden bubbly crust" },
    tart: { type: "Tart", emoji: "🥧", time: 60, difficulty: "Intermediate", base: "buttery pastry", style: "french-modern", method: "blind-baked then filled and finished" },
    crepe: { type: "Crepe", emoji: "🥞", time: 25, difficulty: "Simple", base: "thin batter", style: "french-modern", method: "swirled paper-thin in a hot pan" },
    parfait: { type: "Parfait", emoji: "🥣", time: 10, difficulty: "Simple", base: "yogurt", style: "wellness", method: "layered in a glass for elegant presentation" }
};

// Ingredient hints — if mentioned in prompt, weave them in
const aiIngredientKeywords = ["paneer", "tofu", "halloumi", "mushroom", "spinach", "tomato", "potato", "rice", "lentil", "chickpea", "egg", "cheese", "avocado", "broccoli", "cauliflower", "eggplant", "carrot", "pasta", "noodle", "bean", "corn", "pumpkin", "squash", "kale", "garlic", "ginger", "lemon", "lime", "basil", "mint", "cilantro", "chocolate", "berry", "apple", "banana", "mango"];

// Mood / flavor keywords that adjust the recipe
const aiMoodKeywords = {
    spicy: { spices: ["chili flakes", "Aleppo pepper", "Kashmiri chili", "smoked paprika"], adj: "Fiery" },
    sweet: { sauces: ["honey-miso glaze", "maple-tahini drizzle"], adj: "Honey-Glazed" },
    savory: { spices: ["zaatar", "smoked paprika", "fennel pollen"], adj: "Savory" },
    creamy: { sauces: ["cashew cream", "tahini-yogurt", "brown butter"], adj: "Velvet" },
    crispy: { adj: "Shatteringly Crisp" },
    healthy: { adj: "Garden-Fresh" },
    quick: { time: 15 },
    fancy: { difficulty: "Advanced", adj: "Saffron-Kissed" },
    cozy: { adj: "Wildflower" },
    fresh: { adj: "Garden" },
    smoky: { adj: "Smoky", spices: ["smoked paprika", "Urfa biber"] },
    light: { adj: "Feather-Light" },
    rich: { adj: "Velvet" },
    summer: { adj: "Sunset" },
    winter: { adj: "Hearth" }
};

function detectKeywordTechnique(promptLower) {
    // Longest keyword wins (e.g. "stir fry" before "fry")
    const keys = Object.keys(aiKeywordTechniques).sort((a, b) => b.length - a.length);
    for (const k of keys) {
        if (promptLower.includes(k)) return { ...aiKeywordTechniques[k], keyword: k };
    }
    return null;
}

function detectIngredients(promptLower) {
    return aiIngredientKeywords.filter(ing => promptLower.includes(ing));
}

function detectMoods(promptLower) {
    return Object.keys(aiMoodKeywords).filter(k => promptLower.includes(k));
}

function generateUniqueRecipe(style, userPrompt) {
    const promptText = (userPrompt || '').trim();
    const promptLower = promptText.toLowerCase();

    // 1. Look for a known dish-format keyword (sandwich, pasta, soup...)
    const keyTech = detectKeywordTechnique(promptLower);
    const tech = keyTech || aiPick(aiPools.techniques[style] || aiPools.techniques.creative);

    // 2. Detect specific ingredients & moods from the prompt
    const promptIngredients = detectIngredients(promptLower);
    const promptMoods = detectMoods(promptLower);

    // 3. Build core picks, biased toward prompt
    let adj = aiPick(aiPools.adjectives);
    let spices = aiPickN(aiPools.spices, 2);
    let sauce = aiPick(aiPools.sauces);
    let timeOverride = null;

    promptMoods.forEach(m => {
        const mood = aiMoodKeywords[m];
        if (mood.adj) adj = mood.adj;
        if (mood.spices) spices = aiPickN(mood.spices.concat(spices), 2);
        if (mood.sauces) sauce = aiPick(mood.sauces);
        if (mood.time) timeOverride = mood.time;
        if (mood.difficulty) tech.difficulty = mood.difficulty;
    });

    const protein = promptIngredients.find(i => ["paneer","tofu","halloumi","cheese","egg","lentil","chickpea","bean"].includes(i)) || aiPick(aiPools.proteins);
    const heroVeg = promptIngredients.find(i => !["paneer","tofu","halloumi","cheese","egg","lentil","chickpea","bean","rice","noodle","pasta"].includes(i)) || aiPick(aiPools.heroVeg);

    const sauceShort = sauce.split(' ').slice(0, 2).join(' ');
    const aromatic = aiPick(aiPools.aromatics);
    const herbs = aiPickN(aiPools.herbs, 2);
    const crunch = aiPick(aiPools.crunch);
    const finisher = aiPick(aiPools.finishers);
    const styleShort = aiPools.styleShorts[tech.style] || tech.style;

    // 4. Build the name — feature the prompt subject prominently
    const cleanSubject = promptText.length > 0 && promptText.length < 40
        ? promptText.replace(/^(a |an |the )/i, '').replace(/[.,!?]/g, '').trim()
        : null;

    const subjectCap = cleanSubject ? cleanSubject.charAt(0).toUpperCase() + cleanSubject.slice(1) : null;

    let name;
    if (keyTech && cleanSubject) {
        // Subject explicitly names a dish format — use it directly
        const filling = promptIngredients[0] || heroVeg;
        const variants = [
            `${adj} ${filling} ${tech.type}`,
            `${tech.type} with ${filling} & ${herbs[0]}`,
            `${adj} ${tech.type}, ${sauceShort}`,
            `Chef's ${subjectCap}, reinvented`
        ];
        name = aiPick(variants);
    } else if (cleanSubject) {
        // Use subject as the focus
        const variants = [
            `${adj} ${subjectCap}`,
            `${subjectCap} with ${heroVeg} & ${herbs[0]}`,
            `${adj} ${subjectCap}, ${sauceShort}`,
            `${subjectCap}, the chef's way`
        ];
        name = aiPick(variants);
    } else {
        const variants = [
            `${adj} ${heroVeg.replace(/^(roasted|charred|smoked|blistered) /i, '')} ${tech.type}`,
            `${adj} ${tech.type} with ${crunch}`,
            `${tech.type} with ${heroVeg}, ${herbs[0]} & ${sauceShort}`
        ];
        name = aiPick(variants);
    }
    name = name.replace(/\s+/g, ' ').trim();

    // 5. Tagline mentioning the user's intent
    let tagline;
    if (cleanSubject) {
        const taglineSubjectTemplates = [
            `Inspired by your craving for ${cleanSubject} — ${heroVeg} and ${sauceShort} bring it home.`,
            `A take on ${cleanSubject} that's ${aiPick(aiPools.textureAdjs)}, herb-forward, and built to satisfy.`,
            `Your ${cleanSubject}, elevated. ${aiPick(aiPools.textureAdjs)}, balanced, and unmistakably good.`,
            `When ${cleanSubject} calls — answer with ${heroVeg}, ${herbs[0]}, and a generous drizzle of ${sauceShort}.`
        ];
        tagline = aiPick(taglineSubjectTemplates);
    } else {
        tagline = aiPick(aiPools.taglineTemplates)
            .replace('{feeling}', aiPick(aiPools.feelings))
            .replace('{hero}', heroVeg)
            .replace('{sauceShort}', sauceShort)
            .replace('{texture}', aiPick(aiPools.textures))
            .replace('{styleShort}', styleShort)
            .replace('{textureAdj}', aiPick(aiPools.textureAdjs))
            .replace('{type}', tech.type.toLowerCase())
            .replace('{finisher}', finisher)
            .replace('{herb}', herbs[0])
            .replace('{spice}', spices[0]);
    }

    // 6. Ingredients — include detected items, then add measurements
    const baseIngredients = [tech.base, protein, heroVeg];
    const extraIngredients = promptIngredients.filter(i => !baseIngredients.includes(i)).slice(0, 2);
    const rawIngredients = [
        ...baseIngredients,
        ...extraIngredients,
        aromatic,
        ...spices, ...herbs, sauce, crunch, finisher,
        "extra-virgin olive oil", "flaky sea salt"
    ].filter((v, i, a) => a.indexOf(v) === i); // dedupe
    const ingredients = rawIngredients.map(addMeasurement);

    // 7. Steps tuned to the technique
    const steps = [
        `Prep your mise en place: chop ${aromatic}, measure spices (${spices.join(', ')}), have herbs ready.`,
        `Bloom ${spices[0]} and ${spices[1]} in olive oil over low heat — 30 seconds, until aromatic.`,
        `Add ${aromatic} and cook gently until softened and translucent — don't brown.`,
        `Build the dish: ${tech.method}, working with ${tech.base} as your foundation.`,
        `${tech.isHandheld ? `Layer ${heroVeg} and ${protein} carefully — balance flavor and structure.` : `Fold in ${heroVeg} and ${protein}, allowing them to absorb the flavors fully.`}`,
        `Taste. Adjust salt and acidity. Trust your palate over any recipe.`,
        `Plate generously. Drizzle ${sauce} in a confident spiral. Crown with ${crunch}.`,
        `Finish with ${herbs[0]}, ${finisher}, and a final crack of black pepper. Serve immediately.`
    ];

    const tip = aiPick(aiPools.tipTemplates)
        .replace('{ingredient}', aiPick([heroVeg, sauce, spices[0], protein]))
        .replace('{step}', aiPick(['searing', 'reduction', 'caramelization', 'infusion', 'rest']))
        .replace('{liquid}', aiPick(['stock', 'sauce', 'glaze', 'broth']))
        .replace('{fat}', aiPick(['olive oil', 'butter', 'ghee']));

    const baseTime = timeOverride || tech.time;

    return {
        name,
        tagline,
        cuisine: styleShort,
        time: Math.max(10, baseTime + Math.floor((Math.random() - 0.5) * 10)),
        serves: 2 + Math.floor(Math.random() * 5),
        difficulty: tech.difficulty,
        emoji: tech.emoji,
        ingredients,
        steps,
        tips: tip
    };
}