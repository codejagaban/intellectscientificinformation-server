export const paginatedResults = (model) => {

    return (req, res, next) => {
         // Declaring pagination  variables
    const page =  parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = ( page - 1 ) * limit
    const endIndex = page * limit;

    const results = {  }

    if ( startIndex > 0 ) {
        results.previous = {
            page: page - 1,
            limit: limit
        }
    }
    if(endIndex < model.count) {
        results.next = {
            page: page + 1,
            limit: limit
        }

    }

    results.currentPage = page;
       results.model = model.rows;
       results.totalCount = model.count;
       res.paginatedResults = results;
       next()
    }

}