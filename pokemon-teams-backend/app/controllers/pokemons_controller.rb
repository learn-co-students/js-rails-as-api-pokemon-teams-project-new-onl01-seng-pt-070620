class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons).to_serialized_json
    end

    def create
        pokemon = Pokemon.new
        pokemon.nickname = Faker::Name.first_name
        pokemon.species = Faker::Games::Pokemon.name
        pokemon.trainer = Trainer.find(params[:trainer_id])
        pokemon.save
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
        render json: PokemonSerializer.new(pokemon).to_serialized_json
    end
end
