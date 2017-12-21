class RenameSearchToSearches < ActiveRecord::Migration[5.1]
  def change
  	rename_table :search, :searches
  end
end
