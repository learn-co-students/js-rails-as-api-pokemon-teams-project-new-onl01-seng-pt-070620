class PokemonsController < ApplicationController

    def create
        trainer = Trainer.find(params["pokemon"]["trainer_id"])
        pokemon = Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer: trainer)
        render json: pokemon 
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy 
        render json: pokemon
    end
end
