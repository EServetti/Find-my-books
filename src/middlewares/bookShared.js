import { readService } from "../service/shared.service.js"

async function bookShared(req, res, next) {
    try {
        const {user} = req
        const {_id} = user
        const {sharedWith, book} = req.body
        const sharedBooks = await readService({sharedBy: _id})
        const sharedWithFriend = sharedBooks.filter((b) => b.sharedWith.toString() === sharedWith.toString())
        const alreadyShared = sharedWithFriend.find((b) => b.book.isbn === book.isbn)
        if(alreadyShared) {
            return res.error400("You've already shared this book with this friend")
        } 
        return next()
    } catch (error) {
        return next(error)
    }
}

export default bookShared