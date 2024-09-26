import { readService, updateService } from "../service/notification.service.js"

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

async function updateNotifications(req, res, next) {
    try {
        const {nid} = req.params
        if (!nid) {
            return res.error400("You must enter _id of the notification")
        }
        await updateService(nid, {read: true})
        return res.message200("Marked as read")
    } catch (error) {
        return next(error)
    }
}

export {readNotifications, updateNotifications}