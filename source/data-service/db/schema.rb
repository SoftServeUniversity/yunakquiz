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

ActiveRecord::Schema.define(version: 20141120120028) do

  create_table "answers", force: true do |t|
    t.integer "question_id"
    t.string  "title"
    t.boolean "correct"
  end

  create_table "categories", force: true do |t|
    t.integer  "category_id"
    t.string   "title"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "comments", force: true do |t|
    t.integer  "quiz_id"
    t.string   "text"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "contacts", force: true do |t|
    t.string "role"
    t.string "phone"
    t.string "mail"
    t.string "address"
  end

  create_table "faqs", force: true do |t|
    t.string "faq_question"
    t.string "faq_answer"
  end

  create_table "permissions", force: true do |t|
    t.string  "tabs"
    t.boolean "admin"
    t.boolean "moder"
    t.boolean "user"
    t.boolean "superadmin"
  end

  create_table "questions", force: true do |t|
    t.integer  "quiz_id"
    t.string   "title"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "quizzes", force: true do |t|
    t.integer  "category_id"
    t.integer  "user_id"
    t.string   "title"
    t.text     "description"
    t.integer  "status",      default: 0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "quizzes_tags", id: false, force: true do |t|
    t.integer "quiz_id"
    t.integer "tag_id"
  end

  create_table "results", id: false, force: true do |t|
    t.integer  "quiz_id"
    t.integer  "user_id"
    t.float    "grade"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "roles", force: true do |t|
    t.string   "name"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "staticinfos", force: true do |t|
    t.text     "about_us"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tags", force: true do |t|
    t.string   "tag"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "username",        limit: 25,             null: false
    t.string   "first_name",      limit: 25
    t.string   "last_name",       limit: 50
    t.string   "hashed_password", limit: 65
    t.string   "salt",            limit: 65
    t.string   "email"
    t.datetime "birthday"
    t.string   "plast_hovel"
    t.string   "plast_region"
    t.string   "plast_level"
    t.string   "picture"
    t.integer  "role_id"
    t.integer  "status",                     default: 1
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
