class BookingsController < ApplicationController

	def index

	end

	def show
		if params[:id] == 'why'
			render(
				status: 200,
				json: transform_response(why)
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

	def transform_response(hash)
		# to add updates to containers
		containers = hash[:containers].sort_by { |container| container["number"] }
		updates = hash[:updates].sort_by { |update| update["container_number"] }

		containers.each do |container|
			updates.each do |update|
				if container["number"] == update["container_number"]
					if !container["updates"]
						container["updates"] = []
					end
					container["updates"] << update
				end
			end
		end

		hash
	end

end
