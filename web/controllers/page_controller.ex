defmodule Reactphoenix.PageController do
  use Reactphoenix.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
