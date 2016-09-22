class Post < ActiveRecord::Base
	has_many :comments

	def as_jason(options = {})
		super(options.merge(include: :comments))
	end
end
