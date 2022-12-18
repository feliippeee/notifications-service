import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { CountRecipientNotification } from "./count-recipient-notifications";

describe('Count recipients notifications', () => {
    it('should be able to count recipient not notifications', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const countRecipientNotifications = new CountRecipientNotification(
            notificationsRepository
            );

        await notificationsRepository.create(
            makeNotification({ recipientId: 'recipient-1'})
        );

        await notificationsRepository.create(
            makeNotification({ recipientId: 'recipient-1'})
        );

        await notificationsRepository.create(
           
            makeNotification({ recipientId: 'recipient-2'})
        );

        const { count } = await countRecipientNotifications.execute({
            recipientId: 'recipient-1',
        });

        expect(count).toEqual(2);
    });

});