import { z } from 'zod';

export const RecipeValidationSchema = z.object({
  title: z.string().nonempty("Title is required").trim(),
  description: z.string().nonempty("Description is required").trim(),
  image: z.string().nonempty("Image is required"),
  ingredients: z.array(z.string()).nonempty("Ingredients are required"),
  cookingTime: z.number().positive("Cooking time must be a positive number").min(1, "Cooking time is required"),
  author: z.string().nonempty("Author is required").refine((value) => value.match(/^[a-f\d]{24}$/i), "Invalid ObjectId format for author"),
  ratings: z.array(
    z.object({
      user: z.string().refine((value) => value.match(/^[a-f\d]{24}$/i), "Invalid ObjectId format for user"),
      rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
    })
  ).optional(),
  averageRating: z.number().default(0),
  upvotes: z.array(
    z.string().refine((value) => value.match(/^[a-f\d]{24}$/i), "Invalid ObjectId format for upvotes")
  ).optional(),
  downvotes: z.array(
    z.string().refine((value) => value.match(/^[a-f\d]{24}$/i), "Invalid ObjectId format for downvotes")
  ).optional(),
  comments: z.array(
    z.object({
      user: z.string().refine((value) => value.match(/^[a-f\d]{24}$/i), "Invalid ObjectId format for user"),
      comment: z.string().nonempty("Comment text is required"),
      createdAt: z.date().default(() => new Date()),
    })
  ).optional(),
  isPremium: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  isDeleted: z.boolean().default(false),
});


