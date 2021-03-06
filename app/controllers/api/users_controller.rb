class Api::UsersController < ApplicationController
  before_action :authenticate_user!

  def update
    #update 
    user = User.find(params[:id])
    user.name = params[:name] ? params[:name] : user.name
    user.email = params[:email] ? params[:email] : user.email

    file = params[:file]

    if file != "undefined"
      begin
      #cloudinary stuff here
        cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true, resource_type: :auto)
        user.image = cloud_image["secure_url"]
        rescue => e
          render json: {errors: e, status: 422}
          return
        end
    end

  if user.save 
    render json: user
  else 
    render json: {errors: user.errors, 422}
  end

  end
end
