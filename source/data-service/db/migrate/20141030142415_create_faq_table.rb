class CreateFaqTable < ActiveRecord::Migration
  def change
  	create_table :faqs do |table|
    table.string :faq_question
    table.string :faq_answer
  end
  end
end
