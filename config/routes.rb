Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'bookings#index'

  get '/bookings/:id', to: 'bookings#show', as: 'booking'
  get '/search', to: 'bookings#search', as: 'search'
end
