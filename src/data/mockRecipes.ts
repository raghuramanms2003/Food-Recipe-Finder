import { Recipe } from '../types/Recipe';

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Spaghetti Carbonara',
    description: 'A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.',
    image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ingredients: [
      { name: 'Spaghetti', amount: '400', unit: 'g' },
      { name: 'Pancetta or Guanciale', amount: '150', unit: 'g' },
      { name: 'Pecorino Romano', amount: '50', unit: 'g' },
      { name: 'Parmesan', amount: '50', unit: 'g' },
      { name: 'Eggs', amount: '4', unit: '' },
      { name: 'Black Pepper', amount: '1', unit: 'tsp' },
      { name: 'Salt', amount: '', unit: 'to taste' },
    ],
    steps: [
      {
        description: 'Bring a large pot of salted water to boil. Add the spaghetti and cook until al dente.',
        imageUrl: 'https://images.pexels.com/photos/7219086/pexels-photo-7219086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        description: 'In a large pan, cook the diced pancetta or guanciale until crispy. Set aside but keep the fat in the pan.',
      },
      {
        description: 'In a bowl, whisk the eggs and mix in the grated Pecorino Romano and Parmesan cheese. Season with black pepper.',
      },
      {
        description: 'Drain the pasta, reserving some pasta water. Add the hot pasta to the pan with the pancetta and toss.',
        imageUrl: 'https://images.pexels.com/photos/5710170/pexels-photo-5710170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        description: 'Remove the pan from heat and quickly add the egg and cheese mixture, stirring vigorously to create a creamy sauce. Add pasta water if needed to thin the sauce.',
      },
      {
        description: 'Serve immediately with extra grated cheese and black pepper on top.',
      },
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    cuisineType: 'Italian',
    mealType: 'Dinner',
    dietaryInfo: [],
    nutritionInfo: {
      calories: '550',
      protein: '22',
      carbs: '50',
      fat: '30',
    },
    userId: '123456',
    createdAt: '2025-01-15T12:00:00Z',
  },
  {
    id: '2',
    title: 'Vegetable Stir Fry',
    description: 'A quick and healthy stir fry loaded with colorful vegetables and a flavorful sauce.',
    image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ingredients: [
      { name: 'Broccoli', amount: '1', unit: 'head' },
      { name: 'Carrots', amount: '2', unit: 'medium' },
      { name: 'Bell Peppers', amount: '2', unit: 'medium' },
      { name: 'Snow Peas', amount: '1', unit: 'cup' },
      { name: 'Garlic', amount: '3', unit: 'cloves' },
      { name: 'Ginger', amount: '1', unit: 'tbsp' },
      { name: 'Soy Sauce', amount: '3', unit: 'tbsp' },
      { name: 'Sesame Oil', amount: '1', unit: 'tbsp' },
      { name: 'Vegetable Oil', amount: '2', unit: 'tbsp' },
      { name: 'Rice', amount: '2', unit: 'cups cooked' },
    ],
    steps: [
      {
        description: 'Prepare all vegetables by washing and cutting into bite-sized pieces.',
      },
      {
        description: 'Mix the sauce by combining soy sauce, sesame oil, and a bit of cornstarch in a small bowl.',
      },
      {
        description: 'Heat vegetable oil in a wok or large frying pan over high heat. Add minced garlic and ginger, stir for 30 seconds.',
        imageUrl: 'https://images.pexels.com/photos/3731805/pexels-photo-3731805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        description: 'Add the vegetables, starting with the ones that take longer to cook like carrots and broccoli. Stir fry for 2-3 minutes.',
      },
      {
        description: 'Add the quicker cooking vegetables like bell peppers and snow peas. Continue to stir fry for another 2-3 minutes.',
      },
      {
        description: 'Pour the sauce over the vegetables and toss to coat evenly. Cook for another minute until the sauce thickens slightly.',
        imageUrl: 'https://images.pexels.com/photos/5836771/pexels-photo-5836771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        description: 'Serve hot over cooked rice. Garnish with sesame seeds if desired.',
      },
    ],
    prepTime: 15,
    cookTime: 10,
    servings: 4,
    cuisineType: 'Asian',
    mealType: 'Dinner',
    dietaryInfo: ['Vegetarian', 'Vegan'],
    nutritionInfo: {
      calories: '320',
      protein: '8',
      carbs: '45',
      fat: '12',
    },
    userId: '123456',
    createdAt: '2025-02-10T12:00:00Z',
  },
  {
    id: '3',
    title: 'Avocado Toast with Poached Egg',
    description: 'A simple but delicious breakfast toast topped with creamy avocado and a perfectly poached egg.',
    image: 'https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ingredients: [
      { name: 'Bread', amount: '2', unit: 'slices' },
      { name: 'Avocado', amount: '1', unit: 'ripe' },
      { name: 'Eggs', amount: '2', unit: 'large' },
      { name: 'Lemon Juice', amount: '1', unit: 'tsp' },
      { name: 'Red Pepper Flakes', amount: '1/4', unit: 'tsp' },
      { name: 'Salt', amount: '', unit: 'to taste' },
      { name: 'Black Pepper', amount: '', unit: 'to taste' },
      { name: 'Vinegar', amount: '1', unit: 'tbsp' },
    ],
    steps: [
      {
        description: 'Toast the bread slices until golden and crispy.',
      },
      {
        description: 'In a small bowl, mash the avocado with lemon juice, salt, and pepper.',
        imageUrl: 'https://images.pexels.com/photos/1627561/pexels-photo-1627561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        description: 'Bring a pot of water to a gentle simmer. Add vinegar to the water.',
      },
      {
        description: 'Crack an egg into a small cup. Create a gentle whirlpool in the water and slowly slide the egg into the center. Cook for 3-4 minutes for a runny yolk.',
        imageUrl: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        description: 'Remove the poached egg with a slotted spoon and place on a paper towel to drain excess water.',
      },
      {
        description: 'Spread the mashed avocado on the toast slices. Top each with a poached egg.',
      },
      {
        description: 'Season with salt, pepper, and red pepper flakes. Serve immediately.',
      },
    ],
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    cuisineType: 'American',
    mealType: 'Breakfast',
    dietaryInfo: ['Vegetarian'],
    nutritionInfo: {
      calories: '380',
      protein: '15',
      carbs: '30',
      fat: '22',
    },
    userId: '654321',
    createdAt: '2025-03-05T12:00:00Z',
  },
  {
    id: '4',
    title: 'Chicken Enchiladas',
    description: 'Delicious Mexican enchiladas filled with seasoned chicken and topped with spicy sauce and cheese.',
    image: 'https://images.pexels.com/photos/2092906/pexels-photo-2092906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ingredients: [
      { name: 'Chicken Breasts', amount: '2', unit: 'large' },
      { name: 'Corn Tortillas', amount: '8', unit: '' },
      { name: 'Enchilada Sauce', amount: '2', unit: 'cups' },
      { name: 'Shredded Cheese', amount: '2', unit: 'cups' },
      { name: 'Onion', amount: '1', unit: 'medium' },
      { name: 'Garlic', amount: '2', unit: 'cloves' },
      { name: 'Cumin', amount: '1', unit: 'tsp' },
      { name: 'Chili Powder', amount: '1', unit: 'tsp' },
      { name: 'Salt', amount: '', unit: 'to taste' },
      { name: 'Cilantro', amount: '1/4', unit: 'cup' },
      { name: 'Oil', amount: '2', unit: 'tbsp' },
    ],
    steps: [
      {
        description: 'Preheat the oven to 375°F (190°C).',
      },
      {
        description: 'Season chicken breasts with salt, pepper, cumin, and chili powder. Cook in a pan until fully cooked, then shred with two forks.',
        imageUrl: 'https://images.pexels.com/photos/6210747/pexels-photo-6210747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        description: 'In the same pan, sauté diced onion and minced garlic until soft. Add the shredded chicken back to the pan and mix well.',
      },
      {
        description: 'Warm the tortillas slightly to make them pliable. Spread a thin layer of enchilada sauce on the bottom of a baking dish.',
      },
      {
        description: 'Fill each tortilla with the chicken mixture, roll up, and place seam-side down in the baking dish.',
        imageUrl: 'https://images.pexels.com/photos/12706223/pexels-photo-12706223.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        description: 'Pour the remaining enchilada sauce over the top and sprinkle with shredded cheese.',
      },
      {
        description: 'Bake for 20-25 minutes until the cheese is bubbly and golden. Garnish with chopped cilantro before serving.',
      },
    ],
    prepTime: 20,
    cookTime: 35,
    servings: 4,
    cuisineType: 'Mexican',
    mealType: 'Dinner',
    dietaryInfo: [],
    nutritionInfo: {
      calories: '480',
      protein: '35',
      carbs: '35',
      fat: '22',
    },
    userId: '123456',
    createdAt: '2025-02-28T12:00:00Z',
  },
  {
    id: '5',
    title: 'Greek Salad',
    description: 'A fresh and crisp traditional Greek salad with tomatoes, cucumber, olives, and feta cheese.',
    image: 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ingredients: [
      { name: 'Tomatoes', amount: '4', unit: 'medium' },
      { name: 'Cucumber', amount: '1', unit: 'large' },
      { name: 'Red Onion', amount: '1/2', unit: 'medium' },
      { name: 'Green Bell Pepper', amount: '1', unit: 'medium' },
      { name: 'Kalamata Olives', amount: '1/2', unit: 'cup' },
      { name: 'Feta Cheese', amount: '200', unit: 'g' },
      { name: 'Olive Oil', amount: '1/4', unit: 'cup' },
      { name: 'Red Wine Vinegar', amount: '2', unit: 'tbsp' },
      { name: 'Dried Oregano', amount: '1', unit: 'tsp' },
      { name: 'Salt', amount: '', unit: 'to taste' },
      { name: 'Black Pepper', amount: '', unit: 'to taste' },
    ],
    steps: [
      {
        description: 'Cut the tomatoes into wedges and the cucumber into thick half-moons.',
      },
      {
        description: 'Thinly slice the red onion and cut the bell pepper into rings.',
        imageUrl: 'https://images.pexels.com/photos/5966431/pexels-photo-5966431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        description: 'In a large bowl, combine the tomatoes, cucumber, onion, bell pepper, and olives.',
      },
      {
        description: 'Cut the feta cheese into cubes or crumble it and add to the salad.',
      },
      {
        description: 'In a small bowl, whisk together olive oil, red wine vinegar, dried oregano, salt, and pepper.',
        imageUrl: 'https://images.pexels.com/photos/5907902/pexels-photo-5907902.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        description: 'Pour the dressing over the salad and gently toss to combine.',
      },
      {
        description: 'Let the salad sit for a few minutes before serving to allow the flavors to meld together.',
      },
    ],
    prepTime: 15,
    cookTime: 0,
    servings: 4,
    cuisineType: 'Mediterranean',
    mealType: 'Lunch',
    dietaryInfo: ['Vegetarian', 'Gluten-Free'],
    nutritionInfo: {
      calories: '280',
      protein: '8',
      carbs: '12',
      fat: '22',
    },
    userId: '654321',
    createdAt: '2025-03-15T12:00:00Z',
  },
  {
    id: '6',
    title: 'Chocolate Chip Cookies',
    description: 'Classic chocolate chip cookies that are crispy on the edges and chewy in the middle.',
    image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ingredients: [
      { name: 'All-Purpose Flour', amount: '2 1/4', unit: 'cups' },
      { name: 'Baking Soda', amount: '1', unit: 'tsp' },
      { name: 'Salt', amount: '1', unit: 'tsp' },
      { name: 'Unsalted Butter', amount: '1', unit: 'cup' },
      { name: 'Brown Sugar', amount: '3/4', unit: 'cup' },
      { name: 'Granulated Sugar', amount: '3/4', unit: 'cup' },
      { name: 'Vanilla Extract', amount: '1', unit: 'tsp' },
      { name: 'Eggs', amount: '2', unit: 'large' },
      { name: 'Chocolate Chips', amount: '2', unit: 'cups' },
    ],
    steps: [
      {
        description: 'Preheat the oven to 375°F (190°C). Line baking sheets with parchment paper.',
      },
      {
        description: 'In a small bowl, whisk together the flour, baking soda, and salt.',
      },
      {
        description: 'In a large bowl, beat the butter, brown sugar, and granulated sugar until creamy.',
        imageUrl: 'https://images.pexels.com/photos/6287295/pexels-photo-6287295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        description: 'Add vanilla and eggs, one at a time, beating well after each addition.',
      },
      {
        description: 'Gradually stir in the flour mixture until just combined. Fold in the chocolate chips.',
        imageUrl: 'https://images.pexels.com/photos/6697283/pexels-photo-6697283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        description: 'Drop rounded tablespoons of dough onto the prepared baking sheets, spacing them about 2 inches apart.',
      },
      {
        description: 'Bake for 9-11 minutes until the edges are golden but the centers are still soft. Cool on the baking sheets for 2 minutes, then transfer to wire racks to cool completely.',
      },
    ],
    prepTime: 15,
    cookTime: 10,
    servings: 24,
    cuisineType: 'American',
    mealType: 'Dessert',
    dietaryInfo: ['Vegetarian'],
    nutritionInfo: {
      calories: '170',
      protein: '2',
      carbs: '22',
      fat: '9',
    },
    userId: '123456',
    createdAt: '2025-01-20T12:00:00Z',
  },
];