# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141008080748) do

  create_table "answers", force: true do |t|
    t.integer "question_id", null: false
    t.string  "title",       null: false
    t.boolean "correct",     null: false
  end

  create_table "categories", force: true do |t|
    t.integer "parent_id", default: 0, null: false
    t.string  "title",                 null: false
  end

  create_table "questions", force: true do |t|
    t.integer "quiz_id",     null: false
    t.string  "title",       null: false
    t.string  "description"
  end

  create_table "quizzes", force: true do |t|
    t.integer "category_id", null: false
    t.string  "title",       null: false
    t.string  "description"
  end

end
