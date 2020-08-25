import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

function RecipeDetail ({match}) {

    useEffect(() => {
        fetchRecipe();
    }, []);

    const [recipes, setRecipes] = useState([]);

    const fetchRecipe = async () => {
        const fetchRecipe = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const recipes = await fetchRecipe.json();
        setRecipes(recipes.categories);
    };

    const recipe = recipes.filter(u => u.strCategory === match.params.title);
    const recipeTitle = recipe.map(u=> u.strCategory);
    const recipeDesc = recipe.map(u=> u.strCategoryDescription);
    const recipeImage = recipe.map(u=> u.strCategoryThumb);

    return (
        <div>
            <div className="tpl__mainHeader">
                <div className="tpl tpl--smaller" style={{backgroundImage: `url(${recipeImage})`}}>
                    <div className="bg"></div>
                    <div className="container-medium">
                        <div className="row">
                            <div className="grid-xs-24">
                                <div className="comp__heading">
                                    <h1>{recipeTitle}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tpl__recipeDetail">
                <div className="tpl">
                    <div className="container-medium">
                        <div className="row">
                            <div className="grid-xs-18 grid-xs-offset-3">
                                <p>{recipeDesc}</p>
                                <Link to="/" className="btn btn--green">back</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipeDetail;