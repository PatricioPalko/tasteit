import React from "react";
import {Link} from "react-router-dom";
import RecipesList from "./RecipesList";

class RecipesWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            strCategory: "",
            strCategoryThumb: "",
            allRecipes: []
        }
    }

    componentDidMount = () => {
        fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
            .then(response => response.json())
            .then(response => {
                const {categories} = response;
                this.setState({allRecipes: categories})
            })
    };


    listOfRecipes() {
        return this.state.allRecipes.map((item) =>
            <Link
                to={'/recipe/' + item.strCategory}
                className="comp__recipe"
                style={{backgroundImage: `url(${item.strCategoryThumb})`}}
                key={item.strCategory}
            >
                <div className="title">
                    {item.strCategory}
                </div>
            </Link>
        )
    }

    render() {
        return (
            <div className="tpl__recipesWrapper">
                <div className="tpl">
                    <div className="container-medium">
                        <div className="grid-xs-24">
                            <div className="row">
                                <RecipesList/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default RecipesWrapper;