import { useState, useMemo, useEffect } from "react";

const RECIPES = [
  { id:1, name:"Shorshe Ilish", bengali:"সর্ষে ইলিশ", description:"The crown jewel of Bengali cuisine — hilsa fish steamed in a pungent golden mustard paste with slit green chilies and fragrant mustard oil.", region:"Bangladesh", area:"Dhaka", type:"Fish & Seafood", time:"30 min", difficulty:"Medium", rating:4.9, reviews:1247, calories:320, serves:4, trending:true, image:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80", tags:["Hilsa","Mustard","Traditional","Festival"], ingredients:["500g Hilsa (Ilish) fish, cut into pieces","4 tbsp mustard paste (yellow + black mustard)","3 tbsp mustard oil","6 green chilies, slit","1 tsp turmeric powder","1 tsp red chili powder","Salt to taste","½ cup water","1 tsp nigella seeds (kalonji)"], steps:["Wash and marinate hilsa pieces with turmeric, salt, and 1 tsp mustard oil for 15 minutes.","Grind yellow and black mustard seeds with water and a pinch of salt until smooth. Add a green chili.","Heat mustard oil in a flat pan until it smokes lightly, then reduce to medium.","Add nigella seeds and let them splutter. Add mustard paste, stir gently for 2 minutes.","Add red chili powder and remaining green chilies. Mix well.","Carefully place marinated fish pieces. Do not stir — shake the pan gently.","Add water, cover, and cook on medium-low for 8–10 minutes.","Finish with a generous drizzle of raw mustard oil. Serve with steamed white rice."] },
  { id:2, name:"Kosha Mangsho", bengali:"কষা মাংস", description:"Rich, deeply caramelized mutton curry slow-cooked with whole spices and a thick dark gravy — the pride of every Bengali celebration.", region:"West Bengal", area:"Kolkata", type:"Meat & Poultry", time:"2 hrs", difficulty:"Hard", rating:4.8, reviews:892, calories:480, serves:4, trending:true, image:"https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=600&q=80", tags:["Mutton","Slow-cooked","Festive","Kolkata"], ingredients:["1 kg mutton with bone","3 large onions, thinly sliced","½ cup yogurt","4 tbsp mustard oil","2 tbsp ghee","2 bay leaves, 4 cardamoms, 4 cloves, 2 cinnamon sticks","1 tbsp ginger-garlic paste","2 tsp cumin powder","2 tsp coriander powder","1.5 tsp turmeric","2 tsp red chili powder","Salt and sugar to taste"], steps:["Marinate mutton with yogurt, half the ginger-garlic paste, turmeric, and salt. Rest 1 hour minimum.","Heat mustard oil until smoking. Reduce heat, add whole spices (bay leaf, cardamom, cloves, cinnamon).","Add sliced onions and fry 20–25 minutes on medium-low until deep golden. Add salt and a pinch of sugar.","Add remaining ginger-garlic paste and fry 3 minutes.","Add marinated mutton and sear on high heat, stirring continuously for 8–10 minutes.","Add all dry spice powders. Keep frying on high heat — this is the 'kosha' process.","Reduce to low heat, cover and cook 60–75 minutes, stirring occasionally.","Finish with ghee. Cook uncovered 5 minutes until oil separates. Serve with luchi or rice."] },
  { id:3, name:"Chingri Malaikari", bengali:"চিংড়ি মালাইকারি", description:"Royal tiger prawns bathed in a velvety coconut milk curry — a dish that defines the elegance of Bengali coastal cooking.", region:"Bangladesh", area:"Chittagong", type:"Fish & Seafood", time:"40 min", difficulty:"Medium", rating:4.7, reviews:634, calories:380, serves:4, trending:true, image:"https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80", tags:["Prawn","Coconut","Creamy","Coastal"], ingredients:["500g tiger prawns, cleaned","1 cup thick coconut milk","½ cup thin coconut milk","2 onions, finely grated","1 tsp ginger paste","1 tsp garlic paste","3 green cardamoms","1 tsp turmeric","1 tsp cumin powder","3 tbsp mustard oil","4 green chilies","Salt and sugar to taste"], steps:["Marinate prawns with salt and ½ tsp turmeric for 10 minutes.","Lightly fry prawns in mustard oil for 2 minutes each side. Remove and set aside.","In the same oil add cardamoms, then grated onion; fry until golden.","Add ginger-garlic paste, cook 2 minutes.","Add cumin powder and remaining turmeric, stir 1 minute.","Pour in thin coconut milk, add green chilies and a pinch of sugar. Simmer 5 minutes.","Add fried prawns. Pour thick coconut milk over everything.","Simmer gently 5–6 minutes without boiling. Season and serve with steamed rice."] },
  { id:4, name:"Aloo Posto", bengali:"আলু পোস্ত", description:"Potatoes tossed in a creamy poppy seed paste with mustard oil and green chilies — simple, soul-satisfying Bengali comfort food.", region:"West Bengal", area:"West Bengal", type:"Vegetarian", time:"25 min", difficulty:"Easy", rating:4.6, reviews:1108, calories:210, serves:4, trending:true, image:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80", tags:["Poppy Seeds","Potato","Comfort Food","Vegan"], ingredients:["500g potatoes, cubed","4 tbsp poppy seeds (posto)","2–3 green chilies","3 tbsp mustard oil","½ tsp nigella seeds","½ tsp turmeric","Salt to taste"], steps:["Soak poppy seeds in 3 tbsp warm water for 30 minutes. Grind with chilies and salt into a smooth paste.","Parboil potato cubes with salt and turmeric for 5 minutes. Drain.","Heat mustard oil in a pan. Add nigella seeds and let them splutter.","Add potato cubes and sauté on medium heat 5–6 minutes until lightly golden.","Add the poppy seed paste and stir gently to coat all potatoes.","Cook on low heat 5 minutes, adding 2–3 tbsp water to prevent sticking.","Season with salt. Drizzle raw mustard oil before serving.","Serve hot with steamed rice and dal."] },
  { id:5, name:"Mishti Doi", bengali:"মিষ্টি দই", description:"Silky-smooth sweetened curd set in earthen pots — a beloved Bengali dessert with caramel-kissed sweetness from Rajshahi.", region:"Bangladesh", area:"Rajshahi", type:"Sweets & Desserts", time:"8 hrs", difficulty:"Medium", rating:4.9, reviews:783, calories:180, serves:6, trending:true, image:"https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80", tags:["Yogurt","Sweet","Traditional","Rajshahi"], ingredients:["1 liter full-fat milk","150g nolen gur (date palm jaggery)","3 tbsp granulated sugar","2 tbsp plain yogurt (starter)","A pinch of cardamom powder"], steps:["Bring milk to a boil. Reduce heat and simmer, stirring frequently, until milk reduces to ¾ volume.","Add granulated sugar and stir until dissolved. Simmer 5 more minutes.","Add nolen gur and stir until fully melted. Milk will turn a beautiful caramel color.","Remove from heat and cool until lukewarm (43°C/110°F).","Add the yogurt starter and cardamom powder. Stir gently — don't overstir.","Pour into earthen pots or small bowls.","Cover and keep in a warm place 6–8 hours until set.","Refrigerate 2 hours before serving."] },
  { id:6, name:"Rasgolla", bengali:"রসগোল্লা", description:"Pillowy soft chhena balls soaked in a light rose-scented sugar syrup — the iconic sweet with a GI tag and national pride.", region:"West Bengal", area:"Kolkata", type:"Sweets & Desserts", time:"1.5 hrs", difficulty:"Medium", rating:4.8, reviews:2143, calories:150, serves:8, trending:true, image:"https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&q=80", tags:["Chhena","Syrup","GI Tag","Kolkata"], ingredients:["1 liter full-fat milk","3 tbsp lemon juice or vinegar","1 tsp all-purpose flour","2 cups sugar","4 cups water","2–3 drops rose water","A pinch of cardamom powder"], steps:["Boil milk. Add lemon juice gradually while stirring until milk curdles completely.","Drain through muslin cloth. Rinse the chhena under cold water.","Hang the muslin for 30 minutes to drain excess water.","Knead chhena with flour for 8–10 minutes until smooth and crack-free.","Divide into equal portions and roll into smooth balls — about 20 pieces.","Make sugar syrup by dissolving sugar in water. Bring to a rolling boil.","Drop chhena balls into boiling syrup. Cover and cook on high heat for 12–15 minutes.","Add rose water and cardamom. Cool in syrup. Refrigerate 2 hours before serving."] },
  { id:7, name:"Kachchi Biryani", bengali:"কাচ্চি বিরিয়ানি", description:"Dhaka's legendary dum biryani — raw marinated mutton layered with fragrant basmati rice and sealed with dough, slow-cooked until the meat falls off the bone.", region:"Bangladesh", area:"Dhaka", type:"Rice & Bread", time:"4 hrs", difficulty:"Hard", rating:4.9, reviews:1876, calories:620, serves:6, trending:true, image:"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80", tags:["Biryani","Dhaka","Dum","Festive"], ingredients:["1 kg mutton pieces with bone","500g basmati rice, soaked 30 min","1 cup full-fat yogurt","½ cup fried onions (beresta)","4 tbsp ghee","2 tbsp raw papaya paste (tenderizer)","1 tbsp ginger-garlic paste","1 tsp kewra water","Whole spices: cinnamon, cardamom, cloves, bay leaf","Saffron soaked in ¼ cup warm milk","Salt and sugar to taste"], steps:["Marinate raw mutton with yogurt, papaya paste, ginger-garlic paste, spices, fried onions, and salt for at least 4 hours.","Parboil soaked rice in salted water with whole spices until 70% cooked. Drain thoroughly.","Spread raw marinated mutton at the bottom of a heavy pot.","Layer half the parcooked rice over the mutton.","Drizzle saffron milk, kewra water, and 2 tbsp ghee over the first rice layer.","Add remaining rice. Top with more ghee, fried onions, and saffron milk.","Seal pot tightly with dough or foil to trap all steam.","Cook high heat 10 min, then lowest flame for 45–50 min on dum. Rest 15 min before serving."] },
  { id:8, name:"Luchi with Alur Dom", bengali:"লুচি আলুর দম", description:"Puffed gossamer-thin deep-fried flour pooris paired with rich potato curry — the quintessential Bengali Sunday breakfast.", region:"West Bengal", area:"Kolkata", type:"Rice & Bread", time:"45 min", difficulty:"Medium", rating:4.7, reviews:945, calories:390, serves:4, trending:false, image:"https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&q=80", tags:["Bread","Potato","Breakfast","Kolkata"], ingredients:["2 cups all-purpose flour (maida)","1 tsp salt, 1 tsp sugar","2 tbsp oil + oil for deep frying","500g potatoes, boiled and cubed","2 tomatoes, chopped","2 tsp cumin, 1 tsp turmeric","Whole spices: cinnamon, cardamom, cloves"], steps:["Mix flour, salt, sugar, and oil. Add water and knead into a soft smooth dough. Rest 20 minutes.","For alur dom: heat oil, add whole spices. Add tomatoes, cook down to a thick masala.","Add boiled potatoes, turmeric, cumin, salt. Add water for thick gravy. Simmer 10 minutes.","Divide luchi dough into 16 balls. Roll each into a thin 4-inch circle.","Heat oil to 180°C. Slide one luchi into oil — it should puff immediately.","Press gently with a slotted spoon to help it puff fully. Fry 30 seconds per side.","Drain on paper towels. Serve immediately — luchi deflates when it cools.","Plate luchis alongside hot alur dom. Garnish with fresh coriander."] },
  { id:9, name:"Mochar Ghonto", bengali:"মোচার ঘন্ট", description:"Banana blossom cooked with coconut, potatoes and Bengali spices — a forgotten gem of traditional vegetarian Bengali cooking.", region:"West Bengal", area:"West Bengal", type:"Vegetarian", time:"1 hr", difficulty:"Medium", rating:4.4, reviews:412, calories:195, serves:4, trending:false, image:"https://images.unsplash.com/photo-1617692855027-33b14f061079?w=600&q=80", tags:["Banana Blossom","Vegan","Traditional","Vegetarian"], ingredients:["1 banana blossom (mocha), cleaned and chopped","1 medium potato, cubed","½ cup freshly grated coconut","2 tbsp mustard oil","1 tsp panch phoron","1 tsp turmeric","1 tsp cumin powder","2 green chilies","Salt and sugar to taste","Garam masala to finish"], steps:["Clean banana blossom, removing outer petals and stamens. Chop and immerse in salted lemon water.","Squeeze excess water. Parboil with turmeric and salt until just tender, about 10 minutes.","Heat mustard oil in a wok. Add panch phoron and let it splutter.","Add potato cubes and fry until lightly golden. Add green chilies.","Add drained banana blossom and stir-fry on medium-high for 5 minutes.","Add cumin powder, remaining turmeric, salt, and a pinch of sugar.","Add grated coconut and stir continuously 3–4 minutes until fragrant and dry.","Finish with a pinch of garam masala. Serve with steamed rice."] },
  { id:10, name:"Doi Maach", bengali:"দই মাছ", description:"Fish fillets simmered in a tangy silky yogurt-based gravy — a delicate preparation that showcases subtle Bengali sophistication.", region:"West Bengal", area:"West Bengal", type:"Fish & Seafood", time:"35 min", difficulty:"Easy", rating:4.5, reviews:567, calories:290, serves:4, trending:false, image:"https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=600&q=80", tags:["Fish","Yogurt","Mild","Traditional"], ingredients:["500g rohu or katla fish","1 cup plain yogurt, whisked","2 onions, finely chopped","1 tsp ginger paste","1 tsp turmeric","1 tsp cumin powder","3 tbsp mustard oil","Whole spices: cinnamon, cardamom, cloves","Salt and sugar to taste"], steps:["Marinate fish with salt and ½ tsp turmeric. Lightly fry in mustard oil until golden. Set aside.","In the same oil, add whole spices and fry 30 seconds.","Add onions, fry until golden. Add ginger paste, cook 2 minutes.","Reduce heat to very low. Add whisked yogurt gradually, stirring constantly to prevent curdling.","Add cumin powder, remaining turmeric, salt, and a tiny pinch of sugar.","Simmer yogurt gravy 3–4 minutes, stirring gently.","Add fried fish pieces. Cook covered on low heat 8–10 minutes.","Serve with fragrant steamed rice."] },
  { id:11, name:"Cholar Dal", bengali:"ছোলার ডাল", description:"Fragrant Bengal gram lentils tempered with coconut and ginger — a festive dal served at pujas and celebrations, sweet and mildly spiced.", region:"West Bengal", area:"West Bengal", type:"Dal & Soups", time:"40 min", difficulty:"Easy", rating:4.5, reviews:678, calories:250, serves:4, trending:false, image:"https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80", tags:["Dal","Lentils","Festive","Vegetarian"], ingredients:["1 cup chola dal (Bengal gram)","¼ cup coconut, sliced thin","2 tbsp raisins","1 tbsp ghee","1 bay leaf, 2 dried red chilies","1 tsp ginger, grated","½ tsp turmeric","1 tsp cumin seeds","Salt and sugar to taste","Garam masala to finish"], steps:["Soak chola dal 2 hours. Boil with turmeric, salt, and water until just cooked but not mushy.","In a separate pan, heat ghee. Fry coconut slices until golden. Remove and set aside.","In the same ghee, add bay leaf, dried red chilies, and cumin seeds. Let them splutter.","Add grated ginger and fry 1 minute.","Add cooked dal and mix gently. Add a pinch of sugar.","Add raisins and the fried coconut pieces.","Simmer 5 minutes. Dal should be thick but not dry.","Finish with garam masala and a drizzle of ghee. Serve with luchi or rice."] },
  { id:12, name:"Sandesh", bengali:"সন্দেশ", description:"Kolkata's most beloved sweet — freshly made chhena kneaded with sugar and flavored with cardamom or nolen gur, molded into exquisite shapes.", region:"West Bengal", area:"Kolkata", type:"Sweets & Desserts", time:"1 hr", difficulty:"Medium", rating:4.7, reviews:1203, calories:120, serves:12, trending:false, image:"https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80", tags:["Chhena","Sweets","Kolkata","Mithai"], ingredients:["1 liter full-fat milk","3 tbsp lemon juice","½ cup powdered sugar or nolen gur","¼ tsp cardamom powder","A few strands of saffron (optional)","Rose water","Pistachio slivers for garnish"], steps:["Boil milk, add lemon juice to curdle. Drain through muslin, rinse well, hang 30 minutes.","Knead chhena until smooth and creamy — 5–8 minutes of patient kneading.","Cook chhena in a heavy non-stick pan on low heat for 3–4 minutes, stirring constantly.","Add sugar or nolen gur gradually while stirring. Cook until mixture leaves the pan's sides.","Add cardamom powder, a drop of rose water. Remove from heat — do not overcook.","Let cool slightly, then knead again until smooth and pliable.","Mold into round, oval, or traditional shapes using sandesh molds.","Garnish with pistachio slivers. Refrigerate 1 hour before serving."] },
  { id:13, name:"Begun Bhaja", bengali:"বেগুন ভাজা", description:"Thick slices of eggplant marinated in turmeric and spices then shallow-fried to golden perfection — a crispy side dish that elevates any Bengali meal.", region:"West Bengal", area:"West Bengal", type:"Vegetarian", time:"20 min", difficulty:"Easy", rating:4.4, reviews:521, calories:140, serves:4, trending:false, image:"https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=600&q=80", tags:["Eggplant","Fried","Simple","Side Dish"], ingredients:["1 large eggplant (brinjal)","1 tsp turmeric","1 tsp red chili powder","1 tsp cumin powder","1 tsp salt","Mustard oil for frying"], steps:["Cut eggplant into 1cm thick rounds. Sprinkle salt, rest 10 minutes. Pat dry.","Mix turmeric, chili powder, and cumin. Rub on both sides of each slice.","Heat mustard oil in a flat pan over medium heat.","Place eggplant slices in a single layer. Do not crowd the pan.","Fry 3–4 minutes without moving until deep golden and crispy.","Flip carefully and fry the other side 2–3 minutes.","Edges should be crispy while the center is soft.","Drain briefly and serve immediately alongside dal and rice."] },
  { id:14, name:"Patishapta", bengali:"পাটিসাপ্টা", description:"Paper-thin rice flour crepes rolled around a heavenly filling of sweetened coconut and khoya — a beloved winter delicacy for Poush Sankranti.", region:"West Bengal", area:"West Bengal", type:"Sweets & Desserts", time:"1 hr", difficulty:"Medium", rating:4.6, reviews:432, calories:220, serves:8, trending:false, image:"https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80", tags:["Crepe","Coconut","Festival","Winter"], ingredients:["1 cup rice flour","½ cup all-purpose flour","½ cup semolina","2 cups milk","Sugar to taste","1 cup grated coconut (filling)","½ cup khoya/mawa (filling)","Nolen gur or sugar for filling","Cardamom powder","Ghee for cooking"], steps:["Make batter: mix rice flour, all-purpose flour, semolina, milk, and sugar into a thin smooth batter. Rest 30 minutes.","Make filling: cook grated coconut with nolen gur and khoya, stirring until it comes together. Add cardamom. Cool.","Heat a flat non-stick pan. Brush with ghee.","Pour a ladle of batter and spread quickly into a very thin circle.","Cook on low-medium heat until surface looks dry and edges lift — about 1 minute.","Place 1–2 tbsp of coconut filling along the center.","Gently roll the crepe over the filling. Press lightly to seal.","Slide onto a plate. Drizzle with extra nolen gur if desired. Serve warm."] },
  { id:15, name:"Aam Dal", bengali:"আম ডাল", description:"Masoor lentils cooked with raw green mango for a lip-smacking sour and savory dal that defines the Bengali summer table.", region:"Bangladesh", area:"Sylhet", type:"Dal & Soups", time:"30 min", difficulty:"Easy", rating:4.5, reviews:387, calories:195, serves:4, trending:false, image:"https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80", tags:["Mango","Dal","Summer","Sour"], ingredients:["1 cup masoor dal (red lentils)","1 raw green mango, cubed","½ tsp panch phoron","2 dried red chilies","2 tbsp mustard oil","½ tsp turmeric","1 tsp sugar","Salt to taste","Fresh coriander to garnish"], steps:["Boil masoor dal with turmeric in 3 cups water until completely soft. Mash slightly.","Add raw mango cubes to the cooked dal. Simmer 5 minutes until mango softens.","Season with salt and sugar — the balance of sour, sweet, and salty is key.","In a small pan, heat mustard oil until smoking.","Add panch phoron and dried red chilies. Stand back — the spices will splutter!","Pour the hot tempering over the dal immediately. Cover for 1 minute.","Stir gently and taste for seasoning. Dal should be thick but pourable.","Garnish with fresh coriander. Serve with steamed rice and raw mustard oil."] },
  { id:16, name:"Bhuna Khichuri", bengali:"ভুনা খিচুড়ি", description:"Smoky roasted moong dal and gobindobhog rice slow-cooked into a fragrant comforting porridge — the definitive rainy day comfort food of Bangladesh.", region:"Bangladesh", area:"Dhaka", type:"Rice & Bread", time:"45 min", difficulty:"Easy", rating:4.6, reviews:841, calories:340, serves:4, trending:false, image:"https://images.unsplash.com/photo-1536304993881-ff86e01f3c7f?w=600&q=80", tags:["Khichuri","Comfort Food","Rainy Day","Rice"], ingredients:["1 cup gobindobhog or basmati rice","½ cup moong dal","3 tbsp ghee","1 bay leaf, 2 cardamoms, 1 cinnamon","1 tsp cumin seeds","1 onion, sliced","1 tsp ginger paste","½ tsp turmeric","½ tsp cumin powder","Salt and sugar to taste","Fried onions and ghee to finish"], steps:["Dry roast moong dal without oil until lightly golden and fragrant. This 'bhuna' step is the secret.","Wash roasted dal and rice together. Soak 15 minutes. Drain.","Heat ghee in a heavy pot. Add bay leaf, cardamom, and cinnamon.","Add sliced onion and fry until translucent. Add ginger paste.","Add drained rice and dal. Stir-fry 2 minutes.","Add turmeric, cumin powder, salt, and 4 cups hot water.","Bring to a boil, then cover and cook on very low heat 20–25 minutes, stirring occasionally.","Top with fried onions and a knob of ghee. Serve hot with begun bhaja and boiled eggs."] },
  { id:17, name:"Macher Kalia", bengali:"মাছের কালিয়া", description:"A regal preparation of rohu fish in a deeply spiced rich onion-tomato gravy — the festive fish curry served at Bengali weddings.", region:"West Bengal", area:"Kolkata", type:"Fish & Seafood", time:"50 min", difficulty:"Medium", rating:4.7, reviews:702, calories:360, serves:4, trending:false, image:"https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80", tags:["Fish","Rich Gravy","Wedding","Festive"], ingredients:["500g rohu fish, 4–5 large pieces","2 onions, finely sliced","2 tomatoes, chopped","1 tbsp ginger-garlic paste","2 tsp cumin-coriander powder","1.5 tsp turmeric","1 tsp garam masala","3 tbsp mustard oil","4 green chilies","Salt and sugar to taste","Coriander leaves for garnish"], steps:["Marinate fish with salt and ½ tsp turmeric. Fry in hot mustard oil until golden on both sides. Reserve.","In the same oil, fry sliced onions until deep brown and caramelized.","Add ginger-garlic paste, cook 2 minutes.","Add tomatoes and cook down until a thick paste.","Add cumin-coriander powder, remaining turmeric, red chili powder, and salt. Fry until oil separates.","Add 1.5 cups warm water. Bring to a simmer.","Slide in fried fish pieces. Add green chilies. Cook covered 10 minutes.","Finish with garam masala and coriander. Serve with steamed rice."] },
  { id:18, name:"Panta Bhat", bengali:"পান্তা ভাত", description:"Overnight fermented rice soaked in water, served with mustard oil, raw onion, and green chilies — humble, tangy, and deeply cultural.", region:"Bangladesh", area:"Sylhet", type:"Snacks & Street Food", time:"Overnight", difficulty:"Easy", rating:4.3, reviews:290, calories:160, serves:2, trending:false, image:"https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80", tags:["Fermented","Traditional","Pahela Boishakh","Cultural"], ingredients:["2 cups leftover cooked rice","Water to submerge rice","Mustard oil to drizzle","Salt to taste","Raw onion, sliced","2–3 green chilies","Dry roasted hilsa or achar (pickle)","Dried chili flakes (optional)"], steps:["Place leftover cooked rice in a bowl or clay pot. Add enough water to submerge fully.","Cover and leave at room temperature overnight (8–12 hours).","The rice will ferment slightly — the water will be cloudy with a pleasantly sour aroma.","Drain some water if desired, or keep the rice soupy.","Season with salt and a generous drizzle of raw mustard oil.","Serve with sliced raw onion, whole green chilies, and accompaniments.","Traditional pairings: dry-fried hilsa, achar (pickle), or a piece of jaggery.","Celebrated on Pahela Boishakh (Bengali New Year) as a beloved cultural tradition."] }
];

const REGIONS = ["All","West Bengal","Bangladesh","Kolkata","Dhaka","Sylhet","Chittagong","Rajshahi"];
const TYPES = ["All","Fish & Seafood","Meat & Poultry","Vegetarian","Sweets & Desserts","Rice & Bread","Dal & Soups","Snacks & Street Food"];

function StarRating({ value, userRating, onRate }) {
  const [hov, setHov] = useState(0);
  const display = hov || userRating || value;
  return (
    <div style={{ display:"flex", gap:2 }}>
      {[1,2,3,4,5].map(s => (
        <span key={s} onClick={e=>{e.stopPropagation();onRate(s);}} onMouseEnter={()=>setHov(s)} onMouseLeave={()=>setHov(0)}
          style={{ cursor:"pointer", fontSize:15, color: s<=display ? "#F59E0B":"#D1D5DB", transition:"transform 0.12s", display:"inline-block", transform: s<=hov?"scale(1.25)":"scale(1)" }}>★</span>
      ))}
    </div>
  );
}

function Badge({ children, color }) {
  const c = { red:"#C8410A", gold:"#E8A020", green:"#2D5016" };
  return <span style={{ background:c[color]||c.red, color:"white", fontSize:10, fontWeight:700, padding:"3px 8px", borderRadius:6, letterSpacing:0.5 }}>{children}</span>;
}

function RecipeCard({ recipe, theme, isFavorite, userRating, onToggleFavorite, onRate, onClick }) {
  return (
    <div onClick={onClick} style={{ borderRadius:14, overflow:"hidden", background:theme.card, border:`1px solid ${theme.border}`, cursor:"pointer", boxShadow:`0 2px 16px ${theme.shadow}`, transition:"transform 0.25s, box-shadow 0.25s" }}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow=`0 12px 32px ${theme.shadowHover}`;}}
      onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow=`0 2px 16px ${theme.shadow}`;}}>
      <div style={{ position:"relative" }}>
        <img src={recipe.image} alt={recipe.name} loading="lazy" style={{ width:"100%", height:190, objectFit:"cover", display:"block" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)" }} />
        <div style={{ position:"absolute", top:10, left:10, display:"flex", gap:5, flexWrap:"wrap" }}>
          <Badge color="red">{recipe.type}</Badge>
          {recipe.trending && <Badge color="gold">🔥 Trending</Badge>}
        </div>
        <button onClick={e=>{e.stopPropagation();onToggleFavorite();}} style={{ position:"absolute", top:8, right:8, background:"rgba(255,255,255,0.92)", border:"none", borderRadius:"50%", width:32, height:32, cursor:"pointer", fontSize:15, display:"flex", alignItems:"center", justifyContent:"center", transition:"transform 0.15s" }}
          onMouseEnter={e=>e.currentTarget.style.transform="scale(1.15)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
          {isFavorite ? "❤️" : "🤍"}
        </button>
        <div style={{ position:"absolute", bottom:8, left:10, right:10, display:"flex", justifyContent:"space-between" }}>
          <span style={{ background:"rgba(0,0,0,0.6)", color:"white", fontSize:10, padding:"3px 7px", borderRadius:6 }}>⏱ {recipe.time}</span>
          <span style={{ background:"rgba(0,0,0,0.6)", color:"white", fontSize:10, padding:"3px 7px", borderRadius:6 }}>{recipe.difficulty}</span>
        </div>
      </div>
      <div style={{ padding:"14px 16px 16px" }}>
        <div style={{ fontFamily:"Playfair Display, Georgia, serif", fontSize:16, fontWeight:700, color:theme.text, marginBottom:2, lineHeight:1.3 }}>{recipe.name}</div>
        <div style={{ fontSize:11, color:theme.primary, marginBottom:6, fontStyle:"italic" }}>{recipe.bengali} · {recipe.area}</div>
        <p style={{ fontSize:12, color:theme.muted, lineHeight:1.6, marginBottom:10, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{recipe.description}</p>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:5 }}>
            <StarRating value={recipe.rating} userRating={userRating} onRate={e=>{e.stopPropagation?.();onRate(e);}} />
            <span style={{ fontSize:11, color:theme.muted }}>({recipe.reviews})</span>
          </div>
          <span style={{ fontSize:11, color:theme.primary, fontWeight:600 }}>View Recipe →</span>
        </div>
      </div>
    </div>
  );
}

