class PokemonSerializer < ActiveModel::Serializer
    attributes :species, :nickname, :trainer_id
    belongs_to :trainer
  end
  