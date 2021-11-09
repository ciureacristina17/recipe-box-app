let { Button, ButtonToolbar, FormGroup, FormControl, ControlLabel, Modal, Accordion, Panel } = ReactBootstrap;

var RecipeBox = React.createClass({
    displayName: "RecipeBox",

    getInitialState: function() {
        return {
            recipes: [

                {
                    recipe: "Garlic Chicken",
                    ingredients: "3 tablespoons butter;1 teaspoon seasoning salt;1 teaspoon onion powder;4 skinless, boneless chicken breast halves;2 teaspoons garlic powder",
                    directions: "Melt butter in a large skillet over medium high heat.;Add chicken and sprinkle with garlic powder, seasoning salt and onion powder.;Saute about 10 to 15 minutes on each side, or until chicken is cooked through and juices run clear."
                },


                {
                    recipe: "Easy Chocolate Pie",
                    ingredients: "1 (12 ounce) can evaporated milk;1 (5.9 ounce) package chocolate instant pudding mix;1 (6.5 ounce) can whipped cream; 1/2 cup miniature semi-sweet chocolate chips (optional); 1 (9 inch) graham cracker pie crust; Another can of whipped cream for garnish (optional)",
                    directions: "Pour milk into medium bowl. Add dry pudding mix beat with wire whisk until well blended and mixture just begins to thicken. Stir in half of the chocolate chips.;Add contents of whipped cream can stir gently but quickly until well blended. Pour into crust, cover.;Refrigerate 6 hours, or until set. Cut into 8 slices to serve. Garnish with additional whipped cream and remaining chocolate chips, if desired."
                },

                {
                    recipe: "Lime Chicken Tacos",
                    ingredients: "1 1/2 pounds skinless, boneless chicken breast meat - cubed;1/8 cup red wine vinegar;1/2 lime, juiced;1 teaspoon white sugar;1/2 teaspoon salt;1/2 teaspoon ground black pepper;2 green onions, chopped;2 cloves garlic, minced;1 teaspoon dried oregano;10 (6 inch) corn tortillas;1 tomato, diced;1/4 cup shredded lettuce;1/4 cup shredded Monterey Jack cheese;1/4 cup salsa",
                    directions: "Saute chicken in a medium saucepan over medium high heat for about 20 minutes. Add vinegar, lime juice, sugar, salt, pepper, green onion, garlic and oregano. Simmer for an extra 10 minutes.;Heat an iron skillet over medium heat. Place a tortilla in the pan, warm, and turn over to heat the other side. Repeat with remaining tortillas. Serve lime chicken mixture in warm tortillas topped with tomato, lettuce, cheese and salsa."
                },

                {
                    recipe: "Artichoke Dip",
                    ingredients: "1 8oz package soft cream cheese;4oz mayonnaise;4oz sour cream;1/4 Cup Fresh Grated Parmesan Cheese;1/4 Cup Fresh Grated Romano Cheese;2 eggs;3/4 Cup dairy sour cream;1 16oz can artichoke hearts;1/4 Cup fresh chopped chives;1 tbs fresh minced garlic",
                    directions: "Soften the cream cheese before mixing.;Rinse well, then dice the artichokes into small ½” size pieces.;Into a mixing bowl place the softened cream cheese. Mix in the mayonnaise, sour cream, the Parmesan and Romano cheese, artichokes and garlic.;When the mixture is fairly well blended, spoon into a 9” round glass pie dish.;Set Oven to Bake at 350 degrees.;Place un-covered dish into oven for 20 – 25 minutes until the edges appear slightly golden and mixture is bubbling at the edge.;Remove and sprinkle chopped chives on top and let cool about 5 minutes before serving.;Enjoy!"
                }
            ],
            showModal: false,
            isAddingNew: false,
            indexBeingLoaded: null,
            recipeInputText: '',
            ingredientsInputText: '',
            directionsInputText: '',
            statusValidation: [null, null, null]
        };

    },


    // Button close

    close: function() {
        this.clearInputText();
        this.setState({ showModal: false });
    },

    // Button open

    open: function() {
        this.setState({ showModal: true });
        console.log(this.state.isAddingNew);
    },

    clearInputText: function() {
        this.setState({ recipeInputText: '' });
        this.setState({ ingredientsInputText: '' });
        this.setState({ directionsInputText: '' });
    },

    // Button edit click

    handleEditClick: function(i) {
        console.log('this is the edit button click');
        this.setState({ isAddingNew: false });
        var recipe = this.state.recipes[i].recipe;
        var ingredients = this.state.recipes[i].ingredients;
        var directions = this.state.recipes[i].directions;
        this.setState({ recipeInputText: recipe });
        this.setState({ ingredientsInputText: ingredients });
        this.setState({ directionsInputText: directions });
        this.setState({ indexBeingLoaded: i });
        this.open();
    },

    // Button add recipe click

    addRecipeClick: function() {
        console.log('this is the add recipe click');
        this.setState({ isAddingNew: true });
        this.setState({ indexBeingLoaded: null });
        this.open();
    },

    // Here you can add what recipe you want

    addNewRecipe: function() {
        var arr = this.state.recipes;
        arr.push({
            recipe: this.state.recipeInputText,
            ingredients: this.state.ingredientsInputText,
            directions: this.state.directionsInputText
        });
        this.setState({ recipes: arr });
        this.close();
    },

    validateInputFields: function() {

        console.log('validate input fields');
        var arr = [null, null, null];

        var recipeText = ReactDOM.findDOMNode(this.refs.recipeText).value;
        var ingredientsText = ReactDOM.findDOMNode(this.refs.ingredientsText).value;
        var directionsText = ReactDOM.findDOMNode(this.refs.directionsText).value;

        if (recipeText == '') { arr[0] = false; } else { arr[0] = true; };
        if (ingredientsText == '') { arr[1] = false; } else { arr[1] = true; };
        if (directionsText == '') { arr[2] = false; } else { arr[2] = true; };

        console.log('print validation fileld');
        console.log(arr);


    },

    handleModalAddEditClick: function() {

        // Modal validation

        console.log('modal click');
        this.validateInputFields();


        if (this.state.isAddingNew) {
            this.addNewRecipe();
        } else {
            this.updateRecipe();
        }
    },

    // Here you can update recipe

    updateRecipe: function() {
        console.log('update recipe: ' + this.state.indexBeingLoaded);
        var i = this.state.indexBeingLoaded;
        var arr = this.state.recipes;
        arr[i].recipe = this.state.recipeInputText;
        arr[i].ingredients = this.state.ingredientsInputText;
        arr[i].directions = this.state.directionsInputText;
        this.setState({ recipes: arr });
        this.close();
    },

    syncStateToInput: function() {
        var recipeText = ReactDOM.findDOMNode(this.refs.recipeText).value;
        var ingredientsText = ReactDOM.findDOMNode(this.refs.ingredientsText).value;
        var directionsText = ReactDOM.findDOMNode(this.refs.directionsText).value;
        this.setState({ recipeInputText: recipeText });
        this.setState({ ingredientsInputText: ingredientsText });
        this.setState({ directionsInputText: directionsText });
    },

    // Here you can delete the recipe

    delete: function(i) {
        console.log('delete' + i);
        var arr = this.state.recipes;
        arr.splice(i, 1);
        this.setState({ recipes: arr });

    },

    renderOneRecipe: function(recipe, i) {
        return (

            React.createElement(Panel, { header: recipe.recipe, eventKey: i },

                React.createElement("label", { for: "ingredient" }, "Ingredients"),
                React.createElement("ul", { className: "list-group" },
                    recipe.ingredients.split(';').map(function(ingredient, i) {
                        return React.createElement("li", { className: "list-group-item" }, ingredient);
                    })),

                React.createElement("label", { for: "direction" }, "Directions"),
                React.createElement("ul", { className: "list-group" },
                    recipe.directions.split(';').map(function(direction, i) {
                        return React.createElement("li", { className: "list-group-item" }, direction);
                    })),

                React.createElement(ButtonToolbar, null,
                    React.createElement(Button, { bsStyle: "danger", onClick: this.delete.bind(this, i) }, "Delete"),
                    React.createElement(Button, { bsStyle: "default", onClick: this.handleEditClick.bind(this, i) }, "Edit"))));

    },

    render: function() {

        var isRecipeValid = '';
        var isRecipeValid = '';
        var isRecipeValid = '';

        return (
            React.createElement("div", { className: "container" },

                React.createElement("div", { className: "row" },

                    React.createElement("div", { className: "col-md-3" }),

                    React.createElement("div", { className: "col-md-6" },

                        React.createElement("div", { className: "title-container text-center" },
                            React.createElement("h1", { className: "app-title" }, "RECIPE BOX APP")),


                        React.createElement(Accordion, null,
                            this.state.recipes.map(this.renderOneRecipe)),


                        React.createElement("div", { className: "text-right bottom-padding" },
                            React.createElement("button", {
                                className: "btn btn-success btn-lg",
                                onClick: this.addRecipeClick
                            }, "New Recipe")))),

                React.createElement(Modal, { show: this.state.showModal, onHide: this.close },
                    React.createElement(Modal.Header, null,
                        React.createElement(Modal.Title, null, this.state.isAddingNew ? 'Add' : 'Edit', " a recipe")),

                    React.createElement(Modal.Body, null,
                        React.createElement("form", { role: "form" },

                            React.createElement("div", { className: "form-group" },
                                React.createElement("label", { className: "form-control-label", for: "recipe" }, "Recipe"),
                                React.createElement("input", {
                                    type: "text",
                                    className: "form-control",
                                    id: "recipe",
                                    onChange: this.syncStateToInput,
                                    ref: "recipeText",
                                    placeholder: "Recipe Name",
                                    value: this.state.recipeInputText
                                })),


                            React.createElement("div", { className: "form-group" },
                                React.createElement("label", { className: "form-control-label", for: "ingredients" }, "Ingredients"),
                                React.createElement("textarea", {
                                    className: "form-control",
                                    rows: "2",
                                    id: "ingredients",
                                    onChange: this.syncStateToInput,
                                    ref: "ingredientsText",
                                    placeholder: "Enter ingredients;separated;by semi-colons",
                                    value: this.state.ingredientsInputText
                                })),

                            React.createElement("div", { className: "form-group" },

                                React.createElement("label", { className: "form-control-label", for: "directions" }, "Directions"),
                                React.createElement("textarea", {
                                    className: "form-control",
                                    rows: "2",
                                    id: "directions",
                                    onChange: this.syncStateToInput,
                                    ref: "directionsText",
                                    placeholder: "Enter directions;separated;by semi-colons",
                                    value: this.state.directionsInputText
                                })))),

                    React.createElement(Modal.Footer, null,
                        React.createElement("button", {
                            type: "button",
                            className: "btn btn-success",
                            onClick: this.handleModalAddEditClick.bind(this)
                        }, "Save"),

                        React.createElement("button", {
                            type: "button",
                            onClick: this.close,
                            className: "btn btn-danger"
                        }, "Cancel")))));
    }
});

var FirstRecipe = React.createClass({
    displayName: "FirstRecipe",
    remove: function() {
        this.props.onRemove(this.props.index);
    },

    render: function() {
        return (
            React.createElement("h1", null, "First Recipe"));

    }
});


ReactDOM.render(React.createElement(RecipeBox, null), document.getElementById('container'));