class BookingsController < ApplicationController

	def show
		if params[:id] == "TXG790195100"
			render(
				status: 200,
				json: transform_response(why)
			)
		elsif params[:id] == "TXG790214500"
			render(
				status: 200,
				json: transform_response(how)
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

	def how
		{
		  "booking_number":"TXG790214500",
		  "steamship_line":"PIL",
		  "origin":"XINGANG",
		  "destination":"OAKLAND",
		  "containers":[
		    {
		      "number":"PCIU8822077",
		      "size":"40HC",
		      "type":"HC",
		      "last_status":"Empty Container",
		      "location":"OAKLAND",
		      "last_status_at":"2017-05-19 10:48:00"
		    },
		    {
		      "number":"CMAU0027840",
		      "size":"20GP",
		      "type":"GP",
		      "last_status":"Full Container",
		      "location":"OAKLAND",
		      "last_status_at":"2017-05-18 15:48:00"
		    },
		    {
		      "number":"ECMU2185277",
		      "size":"20GP",
		      "type":"GP",
		      "last_status":"Full Container",
		      "location":"OAKLAND",
		      "last_status_at":"2017-05-18 12:01:00"
		    }
		  ],
		  "updates":[
		    {
		      "container_number": "ECMU2185277",
		      "arrival":"",
		      "delivery_on":"2017-04-18",
		      "steamship_line":"",
		      "origin":"XINGANG",
		      "destination":"USOAK",
		      "vessel":" CSCL AUTUMN",
		      "voyage":"VQC60007E",
		      "vessel_eta":"2017-05-15"
		    },
		    {
		      "container_number": "ECMU2185277",
		      "arrival":"",
		      "delivery_on":"2017-04-20",
		      "steamship_line":"",
		      "origin":"XINGANG",
		      "destination":"USOAK",
		      "vessel":" CSCL AUTUMN",
		      "voyage":"VQC60007E",
		      "vessel_eta":"2017-05-15"
		    },
		    {
		      "container_number": "PCIU8822077",
		      "arrival":"",
		      "delivery_on":"2017-04-20",
		      "steamship_line":"",
		      "origin":"XINGANG",
		      "destination":"USOAK",
		      "vessel":" CSCL AUTUMN",
		      "voyage":"VQC60007E",
		      "vessel_eta":"2017-05-01"
		    },
		    {
		      "container_number": "ECMU2185277",
		      "arrival":"",
		      "delivery_on":"2017-04-18",
		      "steamship_line":"",
		      "origin":"XINGANG",
		      "destination":"USOAK",
		      "vessel":" CSCL AUTUMN",
		      "voyage":"VQC60007E",
		      "vessel_eta":"2017-05-15"
		    }
		  ]
		}
	end

	private

	def transform_response(hash)
		# to add updates to containers
		containers = hash[:containers].sort_by { |container| container["number"] }
		updates = hash[:updates].sort_by { |update| update["container_number"] }

		containers.each do |container|
			updates.each do |update|
				if container[:number] == update[:container_number]
					if !container[:updates]
						container[:updates] = []
					end
					container[:updates] << update
				end
			end
		end

		hash
	end

end
