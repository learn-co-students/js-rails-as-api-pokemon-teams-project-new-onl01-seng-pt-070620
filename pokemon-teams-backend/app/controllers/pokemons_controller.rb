class PokemonsController < ApplicationController
    def destroy
        Pokemon.find_by(id: params[:id]).destroy
    end
    def create
        trainer = Trainer.find_by(id: params[:trainer_id])
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer: trainer) if trainer.pokemon.count < 6
        render json: pokemon.to_json(except: [:trainer_id,:updated_at,:created_at])
    end
end
