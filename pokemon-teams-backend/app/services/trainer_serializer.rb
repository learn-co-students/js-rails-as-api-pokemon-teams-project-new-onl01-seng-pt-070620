class TrainerSerializer

    def initialize(trainer_object)
        @trainer = trainer_object
    end 

    def to_serialized_json_trainer
        trainer_hash = {
            include: {
                pokemons: {
                    only: [:id, :nickname, :species, :trainer_id]
                }
            },
            except: [:created_at, :updated_at],
        }
        @trainer.to_json(trainer_hash)
    end 
end 