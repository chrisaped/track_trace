class SearchesController < ApplicationController

	def index
		@searches = Search.order(created_at: :desc)
		render(
			status: 200,
			json: @searches
		)
	end

  def create
    @search = Search.find_or_create_by(booking_number: search_params["booking_number"])
    render(
		  status: 200,
			json: @search
		)
  end

  private

  def search_params
  	params.require(:search).permit(:booking_number)
  end
end