function RecipeModal({ recipe, theme, isFavorite, userRating, onToggleFavorite, onRate, onClose }) {
  const [tab, setTab] = useState("ingredients");
  return (
    <div onClick={e=>e.target===e.currentTarget&&onClose()} style={{ position:"fixed", inset:0, zIndex:1000, background:"rgba(0,0,0,0.82)", display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div style={{ background:theme.card, borderRadius:18, maxWidth:680, width:"100%", maxHeight:"92vh", overflowY:"auto", position:"relative" }}>
        <div style={{ position:"relative" }}>
          <img src={recipe.image} alt={recipe.name} style={{ width:"100%", height:260, objectFit:"cover", borderRadius:"18px 18px 0 0", display:"block" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)", borderRadius:"18px 18px 0 0" }} />
          <button onClick={onClose} style={{ position:"absolute", top:14, right:14, background:"rgba(255,255,255,0.92)", border:"none", borderRadius:"50%", width:36, height:36, cursor:"pointer", fontSize:18, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
          <button onClick={onToggleFavorite} style={{ position:"absolute", top:14, right:58, background:"rgba(255,255,255,0.92)", border:"none", borderRadius:"50%", width:36, height:36, cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>{isFavorite?"❤️":"🤍"}</button>
          <div style={{ position:"absolute", bottom:18, left:22, right:22 }}>
            <h2 style={{ fontFamily:"Playfair Display, Georgia, serif", fontSize:26, fontWeight:900, color:"white", margin:"0 0 4px" }}>{recipe.name}</h2>
            <div style={{ color:"rgba(255,255,255,0.8)", fontSize:13 }}>{recipe.bengali} · {recipe.region}</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:20, padding:"16px 22px", borderBottom:`1px solid ${theme.border}`, flexWrap:"wrap" }}>
          {[["⏱","Time",recipe.time],["📊","Difficulty",recipe.difficulty],["🍽️","Serves",`${recipe.serves} people`],["🔥","Calories",`${recipe.calories} kcal`]].map(([icon,label,val])=>((
            <div key={label}>
              <div style={{ fontSize:10, color:theme.muted, textTransform:"uppercase", letterSpacing:1 }}>{icon} {label}</div>
              <div style={{ fontWeight:700, color:theme.text, fontSize:13 }}>{val}</div>
            </div>
          )))}
        </div>
        <div style={{ padding:"14px 22px", borderBottom:`1px solid ${theme.border}`, display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
          <span style={{ fontSize:12, color:theme.muted }}>Your rating:</span>
          <StarRating value={recipe.rating} userRating={userRating} onRate={onRate} />
          <span style={{ fontSize:12, color:theme.muted }}>{recipe.rating} avg ({recipe.reviews} reviews)</span>
        </div>
        <div style={{ display:"flex", borderBottom:`1px solid ${theme.border}` }}>
          {[["ingredients","🥘 Ingredients"],["steps","👨‍🍳 Instructions"],["about","ℹ️ About"]].map(([id,label])=>((
            <button key={id} onClick={()=>setTab(id)} style={{ flex:1, padding:"13px 8px", border:"none", background:tab===id?theme.primary:"transparent", color:tab===id?"white":theme.text, cursor:"pointer", fontFamily:"Lora, Georgia, serif", fontSize:12, fontWeight:600, transition:"all 0.2s" }}>{label}</button>
          )))}
        </div>
        <div style={{ padding:22 }}>
          {tab==="ingredients" && (
            <div>
              <h3 style={{ fontFamily:"Playfair Display, Georgia, serif", fontSize:17, marginBottom:14, color:theme.text }}>What you'll need</h3>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {recipe.ingredients.map((ing,i)=>((
                  <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"10px 14px", background:theme.bg, borderRadius:8, fontSize:13, color:theme.text }}>
                    <span style={{ color:theme.primary, fontWeight:700, minWidth:20, fontSize:12 }}>{i+1}</span>{ing}
                  </div>
                )))}
              </div>
            </div>
          )}
          {tab==="steps" && (
            <div>
              <h3 style={{ fontFamily:"Playfair Display, Georgia, serif", fontSize:17, marginBottom:14, color:theme.text }}>Step-by-step instructions</h3>
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {recipe.steps.map((step,i)=>((
                  <div key={i} style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                    <div style={{ width:32, height:32, borderRadius:"50%", background:theme.primary, color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, flexShrink:0, fontSize:13 }}>{i+1}</div>
                    <div style={{ color:theme.text, lineHeight:1.75, fontSize:14, paddingTop:5 }}>{step}</div>
                  </div>
                )))}
              </div>
            </div>
          )}
          {tab==="about" && (
            <div>
              <h3 style={{ fontFamily:"Playfair Display, Georgia, serif", fontSize:17, marginBottom:10, color:theme.text }}>About this dish</h3>
              <p style={{ color:theme.muted, lineHeight:1.8, fontSize:14, marginBottom:16 }}>{recipe.description}</p>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {recipe.tags.map(tag=>((
                  <span key={tag} style={{ background:theme.border, color:theme.muted, padding:"4px 12px", borderRadius:20, fontSize:12 }}>#{tag}</span>
                )))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Bengaliana() {
  const [dark, setDark] = useState(false);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");
  const [type, setType] = useState("All");
  const [favorites, setFavorites] = useState(new Set());
  const [ratings, setRatings] = useState({});
  const [modal, setModal] = useState(null);
  const [favOnly, setFavOnly] = useState(false);
  const [toast, setToast] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Lora:ital,wght@0,400;0,600;1,400&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const t = {
    bg: dark ? "#13100A" : "#FDF7EE",
    card: dark ? "#1E1710" : "#FFFFFF",
    nav: dark ? "#1A1310EE" : "#FFFBF4EE",
    text: dark ? "#F2E8D6" : "#2C1810",
    muted: dark ? "#9A8060" : "#7A5C42",
    border: dark ? "#3A2A18" : "#EAD9C0",
    primary: "#C8410A",
    secondary: "#E8A020",
    accent: "#2D5016",
    shadow: dark ? "rgba(0,0,0,0.4)" : "rgba(200,65,10,0.08)",
    shadowHover: dark ? "rgba(0,0,0,0.6)" : "rgba(200,65,10,0.18)",
    heroGrad: dark ? "linear-gradient(135deg,#221808 0%,#13100A 100%)" : "linear-gradient(135deg,#FEF0D8 0%,#FFF8F0 100%)",
  };

  const filtered = useMemo(() => RECIPES.filter(r => {
    if (favOnly && !favorites.has(r.id)) return false;
    if (region !== "All" && r.region !== region && r.area !== region) return false;
    if (type !== "All" && r.type !== type) return false;
    if (search) {
      const q = search.toLowerCase();
      return r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) || r.bengali.includes(q) || r.tags.some(tag => tag.toLowerCase().includes(q));
    }
    return true;
  }), [search, region, type, favorites, favOnly]);

  const trending = RECIPES.filter(r => r.trending);

  const notify = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const toggleFav = (id) => {
    setFavorites(prev => {
      const n = new Set(prev);
      if (n.has(id)) { n.delete(id); notify("Removed from favorites"); } else { n.add(id); notify("Added to favorites ❤️"); }
      return n;
    });
  };

  const rate = (id, star) => { setRatings(p => ({ ...p, [id]: star })); notify(`Rated ${star} stars ⭐`); };

  const sectionStyle = { maxWidth:1200, margin:"0 auto", padding:"0 24px" };

  return (
    <div style={{ fontFamily:"Lora, Georgia, serif", background:t.bg, color:t.text, minHeight:"100vh", transition:"background 0.35s, color 0.35s" }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes slideIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.6s ease both; }
        .hero-anim { animation: fadeUp 0.9s ease both; }
        .toast-anim { animation: slideIn 0.3s ease; }
        ::-webkit-scrollbar { width:5px; height:5px; }
        ::-webkit-scrollbar-thumb { background:#C8410A; border-radius:3px; }
        ::-webkit-scrollbar-track { background:transparent; }
        .hscroll { overflow-x:auto; -webkit-overflow-scrolling:touch; }
        .hscroll::-webkit-scrollbar { height:3px; }
        input[type=text]:focus { outline:none; border-color:#C8410A !important; }
        @media(max-width:768px) {
          .recipe-grid { grid-template-columns: repeat(2,1fr) !important; }
          .hero-title { font-size:2.4rem !important; }
          .stats-row { gap:20px !important; }
          .nav-links { gap:10px !important; }
          .footer-grid { grid-template-columns:1fr 1fr !important; }
        }
        @media(max-width:480px) {
          .recipe-grid { grid-template-columns:1fr !important; }
          .hero-title { font-size:1.9rem !important; }
          .type-tabs { flex-wrap:wrap; }
        }
      `}</style>

      {/* Toast */}
      {toast && (
        <div className="toast-anim" style={{ position:"fixed", bottom:24, right:24, background:t.primary, color:"white", padding:"11px 18px", borderRadius:10, zIndex:9999, boxShadow:"0 4px 24px rgba(0,0,0,0.3)", fontSize:13, fontWeight:600 }}>
          {toast}
        </div>
      )}

      {/* Nav */}
      <nav style={{ position:"sticky", top:0, zIndex:100, background:t.nav, borderBottom:`1px solid ${t.border}`, backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)" }}>
        <div style={{ ...sectionStyle, display:"flex", alignItems:"center", justifyContent:"space-between", height:66 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:26 }}>🪔</span>
            <div>
              <div style={{ fontFamily:"Playfair Display, Georgia, serif", fontSize:21, fontWeight:900, color:t.primary, letterSpacing:"-0.5px", lineHeight:1.1 }}>Bengaliana</div>
              <div style={{ fontSize:9, color:t.muted, letterSpacing:2.5, textTransform:"uppercase" }}>বাংলার রান্নাঘর</div>
            </div>
          </div>
          <div className="nav-links" style={{ display:"flex", gap:16, alignItems:"center", flexWrap:"wrap" }}>
            <a href="#trending" style={{ color:t.text, textDecoration:"none", fontSize:13, fontWeight:600, transition:"color 0.2s" }} onMouseEnter={e=>e.target.style.color=t.primary} onMouseLeave={e=>e.target.style.color=t.text}>Trending</a>
            <a href="#recipes" style={{ color:t.text, textDecoration:"none", fontSize:13, fontWeight:600, transition:"color 0.2s" }} onMouseEnter={e=>e.target.style.color=t.primary} onMouseLeave={e=>e.target.style.color=t.text}>Recipes</a>
            <button onClick={() => { setFavOnly(!favOnly); if(!favOnly) document.getElementById("recipes")?.scrollIntoView({behavior:"smooth"}); }}
              style={{ background:favOnly?t.primary:"transparent", color:favOnly?"white":t.text, border:`1px solid ${favOnly?t.primary:t.border}`, borderRadius:20, padding:"6px 13px", cursor:"pointer", fontSize:12, fontWeight:600, transition:"all 0.2s" }}>
              ❤️ {favorites.size > 0 ? `Saved (${favorites.size})` : "Saved"}
            </button>
            <button onClick={() => setDark(!dark)} style={{ background:t.border, border:"none", borderRadius:20, padding:"7px 13px", cursor:"pointer", fontSize:16, lineHeight:1, transition:"all 0.3s" }}>
              {dark ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background:t.heroGrad, padding:"72px 24px 56px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:16, left:"8%", fontSize:72, opacity:0.05, transform:"rotate(-12deg)", pointerEvents:"none" }}>🪷</div>
        <div style={{ position:"absolute", bottom:12, right:"8%", fontSize:72, opacity:0.05, transform:"rotate(12deg)", pointerEvents:"none" }}>🌿</div>
        <div style={{ position:"absolute", top:"40%", left:"2%", fontSize:48, opacity:0.04, pointerEvents:"none" }}>🐟</div>
        <div style={{ position:"absolute", top:"30%", right:"3%", fontSize:48, opacity:0.04, pointerEvents:"none" }}>🍛</div>
        <div className="hero-anim">
          <p style={{ fontSize:12, letterSpacing:4, color:t.secondary, fontWeight:700, textTransform:"uppercase", marginBottom:14 }}>আমাদের রান্নাঘর থেকে · From Our Kitchen</p>
          <h1 className="hero-title" style={{ fontFamily:"Playfair Display, Georgia, serif", fontSize:"3.8rem", fontWeight:900, color:t.primary, lineHeight:1.1, marginBottom:14 }}>
            The Soul of<br /><em style={{ color:t.secondary }}>Bengali</em> Cuisine
          </h1>
          <p style={{ color:t.muted, fontSize:16, maxWidth:520, margin:"0 auto 36px", lineHeight:1.75 }}>
            Discover 120+ authentic recipes from Bengal — where every dish tells a story of history, heritage, and love.
          </p>

          {/* Search */}
          <div style={{ maxWidth:580, margin:"0 auto 36px", position:"relative" }}>
            <input type="text" placeholder="Search recipes, ingredients, dishes..." value={search}
              onChange={e => setSearch(e.target.value)} onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
              style={{ width:"100%", padding:"16px 52px 16px 22px", borderRadius:50, border:`2px solid ${searchFocused ? t.primary : t.border}`, background:t.card, color:t.text, fontSize:15, fontFamily:"Lora, Georgia, serif", boxShadow:`0 4px 28px ${t.shadow}`, transition:"border-color 0.25s, box-shadow 0.25s", boxSizing:"border-box" }} />
            <span style={{ position:"absolute", right:18, top:"50%", transform:"translateY(-50%)", fontSize:20, pointerEvents:"none" }}>🔍</span>
            {search && (
              <button onClick={() => setSearch("")} style={{ position:"absolute", right:48, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", color:t.muted, cursor:"pointer", fontSize:16, lineHeight:1 }}>✕</button>
            )}
          </div>

          {/* Stats */}
          <div className="stats-row" style={{ display:"flex", gap:36, justifyContent:"center", flexWrap:"wrap" }}>
            {[["🍽️","18+","Recipes"],["🗺️","8","Regions"],["⭐","4.7","Avg Rating"],["👨‍🍳","50K+","Cooks"]].map(([icon,num,label]) => (
              <div key={label} style={{ textAlign:"center" }}>
                <div style={{ fontSize:22, marginBottom:2 }}>{icon}</div>
                <div style={{ fontFamily:"Playfair Display, Georgia, serif", fontSize:20, fontWeight:700, color:t.primary }}>{num}</div>
                <div style={{ fontSize:11, color:t.muted, textTransform:"uppercase", letterSpacing:1 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section id="trending" style={{ ...sectionStyle, marginTop:52 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
          <span style={{ fontSize:22 }}>🔥</span>
          <h2 style={{ fontFamily:"Playfair Display, Georgia, serif", fontSize:24, fontWeight:700, color:t.text, margin:0 }}>Trending Now</h2>
          <span style={{ background:t.primary, color:"white", fontSize:10, padding:"3px 8px", borderRadius:8, fontWeight:700 }}>POPULAR</span>
        </div>
        <div className="hscroll" style={{ display:"flex", gap:18, paddingBottom:12 }}>
          {trending.map(r => (
            <div key={r.id} onClick={() => setModal(r)}
              style={{ minWidth:220, borderRadius:14, overflow:"hidden", background:t.card, border:`1px solid ${t.border}`, cursor:"pointer", flexShrink:0, boxShadow:`0 2px 16px ${t.shadow}`, transition:"transform 0.25s, box-shadow 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.boxShadow=`0 10px 28px ${t.shadowHover}`; }}
              onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=`0 2px 16px ${t.shadow}`; }}>
              <div style={{ position:"relative" }}>
                <img src={r.image} alt={r.name} loading="lazy" style={{ width:"100%", height:130, objectFit:"cover", display:"block" }} />
                <div style={{ position:"absolute", top:8, right:8, background:t.secondary, color:"white", fontSize:10, fontWeight:700, padding:"3px 8px", borderRadius:6 }}>⭐ {r.rating}</div>
              </div>
              <div style={{ padding:"12px 14px" }}>
                <div style={{ fontFamily:"Playfair Display, Georgia, serif", fontWeight:700, fontSize:14, color:t.text, marginBottom:2 }}>{r.name}</div>
                <div style={{ fontSize:11, color:t.muted }}>{r.bengali} · {r.time}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recipes Section */}
      <section id="recipes" style={{ ...sectionStyle, marginTop:52, paddingBottom:20 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
          <span style={{ fontSize:22 }}>🍛</span>
          <h2 style={{ fontFamily:"Playfair Display, Georgia, serif", fontSize:24, fontWeight:700, color:t.text, margin:0 }}>All Recipes</h2>
        </div>

        {/* Filters */}
        <div style={{ display:"flex", gap:10, marginBottom:14, flexWrap:"wrap", alignItems:"center" }}>
          <select value={region} onChange={e => setRegion(e.target.value)}
            style={{ padding:"9px 14px", borderRadius:8, border:`1px solid ${t.border}`, background:t.card, color:t.text, fontSize:13, fontFamily:"Lora, Georgia, serif", cursor:"pointer", outline:"none" }}>
            {REGIONS.map(r => <option key={r} value={r}>{r==="All" ? "🗺️ All Regions" : r}</option>)}
          </select>
        </div>

        <div className="type-tabs" style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
          {TYPES.map(tp => (
            <button key={tp} onClick={() => setType(tp)}
              style={{ padding:"7px 15px", borderRadius:20, border:`1px solid ${type===tp ? t.primary : t.border}`, background:type===tp ? t.primary : t.card, color:type===tp ? "white" : t.text, cursor:"pointer", fontSize:12, fontWeight:type===tp ? 700 : 400, transition:"all 0.2s", fontFamily:"Lora, Georgia, serif", whiteSpace:"nowrap" }}>
              {tp}
            </button>
          ))}
        </div>

        <div style={{ color:t.muted, fontSize:13, marginBottom:22 }}>
          Showing <strong style={{ color:t.primary }}>{filtered.length}</strong> recipes{search && ` for "${search}"`}{favOnly && " · Saved only"}
        </div>

        {filtered.length > 0 ? (
          <div className="recipe-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:22 }}>
            {filtered.map(r => (
              <div key={r.id} className="fade-up">
                <RecipeCard recipe={r} theme={t} isFavorite={favorites.has(r.id)} userRating={ratings[r.id]||0} onToggleFavorite={() => toggleFav(r.id)} onRate={star => rate(r.id, star)} onClick={() => setModal(r)} />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign:"center", padding:"60px 0", color:t.muted }}>
            <div style={{ fontSize:60, marginBottom:14 }}>🍽️</div>
            <div style={{ fontFamily:"Playfair Display, Georgia, serif", fontSize:22, marginBottom:8, color:t.text }}>No recipes found</div>
            <div style={{ fontSize:14 }}>Try adjusting your filters or search query</div>
            <button onClick={() => { setSearch(""); setRegion("All"); setType("All"); setFavOnly(false); }} style={{ marginTop:18, background:t.primary, color:"white", border:"none", borderRadius:8, padding:"10px 22px", cursor:"pointer", fontSize:14, fontWeight:600 }}>Clear all filters</button>
          </div>
        )}
      </section>

      {/* Region Feature Cards */}
      <section style={{ ...sectionStyle, marginTop:60 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:24 }}>
          <span style={{ fontSize:22 }}>🗺️</span>
          <h2 style={{ fontFamily:"Playfair Display, Georgia, serif", fontSize:24, fontWeight:700, color:t.text, margin:0 }}>Explore by Region</h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:14 }}>
          {[
            { name:"West Bengal", emoji:"🌸", desc:"Luchis, sweets & fish", count:8 },
            { name:"Bangladesh", emoji:"🐟", desc:"Hilsa, biriyani & pitha", count:7 },
            { name:"Kolkata", emoji:"🏙️", desc:"Street food & mishti", count:5 },
            { name:"Dhaka", emoji:"🕌", desc:"Kachchi & haleem", count:4 },
            { name:"Sylhet", emoji:"🍵", desc:"Tea-country flavors", count:3 },
            { name:"Rajshahi", emoji:"🍯", desc:"Mishti doi & mango", count:2 },
          ].map(reg => (
            <div key={reg.name} onClick={() => { setRegion(reg.name); document.getElementById("recipes")?.scrollIntoView({behavior:"smooth"}); }}
              style={{ background:t.card, border:`1px solid ${t.border}`, borderRadius:12, padding:"18px 14px", cursor:"pointer", textAlign:"center", transition:"all 0.2s", boxShadow:`0 2px 10px ${t.shadow}` }}
              onMouseEnter={e => { e.currentTarget.style.border=`1px solid ${t.primary}`; e.currentTarget.style.transform="translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.border=`1px solid ${t.border}`; e.currentTarget.style.transform="translateY(0)"; }}>
              <div style={{ fontSize:28, marginBottom:8 }}>{reg.emoji}</div>
              <div style={{ fontFamily:"Playfair Display, Georgia, serif", fontSize:14, fontWeight:700, color:t.text, marginBottom:4 }}>{reg.name}</div>
              <div style={{ fontSize:11, color:t.muted, marginBottom:6, lineHeight:1.4 }}>{reg.desc}</div>
              <div style={{ fontSize:10, color:t.primary, fontWeight:700 }}>{reg.count} recipes</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ marginTop:72, background:dark?"#0D0906":"#2C1810", color:"#F5E8D0", padding:"56px 24px 28px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div className="footer-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:36, marginBottom:40 }}>
            <div>
              <div style={{ fontFamily:"Playfair Display, Georgia, serif", fontSize:22, fontWeight:900, color:"#E8A020", marginBottom:10 }}>🪔 Bengaliana</div>
              <div style={{ fontSize:13, opacity:0.65, lineHeight:1.75, marginBottom:12 }}>Celebrating the rich culinary heritage of Bengal through authentic recipes, stories, and community.</div>
              <div style={{ fontSize:12, opacity:0.5 }}>বাংলার রান্নাঘর</div>
            </div>
            <div>
              <div style={{ fontWeight:700, marginBottom:12, fontSize:14 }}>Quick Links</div>
              {["Trending Recipes","Regional Cuisine","Vegetarian","Sweets & Desserts","Submit a Recipe","About Us"].map(link => (
                <div key={link} style={{ fontSize:13, opacity:0.65, marginBottom:7, cursor:"pointer", transition:"opacity 0.2s" }} onMouseEnter={e=>e.target.style.opacity=1} onMouseLeave={e=>e.target.style.opacity=0.65}>{link}</div>
              ))}
            </div>
            <div>
              <div style={{ fontWeight:700, marginBottom:12, fontSize:14 }}>Browse by Region</div>
              {["West Bengal","Bangladesh","Kolkata","Dhaka","Sylhet","Chittagong","Rajshahi"].map(r => (
                <div key={r} onClick={() => { setRegion(r); document.getElementById("recipes")?.scrollIntoView({behavior:"smooth"}); }} style={{ fontSize:13, opacity:0.65, marginBottom:7, cursor:"pointer", transition:"opacity 0.2s" }} onMouseEnter={e=>e.target.style.opacity=1} onMouseLeave={e=>e.target.style.opacity=0.65}>{r}</div>
              ))}
            </div>
            <div>
              <div style={{ fontWeight:700, marginBottom:12, fontSize:14 }}>Contact Us</div>
              <div style={{ fontSize:13, opacity:0.65, marginBottom:7 }}>📧 hello@bengaliana.com</div>
              <div style={{ fontSize:13, opacity:0.65, marginBottom:7 }}>📍 Kolkata & Dhaka</div>
              <div style={{ fontSize:13, opacity:0.65, marginBottom:16 }}>📱 @bengaliana</div>
              <div style={{ fontWeight:700, marginBottom:10, fontSize:14 }}>Follow Us</div>
              <div style={{ display:"flex", gap:10 }}>
                {["📘","📸","🐦","▶️"].map(icon => (
                  <div key={icon} style={{ width:36, height:36, borderRadius:"50%", background:"rgba(255,255,255,0.1)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:18, transition:"background 0.2s" }} onMouseEnter={e=>e.target.style.background="rgba(255,255,255,0.2)"} onMouseLeave={e=>e.target.style.background="rgba(255,255,255,0.1)"}>{icon}</div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:20, display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
            <div style={{ fontSize:12, opacity:0.45 }}>© 2025 Bengaliana · All rights reserved</div>
            <div style={{ fontSize:12, opacity:0.45 }}>Made with ❤️ for Bengali cuisine lovers worldwide</div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {modal && (
        <RecipeModal recipe={modal} theme={t} darkMode={dark} isFavorite={favorites.has(modal.id)} userRating={ratings[modal.id]||0} onToggleFavorite={() => toggleFav(modal.id)} onRate={star => rate(modal.id, star)} onClose={() => setModal(null)} />
      )}
    </div>
  );
}
