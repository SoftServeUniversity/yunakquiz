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

ActiveRecord::Schema.define(version: 20140927153607) do

  create_table "users", force: true do |t|
    t.string   "username",        limit: 25, null: false
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
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
