import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/recipePage.css";

const RecipePage = () => {
    const { recipeName } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [completedIngredients, setCompletedIngredients] = useState(new Set());

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);
        setError(null);

        fetch(`http://127.0.0.1:5000/recipe/${encodeURIComponent(recipeName)}`)
            .then((res) => {
                if (!res.ok) throw new Error("Recipe not found");
                return res.json();
            })
            .then(setRecipe)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [recipeName]);

    const toggleIngredient = (index) => {
        setCompletedIngredients((prev) => {
            const updated = new Set(prev);
            updated.has(index) ? updated.delete(index) : updated.add(index);
            return updated;
        });
    };

    if (loading) return <div className="loading">Loading recipe...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="rp-container">
            <NavBar />
            <div className="rp-content">
                <h1 className="rp-title">{recipe.title}</h1>
                <p className="rp-course">{recipe.course}</p>

                <div className="rp-times">
                    <span>Prep Time: {recipe.prep_time} mins</span>
                    <span>Cook Time: {recipe.cook_time} mins</span>
                    <span>Total Time: {recipe.total_time} mins</span>
                </div>

                <div className="rp-image-container">
                    <img src={recipe.url} alt={recipe.title} className="rp-image" />
                </div>

                <div className="rp-details">
                    <div className="rp-ingredients-section">
                        <h2>Ingredients</h2>
                        <ul className="rp-ingredients-list">
                            {recipe.ingredients.split(',').map((ingredient, index) => (
                                <li
                                    key={index}
                                    className={`rp-ingredient-item ${completedIngredients.has(index) ? 'completed' : ''}`}
                                    onClick={() => toggleIngredient(index)}
                                >
                                    {ingredient.trim()}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="rp-instructions-section">
                        <h2>Instructions</h2>
                        <ol className="rp-instructions-list">
                            {recipe.instructions.split(/(?<=\.)\s+/).map((instruction, index) => (
                                <li key={index} className="rp-instruction-item">
                                    {instruction.trim()}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
            <hr />
            <Footer />
        </div>
    );
};

export default RecipePage;
