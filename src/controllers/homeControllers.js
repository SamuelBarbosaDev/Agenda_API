class HomeController{
    index(request, response){
        response.json({
            "Done": true
        })
    }
}

export default new HomeController();
