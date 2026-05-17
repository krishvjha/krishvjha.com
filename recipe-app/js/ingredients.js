// ingredients.js
// Controlled ingredient catalog for Recipe AI MVP.
// Rule: recipe data should only use the `value` field from this file.

function i(value, label, category, aliases = [], dietaryTags = ["vegetarian"]) {
  return { value, label, category, aliases, dietaryTags };
}

export const ingredients = [
  // Vegetables / aromatics
  i("vegetables", "Mixed Vegetables", "vegetable", ["mixed vegetables", "vegetable mix", "frozen vegetables", "assorted vegetables"]),
  i("tomato", "Tomato", "vegetable", ["tomatoes", "tamatar", "crushed tomato", "crushed tomatoes", "tomato puree", "tomato sauce"]),
  i("onion", "Onion", "vegetable", ["onions", "red onion", "white onion", "yellow onion", "pyaaz", "pyaz"]),
  i("potato", "Potato / Aloo", "vegetable", ["potatoes", "aloo", "alu"]),
  i("cauliflower", "Cauliflower / Gobi", "vegetable", ["gobi", "phool gobi", "cauliflower florets"]),
  i("spinach", "Spinach / Palak", "vegetable", ["palak", "baby spinach", "frozen spinach"]),
  i("carrot", "Carrot", "vegetable", ["carrots", "gajar"]),
  i("peas", "Peas", "vegetable", ["green peas", "frozen peas", "matar"]),
  i("mushroom", "Mushroom", "vegetable", ["mushrooms", "button mushrooms", "shiitake", "portobello"]),
  i("broccoli", "Broccoli", "vegetable", ["broccoli florets"]),
  i("bell pepper", "Bell Pepper / Capsicum", "vegetable", ["bell peppers", "capsicum", "green pepper", "red pepper", "yellow pepper", "shimla mirch"]),
  i("snap peas", "Snap Peas", "vegetable", ["sugar snap peas", "snow peas"]),
  i("celery", "Celery", "vegetable", ["celery stalk", "celery stalks"]),
  i("zucchini", "Zucchini", "vegetable", ["courgette"]),
  i("eggplant", "Eggplant / Aubergine", "vegetable", ["aubergine", "brinjal", "baingan", "patlıcan", "patlican"]),
  i("cucumber", "Cucumber", "vegetable", ["kheera"]),
  i("lettuce", "Lettuce", "vegetable", ["romaine", "romaine lettuce"]),
  i("radish", "Radish", "vegetable", ["radishes", "mooli"]),
  i("cabbage", "Cabbage", "vegetable", ["patta gobi", "shredded cabbage"]),
  i("corn", "Corn", "vegetable", ["sweet corn", "corn kernels"]),
  i("avocado", "Avocado", "fruit", ["avocados"]),
  i("garlic", "Garlic", "aromatic", ["garlic cloves", "lehsun", "lasun"]),
  i("ginger", "Ginger", "aromatic", ["adrak", "fresh ginger"]),
  i("green chili", "Green Chili", "aromatic", ["green chilli", "hari mirch", "chili pepper"]),
  i("green onion", "Green Onion / Spring Onion", "aromatic", ["spring onion", "scallion", "scallions", "green onions"]),
  i("curry leaves", "Curry Leaves", "herb", ["kadi patta", "kari patta"]),

  // Vegetarian proteins / legumes
  i("paneer", "Paneer", "protein", ["cottage cheese", "indian cottage cheese"], ["vegetarian", "dairy"]),
  i("lentils", "Lentils / Dal", "protein", ["lentil", "dal", "toor dal", "moong dal", "masoor dal", "yellow dal", "red lentils", "mercimek"]),
  i("chickpea", "Chickpea / Chole", "protein", ["chickpeas", "chole", "garbanzo beans", "kabuli chana", "chana"]),
  i("beans", "Beans / Rajma", "protein", ["mixed beans", "kidney beans", "rajma", "cannellini beans", "white beans", "cooked beans"]),
  i("black beans", "Black Beans", "protein", ["black bean", "cooked black beans"]),
  i("tofu", "Tofu", "protein", ["firm tofu", "soft tofu"]),
  i("egg", "Egg", "protein", ["eggs", "anda"], ["egg"]),

  // Meat / fish / seafood
  i("chicken", "Chicken", "meat", ["boneless chicken", "chicken breast", "chicken thigh", "chicken pieces"], ["meat", "poultry"]),
  i("lamb", "Lamb / Mutton", "meat", ["mutton", "goat", "lamb pieces", "ground lamb", "minced lamb"], ["meat", "redMeat"]),
  i("beef", "Beef", "meat", ["ground beef", "beef mince", "beef pieces", "steak"], ["meat", "beef", "redMeat"]),
  i("pork", "Pork", "meat", ["bacon", "ham", "pancetta", "pork belly", "ground pork"], ["meat", "pork"]),
  i("fish", "Fish", "seafood", ["white fish", "salmon", "cod", "fish fillet"], ["fish", "seafood"]),
  i("shrimp", "Shrimp / Prawn", "seafood", ["prawns", "prawn", "shrimp"], ["seafood"]),

  // Grains / carbs
  i("rice", "Rice", "grain", ["basmati rice", "cooked rice", "leftover rice", "short grain rice", "arborio rice"]),
  i("pasta", "Pasta", "grain", ["penne", "spaghetti", "macaroni", "fusilli", "small pasta"]),
  i("noodles", "Noodles", "grain", ["noodle", "egg noodles", "wheat noodles", "ramen noodles"]),
  i("rice noodles", "Rice Noodles", "grain", ["vermicelli noodles", "flat rice noodles"]),
  i("flour", "Flour", "grain", ["all purpose flour", "maida", "plain flour", "wheat flour"]),
  i("bread", "Bread / Pita", "grain", ["pita", "pita bread", "flatbread", "toast", "sourdough"]),
  i("bulgur", "Bulgur", "grain", ["bulgur wheat", "burghul"]),
  i("semolina", "Semolina / Sooji", "grain", ["sooji", "suji", "rava"]),
  i("flattened rice", "Flattened Rice / Poha", "grain", ["poha", "aval", "beaten rice"]),
  i("oats", "Oats", "grain", ["rolled oats", "quick oats"]),
  i("tortilla", "Tortilla", "grain", ["wrap", "wheat wrap", "flour tortilla"]),

  // Dairy / fats
  i("cream", "Cream", "dairy", ["heavy cream", "fresh cream", "cooking cream"], ["vegetarian", "dairy"]),
  i("mozzarella", "Mozzarella", "dairy", ["fresh mozzarella", "pizza cheese"], ["vegetarian", "dairy"]),
  i("parmesan", "Parmesan", "dairy", ["parmigiano", "grated parmesan"], ["vegetarian", "dairy"]),
  i("cheddar", "Cheddar", "dairy", ["cheddar cheese", "shredded cheese"], ["vegetarian", "dairy"]),
  i("butter", "Butter", "dairy", ["unsalted butter", "salted butter"], ["vegetarian", "dairy"]),
  i("ghee", "Ghee", "fat", ["clarified butter"], ["vegetarian", "dairy"]),
  i("feta", "Feta", "dairy", ["feta cheese"], ["vegetarian", "dairy"]),
  i("yogurt", "Yogurt", "dairy", ["curd", "dahi", "plain yogurt", "yoğurt", "yoghurt"], ["vegetarian", "dairy"]),
  i("labneh", "Labneh", "dairy", ["strained yogurt"], ["vegetarian", "dairy"]),
  i("milk", "Milk", "dairy", ["whole milk", "low fat milk"], ["vegetarian", "dairy"]),
  i("coconut milk", "Coconut Milk", "pantry", ["coconut cream"]),

  // Herbs / garnish / fruit / nuts
  i("cilantro", "Cilantro / Coriander Leaves", "herb", ["coriander leaves", "fresh coriander", "dhaniya", "dhania leaves"]),
  i("parsley", "Parsley", "herb", ["fresh parsley"]),
  i("basil", "Basil", "herb", ["fresh basil"]),
  i("mint", "Mint", "herb", ["fresh mint", "pudina"]),
  i("lemon", "Lemon", "fruit", ["lime", "nimbu"]),
  i("cashew", "Cashew", "nut", ["cashews", "kaju"], ["vegetarian", "nut"]),
  i("peanut", "Peanut", "nut", ["peanuts", "groundnut", "moongfali"], ["vegetarian", "nut"]),
  i("sesame seeds", "Sesame Seeds", "seed", ["sesame", "til"], ["vegetarian", "seed"]),
  i("seaweed", "Seaweed", "seaweed", ["wakame", "nori"]),
  i("olive", "Olive", "condiment", ["olives", "black olives", "green olives"]),

  // Spices
  i("cumin", "Cumin / Jeera", "spice", ["jeera", "cumin seeds", "ground cumin"]),
  i("turmeric", "Turmeric / Haldi", "spice", ["haldi", "turmeric powder"]),
  i("garam masala", "Garam Masala", "spice", ["garam masala powder"]),
  i("coriander powder", "Coriander Powder / Dhania", "spice", ["dhania", "dhania powder", "ground coriander", "coriander"]),
  i("chili powder", "Chili Powder", "spice", ["chilli powder", "red chili powder", "red chilli powder", "lal mirch"]),
  i("chili flakes", "Chili Flakes", "spice", ["chilli flakes", "red pepper flakes"]),
  i("black pepper", "Black Pepper", "spice", ["pepper", "ground pepper", "kali mirch"]),
  i("oregano", "Oregano", "spice", ["dried oregano"]),
  i("bay leaf", "Bay Leaf", "spice", ["bay leaves", "tej patta", "tejpatta"]),
  i("thyme", "Thyme", "spice", ["dried thyme", "fresh thyme"]),
  i("paprika", "Paprika", "spice", ["sweet paprika", "smoked paprika"]),
  i("sumac", "Sumac", "spice", ["sumak"]),
  i("zaatar", "Zaatar", "spice", ["za'atar", "zaatar spice"]),
  i("mustard seeds", "Mustard Seeds", "spice", ["rai", "sarson", "black mustard seeds"]),
  i("asafoetida", "Asafoetida / Hing", "spice", ["hing"]),
  i("cinnamon", "Cinnamon", "spice", ["dalchini"]),
  i("cardamom", "Cardamom", "spice", ["elaichi"]),
  i("cloves", "Cloves", "spice", ["laung"]),
  i("saffron", "Saffron", "spice", ["kesar"]),

  // Sauces / condiments
  i("soy sauce", "Soy Sauce", "sauce", ["soy", "light soy sauce", "dark soy sauce"]),
  i("miso paste", "Miso Paste", "sauce", ["miso", "white miso", "red miso"]),
  i("tahini", "Tahini", "sauce", ["sesame paste"], ["vegetarian", "seed"]),
  i("vinegar", "Vinegar", "sauce", ["rice vinegar", "white vinegar"]),
  i("hot sauce", "Hot Sauce", "sauce", ["chili sauce", "sriracha"]),
  i("peanut butter", "Peanut Butter", "sauce", ["smooth peanut butter"], ["vegetarian", "nut"]),
  i("pesto", "Pesto", "sauce", ["basil pesto"], ["vegetarian", "nut"]),

  // Pantry staples
  i("salt", "Salt", "pantry", ["table salt", "sea salt", "rock salt", "namak"]),
  i("water", "Water", "pantry", ["plain water"]),
  i("oil", "Cooking Oil", "pantry", ["neutral oil", "vegetable oil", "sunflower oil", "canola oil"]),
  i("olive oil", "Olive Oil", "pantry", ["extra virgin olive oil", "extra-virgin olive oil", "evoo"]),
  i("sugar", "Sugar", "pantry", ["white sugar", "brown sugar"])
];