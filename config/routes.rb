Rails.application.routes.draw do
  root to: 'application#angular'

  resources :posts, only: [:create, :index, :show] do
  	resources :comments, only: [:show, :create] do
  		member do
  			put '/upvotes' => 'comments#upvotes'
  		end
  	end

  	member do
  		put '/upvotes' => 'posts#upvote'
  	end
  end
end
