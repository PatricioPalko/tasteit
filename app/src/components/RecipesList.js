import React, {useState, useEffect} from "react";
import { Link} from "react-router-dom";
import mealsData from "../mealsData";

const filters = [
    {name:"Meat", status: false},
    {name:"Vegetarian", status: false},
    {name:"Other", status: false},
];

const Filters = ({onClickAll, all, onClick, filters}) =>
    <form>
        <ul>
            <li onClick={onClickAll}>
                <input type="checkbox" checked={all}/>
                <label htmlFor="all">All</label>
            </li>
            {filters.map(
                (filter, i) =>
                    <li key={i} data-index={i} onClick={onClick}>
                        <input type="checkbox" id={filter.name} checked={filter.status}/>
                        <label htmlFor={filter.name}>{filter.name}</label>
                    </li>
                )
            }
        </ul>
    </form>

const Cards = ({mealsData}) =>
    <div className="comp__recipesList">
        {mealsData.map(
            (img, i)=>
                    <Link
                        to={'/recipe/' + img.strCategory}
                        className="comp__recipe"
                        style={{backgroundImage: `url(${img.strCategoryThumb})`}}
                        key={i}
                    >
                        <div className="title">
                            {img.strCategory}
                        </div>
                    </Link>
                )}
    </div>

class RecipesList extends React.Component {

        state = {
            mealsData: [],
            filters,
            all: true
        };

    setFilter = (e) =>{
        e.preventDefault();
        const { filters, all } = this.state;
        const { index } = e.currentTarget.dataset;

        filters[index].status = !filters[index].status;
        this.setState({
            filters
        });

        this.updateFilters();
        this.updateImgs();
    }

    setAll = () =>{
        const {filters} = this.state;

        filters.forEach(
            filter => {
                filter.status = false;
            }
        );

        this.setState({
            all: true,
            filters
        });
    }

    updateFilters(){
        const allFiltersTrue = filters.every( filter => filter.status === true);
        const allFiltersFalse = filters.every( filter => filter.status === false);

        if(allFiltersTrue||allFiltersFalse){
            this.setAll();
        }else{
            this.setState({
                all: false
            });
        }
    }

    updateImgs() {
        const { filters, all } = this.state;
        let newImgs = [];
        let a = 0;

        mealsData.forEach((img, imgKey) => {
            filters.forEach((filter, filterKey)=> {
                if((img.strType==filter.name)&&(filter.status==true)){
                    newImgs[a] = img;
                    a++;
                }
            })
        });

        this.setState({
            mealsData: newImgs
        });
    }

    render() {
        const {filters, all} = this.state;
        return (
            <div className="comp__filter">
                <Filters
                    onClickAll={this.setAll}
                    all={all}
                    onClick={this.setFilter}
                    filters={filters} />
                {(all)?(
                    <Cards mealsData = {mealsData}/>
                ):(
                    <Cards mealsData = {this.state.mealsData}/>
                )}
            </div>

        )
    }
}

export default RecipesList;