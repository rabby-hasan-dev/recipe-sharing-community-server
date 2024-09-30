import express from 'express';

// import validateRequest from '../../middlewares/validateRequest';
import { RecipeControllers } from './recipe.controller';



const router = express.Router();

router.post('/', RecipeControllers.createRecipe);
router.get('/', RecipeControllers.getAllRecipes);

router.get('/:id', RecipeControllers.getSingleRecipe);

router.patch('/:id', RecipeControllers.updateRecipe,
);

router.delete('/:id', RecipeControllers.getAllRecipes);

export const RecipeRoutes = router;
