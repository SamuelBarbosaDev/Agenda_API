class HomeController{
    index(request, response){
        response.json('index')
    }
}

export default new HomeController();
