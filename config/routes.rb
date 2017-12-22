Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/bookings/:id', to: 'bookings#show', as: 'booking'

  post '/search', to: 'searches#create', as: 'search'

  get '/searches', to: 'searches#index', as: 'searches'

  delete '/searches', to: 'searches#destroy_all', as: 'destroy_searches'

end
