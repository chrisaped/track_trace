class BookingsController < ApplicationController

	def index

	end

	def search
		# we probably don't need this
		search = params[:search]
		if search == 'why'
			redirect_to booking_path('why')
		end	
	end

	def show
		if params[:id] == 'why'
			render(
				status: 200,
				json: why
			)
		else
			render(
				status: 404,
				json: { error: 'Booking not found' }
			)
		end	
	end

	def why
		{
		  "booking_number":"TXG790195100",
		  "steamship_line":"PIL",
		  "origin":"XINGANG [CNTXG]",
		  "destination":"OAKLAND [USOAK]",
		  "containers":[
		    {
		      "number":"PCIU1857050",
		      "size":"20GP",
		      "type":"20GP",
		      "last_status":"Empty Container",
		      "location":"OAKLAND",
		      "last_status_at":"2017-05-19 15:41:00"
		    }
		  ],
		  "updates":[
		    {
		      "container_number": "PCIU1857050",
		      "arrival": "",
		      "delivery_on": "2017-04-18",
		      "steamship_line": "",
		      "origin":"XINGANG",
		      "destination":"USOAK",
		      "vessel":" CSCL AUTUMN",
		      "voyage":"VQC60007E",
		      "vessel_eta":"2017-05-15"
		    }
		  ]
		}		
	end
end
