class RenameSearchHistoryToSearch < ActiveRecord::Migration[5.1]
  def change
  	rename_table :search_histories, :search
  end
end
