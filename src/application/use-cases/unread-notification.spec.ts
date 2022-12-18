import { NotificationNotFound } from "@application/use-cases/errors/notification-not-found";
import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { UnReadNotification } from "./unread-notification";

describe('Unread notification', () => {
    it('should be able to unread a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const unreadNotification = new UnReadNotification(notificationsRepository);

        const notification = makeNotification({
          readAt: new Date(), //para fazer o teste de uma notificação não lida, na hora da criação, já criamos com uma data de leitura
        }
        )

         await notificationsRepository.create(notification);

        await unreadNotification.execute({
            notificationId: notification.id,
        });

        expect(notificationsRepository.notifications[0].readAt).toBeNull()
    });

    it('should not be able to unread a non existing notification', async() => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const unreadNotification = new UnReadNotification(notificationsRepository);

       expect(() => {
        return unreadNotification.execute({
            notificationId: 'fake-notification-id',
        });
       }).rejects.toThrow(NotificationNotFound);

    })
});