import { NotificationNotFound } from "@application/use-cases/errors/notification-not-found";
import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";

interface UnReadNotificationRequest {
    notificationId: string;
}

type UnReadNotificationResponse = void;

@Injectable()
export class UnReadNotification {
    constructor(private notificationsRepository: NotificationsRepository) {
        
    }

        async execute(
            request: UnReadNotificationRequest
            ): Promise<UnReadNotificationResponse> {
                const { notificationId } = request

                const notification = await this.notificationsRepository.findById(
                    notificationId,
                );

                if(!notification) {
                    throw new NotificationNotFound();
                }

                notification.unread();

                await this.notificationsRepository.save(notification)
        
        
    }
}