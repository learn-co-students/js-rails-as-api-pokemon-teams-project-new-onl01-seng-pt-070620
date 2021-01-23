class PokemonsController < ApplicationController

    def show 
        pokemon = Pokemon.find_by(id: params[:id])
        if pokemon
            render json: PokemonSerializer.new(pokemon).to_serialized_json_pokemon
        else
            render json: { message: "pokemon is not found!"}
        end 
    end 

    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons).to_serialized_json_pokemon
    end 

    def new
    end 
    
    def create
    end 

    def delete
    end 

end
