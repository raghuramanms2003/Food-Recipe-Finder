import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Heart } from 'lucide-react';
import { Recipe } from '../../types/Recipe';
import { useRecipes } from '../../context/RecipeContext';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip,
  CardActionArea
} from '@mui/material';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { isFavorite, addToFavorites, removeFromFavorite } = useRecipes();
  const favorite = isFavorite(recipe.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (favorite) {
      removeFromFavorite(recipe.id);
    } else {
      addToFavorites(recipe.id);
    }
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      <CardActionArea component={Link} to={`/recipe/${recipe.id}`}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200"
            image={recipe.image}
            alt={recipe.title}
          />
          <IconButton
            onClick={toggleFavorite}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: favorite ? '#E76F51' : 'rgba(255, 255, 255, 0.8)',
              color: favorite ? 'white' : 'text.secondary',
              '&:hover': {
                bgcolor: favorite ? '#E35D3B' : 'rgba(255, 255, 255, 0.9)',
              },
            }}
          >
            <Heart fill={favorite ? 'currentColor' : 'none'} />
          </IconButton>
          
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
              p: 2,
            }}
          >
            <Chip
              label={recipe.cuisineType}
              size="small"
              sx={{
                bgcolor: '#2A9D8F',
                color: 'white',
              }}
            />
          </Box>
        </Box>

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="h3" noWrap>
            {recipe.title}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 2
            }}
          >
            {recipe.description}
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
              <Clock size={16} />
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {recipe.cookTime} mins
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {recipe.dietaryInfo.slice(0, 2).map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  size="small"
                  sx={{
                    bgcolor: 'grey.100',
                    fontSize: '0.75rem',
                  }}
                />
              ))}
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RecipeCard;