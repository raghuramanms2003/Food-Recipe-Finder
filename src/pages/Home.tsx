import React, { useState, useEffect } from 'react';
import { ChefHat as Chef } from 'lucide-react';
import SearchBar from '../components/search/SearchBar';
import FilterOptions from '../components/search/FilterOptions';
import RecipeList from '../components/recipes/RecipeList';
import { useRecipes } from '../context/RecipeContext';
import { Recipe } from '../types/Recipe';
import { Card, CardContent, CardMedia, Typography, Grid, Box, Chip, Button } from '@mui/material';
import { Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { searchRecipes, loading, recipes } = useRecipes();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    cuisineType: [] as string[],
    mealType: [] as string[],
    dietType: [] as string[],
  });
  const [displayedRecipes, setDisplayedRecipes] = useState<Recipe[]>([]);

  // Get 3 featured recipes
  const featuredRecipes = recipes.slice(0, 3);

  useEffect(() => {
    handleSearch('');
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const results = searchRecipes(query, filters);
    setDisplayedRecipes(results);
  };

  const handleFilterChange = (newFilters: {
    cuisineType: string[];
    mealType: string[];
    dietType: string[];
  }) => {
    setFilters(newFilters);
    const results = searchRecipes(searchQuery, newFilters);
    setDisplayedRecipes(results);
  };

  return (
    <div>
      <section className="relative mb-10">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`, 
            opacity: 0.5,
            backgroundPosition: '0 40%'
          }}
        ></div>
        <div 
          className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"
        ></div>
        <div className="relative py-16 md:py-24 px-4 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Find Delicious Recipes
            </h1>
            <p className="text-xl text-white opacity-90">
              Discover recipes based on ingredients you already have
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          <div className="text-white mt-4 flex justify-center items-center">
            <Chef className="h-6 w-6 mr-2" />
            <p>Browse recipes by cuisine, meal type, or dietary needs</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          Featured Recipes
        </Typography>
        <Grid container spacing={4}>
          {featuredRecipes.map((recipe) => (
            <Grid item xs={12} md={4} key={recipe.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={recipe.image}
                  alt={recipe.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ mb: 2 }}>
                    <Chip 
                      label={recipe.cuisineType}
                      size="small"
                      sx={{ 
                        bgcolor: '#2A9D8F',
                        color: 'white',
                        mr: 1 
                      }}
                    />
                    <Chip 
                      label={recipe.mealType}
                      size="small"
                      sx={{ 
                        bgcolor: '#E76F51',
                        color: 'white' 
                      }}
                    />
                  </Box>
                  <Typography gutterBottom variant="h6" component="h3">
                    {recipe.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {recipe.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                      <Clock size={16} className="mr-1" />
                      <Typography variant="body2">
                        {recipe.cookTime + recipe.prepTime} mins
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                      <Users size={16} className="mr-1" />
                      <Typography variant="body2">
                        Serves {recipe.servings}
                      </Typography>
                    </Box>
                  </Box>
                  <Button 
                    component={Link}
                    to={`/recipe/${recipe.id}`}
                    variant="contained"
                    fullWidth
                    sx={{ 
                      mt: 2,
                      bgcolor: '#2A9D8F',
                      '&:hover': {
                        bgcolor: '#248F82'
                      }
                    }}
                  >
                    View Recipe
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </section>
      
      <section className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {searchQuery 
              ? `Search Results for "${searchQuery}"` 
              : 'All Recipes'}
          </h2>
          <FilterOptions 
            onFilterChange={handleFilterChange}
            initialFilters={filters}
          />
        </div>
        
        <RecipeList 
          recipes={displayedRecipes} 
          loading={loading}
        />
      </section>
      
      <section className="mb-10">
        <div className="bg-gray-100 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Got ingredients? Find recipes!
          </h2>
          <p className="text-gray-600 mb-6">
            Enter ingredients you have on hand and discover recipes you can make right now.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-lg shadow-md text-center">
              <div className="mb-3 inline-block p-3 bg-blue-50 rounded-full">
                <Chef className="h-8 w-8 text-[#2A9D8F]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Search by Ingredients</h3>
              <p className="text-gray-600">
                Find recipes based on what's in your kitchen
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-md text-center">
              <div className="mb-3 inline-block p-3 bg-green-50 rounded-full">
                <Chef className="h-8 w-8 text-[#2A9D8F]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Filter By Diet</h3>
              <p className="text-gray-600">
                Find recipes that match your dietary needs
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-md text-center">
              <div className="mb-3 inline-block p-3 bg-orange-50 rounded-full">
                <Chef className="h-8 w-8 text-[#2A9D8F]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Create Your Own</h3>
              <p className="text-gray-600">
                Share your favorite recipes with the community
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;