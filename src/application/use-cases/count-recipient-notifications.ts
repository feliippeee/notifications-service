import { NotificationNotFound } from "@application/use-cases/errors/notification-not-found";
import { Injectable } from "@nestjs/common";
import { Content } from "../entities/content";
import { Notification } from "../entities/notification";
import { NotificationsRepository } from "../repositories/notifications-repository";

interface CountRecipientNotificationRequest {
    recipientId: string;
    
}

interface CountRecipientNotificationResponse {
    count: number;
}

@Injectable()
export class CountRecipientNotification {
    constructor(private notificationsRepository: NotificationsRepository) {
        
    }

        async execute(
            request: CountRecipientNotificationRequest
            ): Promise<CountRecipientNotificationResponse> {
                const { recipientId } = request

                const count = await this.notificationsRepository.countManyByRecipientId(
                    recipientId,
                );

              return { 
                count
            };
    }
}