import { readService } from "../service/books.service.js"

async function bookExists(req, res, next) {
    try {
        const {user} = req
        const {isbn} = req.body
        const books = await readService({user_id: user._id})
        const exists = books.find((b) => b.isbn === isbn)
        if(exists) {
            return res.error400("You've already added this book")
        } else {
            return next()
        }
    } catch (error) {
        return next(error)
    }
}

export default bookExists