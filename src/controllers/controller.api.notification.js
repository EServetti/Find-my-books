import { readService } from "../service/notification.service.js"

async function readNotifications(req, res, next) {
    try {
        const {user} = req
        const {_id} = user
        const notifications = await readService({receiver: _id})
        if (notifications.length === 0) {
            return res.error404()
        }
        notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return res.message200(notifications)
    } catch (error) {
        return next(error)
    }
}

export default readNotifications