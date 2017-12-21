class SearchesController < ApplicationController

  def create
    byebug
    @search = Search.find_or_create_by(booking_number: search_params)
    json_response(@search, :created)
  end

  private

  def search_params
    params.permit(:booking_number)
  end	
end
